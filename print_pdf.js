const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const filePath = path.resolve(__dirname, 'SmartEVP_Plus_Documentation.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: 'SmartEVP_Plus_Documentation.pdf',
    printBackground: true,
    format: 'A4',
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  await browser.close();
  console.log('PDF generated successfully!');
})();
