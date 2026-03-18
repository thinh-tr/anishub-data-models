import { assertEquals } from "@std/assert/equals";
import { generateV4UUID } from "../src/helper-funcs.ts";
import { NewsSearchData } from "../src/search-data-models.ts";
import { Language } from "../src/support-languages.ts";

Deno.test("NewsSearchData validation test", (): void => {
    const validId = generateV4UUID();
    const validDate = new Date();
    const validUrl = "https://example.com";

    // ✅ Hợp lệ đầy đủ
    const validData = new NewsSearchData(
        validId,
        "Naruto trở lại",
        "https://example.com/image.png",
        "Anime mới sẽ ra mắt vào mùa hè năm nay",
        validDate,
        Language.Vietnamese,
        validUrl,
    );
    assertEquals(validData.isValid(), true);

    // ❌ Sai ID (không phải UUID v4)
    const invalidIdData = new NewsSearchData(
        "12345",
        "Naruto trở lại",
        null,
        "Nội dung hợp lệ",
        validDate,
        Language.Vietnamese,
        validUrl,
    );
    assertEquals(invalidIdData.isValid(), false);

    // ❌ Tiêu đề quá ngắn
    const shortTitleData = new NewsSearchData(
        validId,
        "A",
        null,
        "Nội dung hợp lệ",
        validDate,
        Language.Vietnamese,
        validUrl,
    );
    assertEquals(shortTitleData.isValid(), false);

    // ❌ Thumbnail URL không hợp lệ
    const invalidThumbData = new NewsSearchData(
        validId,
        "Naruto trở lại",
        "not-a-url",
        "Nội dung hợp lệ",
        validDate,
        Language.Vietnamese,
        validUrl,
    );
    assertEquals(invalidThumbData.isValid(), false);

    // ❌ Content không hợp lệ
    const invalidContentData = new NewsSearchData(
        validId,
        "Naruto trở lại",
        null,
        "!!", // chỉ ký tự đặc biệt
        validDate,
        Language.Vietnamese,
        validUrl,
    );
    assertEquals(invalidContentData.isValid(), false);

    // ❌ Datetime không phải Date
    const invalidDateData = new NewsSearchData(
        validId,
        "Naruto trở lại",
        null,
        "Nội dung hợp lệ",
        "2026-03-18" as unknown as Date,
        Language.Vietnamese,
        validUrl,
    );
    assertEquals(invalidDateData.isValid(), false);

    // ❌ Original URL không hợp lệ
    const invalidUrlData = new NewsSearchData(
        validId,
        "Naruto trở lại",
        null,
        "Nội dung hợp lệ",
        validDate,
        Language.Vietnamese,
        "invalid-url",
    );
    assertEquals(invalidUrlData.isValid(), false);

    // Test với dữ liệu tiếng nhật
    const japData = new NewsSearchData(
        validId,
        "ナルト新作", // Tiêu đề tiếng Nhật
        "https://example.com/thumb.jpg", // Thumbnail hợp lệ
        null, // Content null
        validDate,
        Language.Japanese,
        validUrl,
    );
    assertEquals(japData.isValid(), true);
});