export function msgLog(msg: string): void {
    console.log(`[${new Date().toString()}]: ${msg}`);
}

// Kiểm tra tính hợp lệ của url
export function isValidUrl(urlStr: string): boolean {
    try {
        new URL(urlStr);
        return true;
    } catch (error) {
        const msg = `${error}`;
        msgLog(msg);
        return false;
    }
}

// Hàm khởi tạo v4 uuid
export function generateV4UUID(): string {
    return crypto.randomUUID();
}

// Kiểm tra xem liệu một string chỉ chứa toàn ký tự đặc biệt hay không
export function isValidStringWithMinLen(str: string, minLen: number): boolean {
    const normalized: string = str.replace(/\s/g, "");
    return (normalized.length >= minLen && !/^[^\p{L}\p{N}]+$/u.test(normalized));
}