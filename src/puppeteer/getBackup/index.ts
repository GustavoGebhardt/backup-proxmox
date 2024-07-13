import puppeteer from 'puppeteer';
require('dotenv').config()

function delay(time: number) {
    return new Promise(function(resolve) {
      setTimeout(resolve, time);
    });
  }

async function getBackup(){
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'] });
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto(`https://${process.env.PROXMOX_HOST}:${process.env.PROXMOX_PORT}`);

    // Set screen size.
    await page.setViewport({width: 1080, height: 1024});

    // Type into search box.
    await page.locator('input[name="username"]').fill('root');
    await page.locator('input[name="password"]').fill('131328');

    // Wait and click on first result.
    await page.click('a.x-btn.x-unselectable.x-box-item.x-toolbar-item.x-btn-default-small');
    await delay(1000)
    await page.reload()
    const element = await page.waitForSelector('::-p-xpath(//*[@id="proxmoxlogo-1018"])');
    console.log(element)////*[@id="gridview-2566-record-7770"]/tbody/tr/td[6]/div

    // Locate the full title with a unique string.
    const textSelector = await page
    .locator('.x-grid-cell-inner')
    .waitHandle();
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title.
    console.log('The title of this blog post is "%s".', fullTitle);

    await browser.close();
}

export default getBackup;