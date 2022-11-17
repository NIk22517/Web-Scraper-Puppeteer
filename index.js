const puppeteer = require("puppeteer");

async function start() {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();
  await page.goto("https://zoro.to/most-popular", {
    waitUntil: "domcontentloaded",
  });

  let data = await page.evaluate(() => {
    let results = [];
    let items = document.querySelectorAll(".flw-item");
    items.forEach((item) => {
      results.push({
        url: item
          .querySelector(".film-poster .film-poster-img")
          .getAttribute("data-src"),
        title: item.querySelector(".film-detail .film-name").innerText,
        language: item.querySelector(".tick.ltr").innerText.split(" "),
        episode: item.querySelector(".tick.rtl .tick-item.tick-eps").innerText,
        time: item.querySelector(".fd-infor .fdi-item.fdi-duration").innerText,
      });
    });
    return results;
  });
  await browser.close();
  console.log(data);
}

start();
