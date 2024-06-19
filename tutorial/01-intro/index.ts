import { sleep } from "bun";
import type { Browser, Page } from "puppeteer";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteerExtra.use(StealthPlugin());

async function run(): Promise<void> {
  const brower: Browser = await puppeteerExtra.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page: Page = await brower.newPage();

  await page.goto("https://www.google.com");
  await sleep(100);
  await brower.close();
}

run();
