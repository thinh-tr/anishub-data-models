import { v4 } from "@std/uuid";
import { isValidUrl, isValidStringWithMinLen, validateHTMLString } from "./helper-funcs.ts";
import { DBData } from "./interfaces.ts";
import { DataType, isDataTypeValue, MariaDateTime } from "./types.ts";

// class thao tác page
export class Page implements DBData {
    id: string;
    URL: string;

    constructor(id: string, URL: string) {
        this.id = id;
        this.URL = URL;
    }

    // Kiểm tra hợp lệ
    isValid(): boolean {
        if (!v4.validate(this.id)) return false;
        if (!isValidUrl(this.URL)) return false;
        return true;
    }

    logData(): void {
        console.log(`
        id: ${this.id}
        url: ${this.URL}\n
        `);
    }
}

// Class thao tác meta_data
export class MetaData implements DBData {
    id: string;
    pageId: string;
    title: string;
    publicationDate: MariaDateTime;
    dataType: DataType;
    source: string; // Nguồn chứa page (vd: www.google.com)

    constructor(id: string, pageId: string, title: string, publicationDate: MariaDateTime, dataType: DataType, source: string) {
        this.id = id;
        this.pageId = pageId;
        this.title = title;
        this.publicationDate = publicationDate;
        this.dataType = dataType;
        this.source = source;
    }

    // Kiểm tra hợp lệ
    isValid(): boolean {
        if (!v4.validate(this.id)) return false;
        if (!v4.validate(this.pageId)) return false;
        if (!isValidStringWithMinLen(this.title, 2)) return false;  // title cần ít nhất 2 ký tự
        if (!(this.publicationDate instanceof MariaDateTime)) return false;
        if (!isDataTypeValue(this.dataType)) return false;
        if (!isValidUrl(this.source)) return false; // source cần phải là một url hợp lệ
        return true;
    }

    // log data
    logData(): void {
        console.log(`
        id: ${this.id}
        page id: ${this.pageId}
        title: ${this.title}
        publication date: ${this.publicationDate.value}
        data type: ${this.dataType},
        source: ${this.source}\n
        `);
    }
}

// html content
export class HTMLContent implements DBData {
    id: string;
    pageId: string;
    htmlData: string;

    constructor(id: string, pageId: string, htmlData: string) {
        this.id = id;
        this.pageId = pageId;
        this.htmlData = htmlData;
    }

    // Kiểm tra hợp lệ
    isValid(): boolean {
        if (!v4.validate(this.id)) return false;
        if (!v4.validate(this.pageId)) return false;
        if (!validateHTMLString(this.htmlData)) return false;
        return true;
    }

    // log data
    logData(): void {
        console.log(`
        id: ${this.id}
        page id: ${this.pageId}
        html data: 
            ${this.htmlData}
        `);
    }
}

export class Image implements DBData {
    id: string;
    pageId: string;
    imageUrl: string;
    altText: string;
    source: string;

    constructor(id: string, pageId: string, imageUrl: string, altText: string, source: string) {
        this.id = id;
        this.pageId = pageId;
        this.imageUrl = imageUrl;
        this.altText = altText;
        this.source = source;
    }

    // Kiểm tra hợp lệ
    isValid(): boolean {
        if (!v4.validate(this.id)) return false;
        if (!v4.validate(this.pageId)) return false;
        if (!isValidUrl(this.imageUrl)) return false;
        if (!isValidStringWithMinLen(this.altText, 2)) return false;
        if (!isValidUrl(this.source)) return false;
        return true;
    }

    logData(): void {
        console.log(`
        id: ${this.id}
        page id: ${this.pageId}
        image url: ${this.imageUrl}
        alt text: ${this.altText}
        source: ${this.source}
        `);
    }
}