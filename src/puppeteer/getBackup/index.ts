import puppeteer from 'puppeteer';
require('dotenv').config()

function delay(time: number) {
    return new Promise(function(resolve) {
      setTimeout(resolve, time);
    });
  }

async function getBackup(){
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'] });
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto(`https://${process.env.PROXMOX_HOST}:${process.env.PROXMOX_PORT}`);

    // Set screen size.
    await page.setViewport({width: 1080, height: 1024});

    // Type into search box.
    await page.locator('input[name="username"]').fill(process.env.PROXMOX_USER!);
    await page.locator('input[name="password"]').fill(process.env.PROXMOX_PASSWORD!);

    // Wait and click on first result.
    await page.click('a.x-btn.x-unselectable.x-box-item.x-toolbar-item.x-btn-default-small');
    await delay(1000)
    await page.reload()

    await delay(2000)
    await page.click('::-p-xpath(//*[@id="treeview-1013-record-478"]/tbody/tr/td/div/div[2])')
    await page.click('::-p-xpath(//*[@id="treeview-1013-record-479"]/tbody/tr/td/div)')
    await page.click('::-p-xpath(//*[@id="ext-element-229"])')
    
    await delay(1000)
    const backup = await page.$$("::-p-xpath('/html/body/div[2]/div/div/div[3]/div/div/div[3]/div[1]/div[2]/table/tbody/tr/td[6]/div')");
    const valor = await page.evaluate(el => el.textContent, backup[0]);
    console.log(valor!.trim());

    await browser.close();
}

export default getBackup;