import { sleep } from "bun";
import type { Browser, Page } from "puppeteer";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

class BrowserSimple {
  private tasks: Promise<void>[];

  constructor() {
    this.initialize();
    this.tasks = [];
  }

  public async initialize(): Promise<void> {
    try {
      puppeteerExtra.use(StealthPlugin());
    } catch (error) {
      console.error(error);
    }
  }

  public async taskEvent(url: string): Promise<void> {
    try {
      const browser = await puppeteerExtra.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      if (browser) {
        const page: Page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(url, { waitUntil: "domcontentloaded" });
        await sleep(100);
        console.log(`opening url: ${url}`);
        // await this.close(browser);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public taskAdd(taskEvent: Promise<void>): void {
    this.tasks.push(taskEvent);
  }

  private async close(browser: Browser): Promise<void> {
    try {
      if (browser) {
        await browser.close();
        console.log("closed browser");
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async run(): Promise<void> {
    await Promise.all(this.tasks.map((task) => task));
  }
}

export default BrowserSimple;
