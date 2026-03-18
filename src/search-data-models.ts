import { v4 } from "@std/uuid";
import { Language, isLanguageValue } from "./support-languages.ts";
import { isValidUrl, isValidStringWithMinLen } from "./helper-funcs.ts";

// Class chứa thông tin NewsSearchData
export class NewsSearchData {
    public id: string;
    public title: string;
    public thumnailImageUrl: string | null;
    public content: string | null;
    public datetime: Date;
    public language: Language;
    public originalUrl: string;

    constructor(id: string, title: string, thumnailImageUrl: string | null, content: string | null, datetime: Date, language: Language, originalUrl: string) {
        this.id = id;
        this.title = title;
        this.thumnailImageUrl = thumnailImageUrl;
        this.content = content;
        this.datetime = datetime;
        this.language = language;
        this.originalUrl = originalUrl;
    }

    // Hàm Validate giá trị của NewsSearchData
    public isValid(): boolean {
        if (!v4.validate(this.id)) return false;    // Kiểm tra id
        if (!isValidStringWithMinLen(this.title, 2)) return false;   // Kiểm tra title
        if (this.thumnailImageUrl !== null && !isValidUrl(this.thumnailImageUrl)) return false; // Kiểm tra thumnail image url
        if (this.content !== null && !isValidStringWithMinLen(this.content, 2)) return false;   // Kiểm tra content
        if (!(this.datetime instanceof Date)) return false;
        if (!isLanguageValue(this.language)) return false; // Kiểm tra ngôn ngữ hỗ trợ
        if (!isValidUrl(this.originalUrl)) return false;    // Kiểm tra original url
        return true;    // Trả ra true trong các trường hợp còn lại
    }
}