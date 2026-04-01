const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Starting PDF generation...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const filePath = `file://${path.join(__dirname, 'pdf-template.html')}`;
  
  console.log(`Loading ${filePath}`);
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  
  const outputPath = path.join(__dirname, 'Content Band Plan NOVO.pdf');
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  console.log(`PDF successfully generated: ${outputPath}`);
  await browser.close();
})();
