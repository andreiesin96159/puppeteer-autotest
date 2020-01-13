const puppeteer = require('puppeteer');

const chromeOptions = {
    headless:false,
    executablePath:'google-chrome',
    slowMo: 10,
};

(async function main() {
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.setViewport({width:1535, height:756});
    await page.goto('https://webkul.com/blog/request-quote/');



    await page.waitFor('#wpcf7-f152955-o1');


    const name= await page.waitForXPath('//input[@name="your-name"]');
    await name.type("testing");

    const email= await page.waitForXPath('//input[@name="your-email"]');
    await email.type("test@webkul.com");

    const subject= await page.waitForXPath('//input[@name="your-subject"]');
    await subject.type("Regular testing the contacts page");

    const message= await page.waitForXPath('//textarea[@name="your-message"]');
    await message.type("Regular testing the contacts page with puppeteer");





    const button = await page.waitForSelector(".wpcf7-submit");
    await button.click();

    await page.waitForSelector('.wpcf7-response-output', {
        div:"Thank you for your message. It has been sent.",
        div:"One or more fields have an error. Please check and try again.",
        div:"There was an error trying to send your message. Please try again later.",

    });

    await browser.close();
})();
