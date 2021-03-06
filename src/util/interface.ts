import {Method} from "axios";

/*
* request and response's interface
* */
export type HeaderValue = string | string[]

export interface Header {
    name: string
    value: string
}

export interface HeadersObject {
    [parm: string]: HeaderValue
}

export interface HeaderValueObject {
    [parm: string]: string | undefined
}


export interface Cookie {
    name: string
    value: string
    domain: string
    path: string
    creatTime: number
    maxAge: {
        use: boolean
        value: number
    }
}

export interface RequestFormData {
    name: string
    value: string
}

export interface RequestUploadFile {
    path: string
    name: string
}

export interface RequestHeadersData {
    headers: Header[]
    cookies: Cookie[]
}


export interface RequestContentData {
    choose: "empty" | "text" | "files" | "json" | "form"
    contentType: string
    otherContentType: string
    text: string
    files: RequestUploadFile[]
    form: RequestFormData[]
}

export interface ResponseContentData {
    choose: "empty" | "text" | "json" | "xml" | "html" | "image"
    charset: string
    buffer: Buffer
    text: string
}

export interface ResponseHeadersData {
    headers: Header[]
    responseTime: number
    responseStatus: number
}

export interface ALLData {
    host: string,
    method: Method
    path: string
    tab: "request-headers" | "request-content" | "response-headers" | "response-content"
    requestHeadersData: RequestHeadersData
    requestContentData: RequestContentData
    responseContentData: ResponseContentData
    responseHeadersData: ResponseHeadersData
}

/*
* history data interface
* */
export interface HistoryItem {
    host: string,
    method: Method
    path: string
    requestHeadersData: RequestHeadersData
    requestContentData: RequestContentData
}

/*
* other data interface
* */

export interface Column {
    name: string
    label: string
    field: string | Function
    required?: boolean
    align?: string
    sortable?: boolean
    sort?: Function
    format?: Function
    style?: string
    classes?: string
    headerStyle?: string
    headerClasses?: string
}

