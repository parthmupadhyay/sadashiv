const puppeteer = require('puppeteer');

async function verifyMobileLayout() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Emulate an iPhone 12 Pro viewport (390 x 844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const url = process.env.TEST_URL || "http://localhost:3000/stotra/rudrashtakam";
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle2" });
  
  // wait for the dock to render
  await page.waitForSelector('.fixed.z-50', { timeout: 10000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 500)); // wait for layout to settle

  let hasErrors = false;

  // 1. Assert: No Horizontal Page Overflow
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  console.log(`Viewport check: clientWidth=${clientWidth}px, scrollWidth=${scrollWidth}px`);
  if (scrollWidth > clientWidth) {
    console.error(`❌ FAILURE: Page has horizontal overflow! (${scrollWidth}px > ${clientWidth}px)`);
    
    // Find the specific element causing the blowout
    const overflowingElements = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      return Array.from(document.querySelectorAll("*"))
        .filter((el) => el.getBoundingClientRect().right > docWidth)
        .map((el) => ({
          tagName: el.tagName,
          className: el.className,
          right: el.getBoundingClientRect().right,
        }))
        .slice(0, 5);
    });
    console.error("Elements causing overflow:", JSON.stringify(overflowingElements, null, 2));
    hasErrors = true;
  } else {
    console.log("✓ SUCCESS: No horizontal page overflow.");
  }

  // 2. Assert: Audio Player Dock Constraints
  const dockBox = await page.evaluate(() => {
    const dock = document.querySelector('.fixed.z-50');
    if (!dock) return null;
    const rect = dock.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };
  });

  if (dockBox) {
    const viewport = { width: 390, height: 844 };
    console.log(`Audio Dock Box: x=${dockBox.x.toFixed(1)}px, width=${dockBox.width.toFixed(1)}px, rightEdge=${(dockBox.x + dockBox.width).toFixed(1)}px, Viewport width=${viewport.width}px`);
    
    if (dockBox.x < 0 || dockBox.x + dockBox.width > viewport.width + 1) {
      console.error("❌ FAILURE: Audio dock extends beyond the left/right screen boundaries!");
      hasErrors = true;
    } else {
      console.log("✓ SUCCESS: Audio dock fits horizontally inside the viewport boundaries.");
    }

    if (dockBox.y + dockBox.height > viewport.height) {
      console.error(`❌ FAILURE: Audio dock overflows bottom of screen! (bottom=${dockBox.y + dockBox.height}px, viewportHeight=${viewport.height}px)`);
      hasErrors = true;
    } else {
      console.log("✓ SUCCESS: Audio dock is fully visible within viewport height.");
    }
  } else {
    console.warn("⚠️ Warning: Audio dock was not detected on the page.");
  }

  // 3. Save Screenshot
  await page.screenshot({ path: "mobile-test-result.png", fullPage: false });
  console.log("✓ Screenshot captured at mobile-test-result.png");

  await browser.close();

  if (hasErrors) {
    process.exit(1);
  }
}

verifyMobileLayout().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
