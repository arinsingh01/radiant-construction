import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5173');

    // Wait exactly 1.5 seconds for the camera to be mid-flight through the city
    await page.waitForTimeout(1500);

    await page.screenshot({ path: '/Users/arinsingh/.gemini/antigravity/brain/70cdccbd-210d-428d-ba63-bdf355993324/procedural_city_1_5s.png' });

    await browser.close();
})();
