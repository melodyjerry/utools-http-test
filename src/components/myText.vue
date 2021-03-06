<template>
    <div class="Text" ref="container">

    </div>
</template>

<script lang="ts">
  import Vue, {PropType} from "vue"
  import {editor} from "monaco-editor";
  import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
  import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
  import "monaco-editor/esm/vs/basic-languages/xml/xml.contribution"

  interface Data {
    editor: IStandaloneCodeEditor | null
  }

  export default Vue.extend({
    name: "myText",
    data(): Data {
      return {
        editor: null
      }
    },
    props: {
      language: String as PropType<string | undefined>,
      value: String as PropType<string>,
      readOnly: {
        type: Boolean as PropType<boolean | undefined>,
        default: false
      }
    },
    mounted() {

      //初始化
      const container = this.$refs.container as HTMLElement
      const theme: string = this.$q.dark.isActive ? "vs-dark" : "vs"
      this.editor = editor.create(container, {
        value: this.value,
        theme: theme,
        language: this.language,
        automaticLayout: true
      })

      // 如果不是只读
      if (!this.readOnly) {
        this.editor.onKeyUp(() => {
          this.$emit("update", this.editor!.getValue())
        })
      } else {
        this.editor.trigger("anyString", 'editor.action.formatDocument', "");

        setTimeout(() => {
          this.format()
        }, 100)
      }
    },
    methods: {
      format() {
        this.editor!.updateOptions({
          readOnly: false
        })
        this.editor!.getAction('editor.action.formatDocument').run().then(() => {
          this.editor!.updateOptions({
            readOnly: true,
          })
        })
      }
    },
    model: {
      prop: "value",
      event: "update"
    },
    watch: {
      value: {
        immediate: true,
        handler(val: string) {
          if (this.editor !== null && val !== this.editor.getValue()) {
            this.editor.setValue(val)
            if (this.readOnly) {
              this.format()
            }
          }
        }
      },
      language: {
        immediate: true,
        handler(val: string) {
          if (this.editor !== null) {
            const model = this.editor.getModel()
            if (model !== null) {
              editor.setModelLanguage(model, val)
            }
          }
        }
      },
      "$q.dark.isActive": {
        immediate: true,
        handler(val: boolean) {
          const theme: string = val ? "vs-dark" : "vs"
          if (this.editor !== null) {
            editor.setTheme(theme)
          }
        }
      }
    }
  })
</script>

<style scoped lang="scss">
    .Text {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
