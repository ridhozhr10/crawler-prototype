// For more information, see https://crawlee.dev/
import { Dataset, PlaywrightCrawler } from "crawlee";

const FACEBOOK_EMAIL = "";
const FACEBOOK_PASSWORD = "";

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
  // Use the requestHandler to process each of the crawled pages.
  async requestHandler({
    session,
    request,
    page,
    enqueueLinks,
    log,
    pushData,
  }) {
    session?.setCookies(
      [
        {
          domain: ".facebook.com",
          expires: 1737182087.264571,
          httpOnly: true,
          name: "sb",
          path: "/",
          sameSite: "None",
          secure: true,
          value: "BvB7ZaXWls0-hV8rI_8SvY_r",
        },
        {
          domain: ".facebook.com",
          expires: 1737181185.213356,
          httpOnly: true,
          name: "datr",
          path: "/",
          sameSite: "None",
          secure: true,
          value: "BvB7Zdfw9uR8c4Q0A_U-k0HH",
        },
        {
          domain: ".facebook.com",
          expires: 1703226920,
          httpOnly: false,
          name: "wd",
          path: "/",
          sameSite: "Lax",
          secure: true,
          value: "1047x919",
        },
        {
          domain: ".facebook.com",
          expires: 1734158087.264627,
          httpOnly: false,
          name: "c_user",
          path: "/",
          sameSite: "None",
          secure: true,
          value: "1733275426",
        },
        {
          domain: ".facebook.com",
          expires: 1734158087.264639,
          httpOnly: true,
          name: "xs",
          path: "/",
          sameSite: "None",
          secure: true,
          value: "20%3AfMw3NX9lfuENpA%3A2%3A1702622091%3A-1%3A11172",
        },
        {
          domain: ".facebook.com",
          expires: 1710398117.680758,
          httpOnly: true,
          name: "fr",
          path: "/",
          sameSite: "None",
          secure: true,
          value:
            "0d8mFTIehB9xJhnEy.AWXTkNGIcJEUeLqp33SUYa6OGPQ.Ble_AG._9.AAA.0.0.Ble_Or.AWWGUqI2WSE",
        },
        {
          domain: ".facebook.com",
          httpOnly: false,
          name: "presence",
          path: "/",
          //   sameSite: "None",
          secure: true,
          value:
            "C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1702622120753%2C%22v%22%3A1%7D",
        },
      ],
      "https://www.facebook.com"
    );
    await page.getByTestId("royal_email").fill(FACEBOOK_EMAIL);
    await page.getByTestId("royal_pass").fill(FACEBOOK_PASSWORD);

    await page.getByTestId("royal_login_button").click();

    await page.waitForResponse((res) => {
      return (
        res.url() === "https://www.facebook.com/api/graphql/" &&
        res.status() === 200
      );
    });
    await page.goto(
      "https://www.facebook.com/search/posts?q=prabowo&filters=eyJyZWNlbnRfcG9zdHM6MCI6IntcIm5hbWVcIjpcInJlY2VudF9wb3N0c1wiLFwiYXJnc1wiOlwiXCJ9IiwicnBfY3JlYXRpb25fdGltZTowIjoie1wibmFtZVwiOlwiY3JlYXRpb25fdGltZVwiLFwiYXJnc1wiOlwie1xcXCJzdGFydF95ZWFyXFxcIjpcXFwiMjAyM1xcXCIsXFxcInN0YXJ0X21vbnRoXFxcIjpcXFwiMjAyMy0xMlxcXCIsXFxcImVuZF95ZWFyXFxcIjpcXFwiMjAyM1xcXCIsXFxcImVuZF9tb250aFxcXCI6XFxcIjIwMjMtMTJcXFwiLFxcXCJzdGFydF9kYXlcXFwiOlxcXCIyMDIzLTEyLTFcXFwiLFxcXCJlbmRfZGF5XFxcIjpcXFwiMjAyMy0xMi0zMVxcXCJ9XCJ9IiwicnBfYXV0aG9yOjAiOiJ7XCJuYW1lXCI6XCJtZXJnZWRfcHVibGljX3Bvc3RzXCIsXCJhcmdzXCI6XCJcIn0ifQ%3D%3D"
    );

    // const title = await page.title();
    // log.info(`Title of ${request.loadedUrl} is '${title}'`);

    // // // Save results as JSON to ./storage/datasets/default
    // await pushData({ title, url: request.loadedUrl });

    // // // Extract links from the current page
    // // // and add them to the crawling queue.
    await page.waitForSelector("div[role=feed]");

    const tete = await page.locator("div[role=feed] > div");
    const tetes = await tete.all();
    for (const content of tetes) {
      const result = await content.textContent();
      Dataset.pushData({ result });
    }

    await page.waitForTimeout(5000);
  },
  // Comment this option to scrape the full website.
  maxRequestsPerCrawl: 1,
  // Uncomment this option to see the browser window.
  headless: false,
});

// Add first URL to the queue and start the crawl.
await crawler.run(["https://www.facebook.com"]);
