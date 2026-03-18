import { assertEquals } from "@std/assert";
import { isValidStringWithMinLen } from "../src/helper-funcs.ts";
import { Language } from "../src/support-languages.ts";

Deno.test("isValidStringWithMinLen() test", (): void => {
    // Latin
    assertEquals(isValidStringWithMinLen("Naruto trở lại", 5), true);
    assertEquals(isValidStringWithMinLen("AI", 5), false);
    assertEquals(isValidStringWithMinLen("AI", 2), true);

    // Chỉ khoảng trắng
    assertEquals(isValidStringWithMinLen("     ", 2), false);

    // Chỉ ký tự đặc biệt
    assertEquals(isValidStringWithMinLen("!!!???", 2), false);

    // Kết hợp chữ và ký tự đặc biệt
    assertEquals(isValidStringWithMinLen("Anime!!!", 5), true);

    // Chuỗi rỗng
    assertEquals(isValidStringWithMinLen("", 2), false);

    // Nhật
    assertEquals(isValidStringWithMinLen("ナルト", 2), true);

    // Trung
    assertEquals(isValidStringWithMinLen("火影忍者", 2), true);

    // Hàn
    assertEquals(isValidStringWithMinLen("나루토", 2), true);

    // Ả Rập
    assertEquals(isValidStringWithMinLen("مرحبا", 2), true);

    // Thái
    assertEquals(isValidStringWithMinLen("สวัสดี", 2), true);

    // Emoji (không phải chữ/số)
    assertEquals(isValidStringWithMinLen("😊😊", 2), false);
});

Deno.test("enum test", (): void => {
    const language: Language = Language.Unsupported;
    assertEquals(typeof language, typeof language);
});