import BrowserSimple from "./simple";

async function main(): Promise<void> {
  const browser = new BrowserSimple();

  for (let index = 0; index < 5; index++) {
    const task = browser.taskEvent("https://www.google.com");
    browser.taskAdd(task);
  }

  await browser.run();
}

main();
