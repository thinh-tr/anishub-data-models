import { assert, assertFalse, assertEquals } from "@std/assert";
import { generateV4UUID } from "../src/helper-funcs.ts";
import { Page, MetaData, HTMLContent, Image } from "../src/data-models.ts";
import { DataType, MariaDateTime } from "../src/types.ts";

Deno.test("Page class test", () => {
    const validPageData: Page = new Page(generateV4UUID(), "https://www.example.com");
    assert(validPageData.isValid() === true);

    // page có id không hợp lệ
    const invalidIdPage: Page = validPageData;
    invalidIdPage.id = "1234";
    assertFalse(invalidIdPage.isValid());

    // page có url không hợp lệ
    const invalidURLPage: Page = validPageData;
    invalidURLPage.URL = "ccc.com";
    assertFalse(invalidURLPage.isValid());
});

Deno.test("MetaData class test", () => {
    // Case hợp lệ
    const metaValid = new MetaData(
        generateV4UUID(),
        generateV4UUID(),
        "Tin tức Anime",
        new MariaDateTime(new Date()),
        DataType.news,
        "https://example.com"
    );
    assertEquals(metaValid.isValid(), true, "Dữ liệu hợp lệ đầy đủ");

    // Case id không hợp lệ
    const metaInvalidId = new MetaData(
        "12345",
        generateV4UUID(),
        "Title",
        new MariaDateTime(new Date()),
        DataType.general,
        "https://example.com"
    );
    assertEquals(metaInvalidId.isValid(), false, "Id không hợp lệ");

    // Case pageId không hợp lệ
    const metaInvalidPageId = new MetaData(
        generateV4UUID(),
        "abc",
        "Title",
        new MariaDateTime(new Date()),
        DataType.general,
        "https://example.com"
    );
    assertEquals(metaInvalidPageId.isValid(), false, "PageId không hợp lệ");

    // Case title quá ngắn
    const metaShortTitle = new MetaData(
        generateV4UUID(),
        generateV4UUID(),
        "A",
        new MariaDateTime(new Date()),
        DataType.general,
        "https://example.com"
    );
    assertEquals(metaShortTitle.isValid(), false, "Title quá ngắn");

    // Case publicationDate không phải Date
    const metaInvalidDate = new MetaData(
        generateV4UUID(),
        generateV4UUID(),
        "Title",
        "2026-04-01" as unknown as MariaDateTime, // Ép kiểu sai để test
        DataType.general,
        "https://example.com"
    );
    assertEquals(metaInvalidDate.isValid(), false, "PublicationDate không phải Date");

    // Case source không hợp lệ
    const metaInvalidSource = new MetaData(
        generateV4UUID(),
        generateV4UUID(),
        "Title",
        new MariaDateTime(new Date()),
        DataType.general,
        "not-a-url"
    );
    assertEquals(metaInvalidSource.isValid(), false, "Source không hợp lệ");

    // Case logData (chỉ cần gọi để đảm bảo không lỗi runtime)
    const metaLog = new MetaData(
        generateV4UUID(),
        generateV4UUID(),
        "Title",
        new MariaDateTime(new Date()),
        DataType.video,
        "https://example.com"
    );
    metaLog.logData();
});

Deno.test("HTMLContent class test", () => {
    // Case hợp lệ: id, pageId là UUID v4, htmlData hợp lệ
    const htmlValid = `
    <!DOCTYPE html>
    <html>
      <head><title>Test</title></head>
      <body><p>Hello World</p></body>
    </html>
  `;
    const contentValid = new HTMLContent(generateV4UUID(), generateV4UUID(), htmlValid);
    assertEquals(contentValid.isValid(), true, "HTMLContent hợp lệ");

    // Case id không hợp lệ
    const contentInvalidId = new HTMLContent("12345", generateV4UUID(), htmlValid);
    assertEquals(contentInvalidId.isValid(), false, "Id không hợp lệ");

    // Case pageId không hợp lệ
    const contentInvalidPageId = new HTMLContent(generateV4UUID(), "abc", htmlValid);
    assertEquals(contentInvalidPageId.isValid(), false, "PageId không hợp lệ");

    // Case htmlData không hợp lệ (body rỗng)
    const htmlInvalid = `
    <!DOCTYPE html>
    <html>
      <head><title>Test</title></head>
      <body></body>
    </html>
  `;
    const contentInvalidHtml = new HTMLContent(generateV4UUID(), generateV4UUID(), htmlInvalid);
    assertEquals(contentInvalidHtml.isValid(), false, "HTMLData không hợp lệ");

    // Case logData (chỉ cần gọi để đảm bảo không lỗi runtime)
    const contentLog = new HTMLContent(generateV4UUID(), generateV4UUID(), htmlValid);
    contentLog.logData();
});

Deno.test("Image class test", () => {
    // Case hợp lệ
    const imgValid = new Image(
        generateV4UUID(),
        generateV4UUID(),
        "https://example.com/image.png",
        "Ảnh minh họa",
        "https://example.com"
    );
    assertEquals(imgValid.isValid(), true, "Image hợp lệ");

    // Case id không hợp lệ
    const imgInvalidId = new Image(
        "12345",
        generateV4UUID(),
        "https://example.com/image.png",
        "Ảnh minh họa",
        "https://example.com"
    );
    assertEquals(imgInvalidId.isValid(), false, "Id không hợp lệ");

    // Case pageId không hợp lệ
    const imgInvalidPageId = new Image(
        generateV4UUID(),
        "abc",
        "https://example.com/image.png",
        "Ảnh minh họa",
        "https://example.com"
    );
    assertEquals(imgInvalidPageId.isValid(), false, "PageId không hợp lệ");

    // Case imageUrl không hợp lệ
    const imgInvalidUrl = new Image(
        generateV4UUID(),
        generateV4UUID(),
        "not-a-url",
        "Ảnh minh họa",
        "https://example.com"
    );
    assertEquals(imgInvalidUrl.isValid(), false, "ImageUrl không hợp lệ");

    // Case altText quá ngắn
    const imgShortAlt = new Image(
        generateV4UUID(),
        generateV4UUID(),
        "https://example.com/image.png",
        "A",
        "https://example.com"
    );
    assertEquals(imgShortAlt.isValid(), false, "AltText quá ngắn");

    // Case source không hợp lệ
    const imgInvalidSource = new Image(
        generateV4UUID(),
        generateV4UUID(),
        "https://example.com/image.png",
        "Ảnh minh họa",
        "not-a-url"
    );
    assertEquals(imgInvalidSource.isValid(), false, "Source không hợp lệ");

    // Case logData (chỉ cần gọi để đảm bảo không lỗi runtime)
    const imgLog = new Image(
        generateV4UUID(),
        generateV4UUID(),
        "https://example.com/image.png",
        "Ảnh minh họa",
        "https://example.com"
    );
    imgLog.logData();
});