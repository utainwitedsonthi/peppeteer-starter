import { sleep } from "bun";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteerExtra.use(StealthPlugin());

async function run() {
  const brower = await puppeteerExtra.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await brower.newPage();

  await page.goto("https://www.google.com");
  await sleep(100);
  await brower.close();
}

run();
