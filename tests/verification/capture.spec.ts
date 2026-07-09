import { test, expect } from '@playwright/test';

test('capture public pages', async ({ page }) => {
  // Home
  await page.goto('http://localhost:3000/');
  await page.screenshot({ path: '/home/jules/verification/home_v2.png', fullPage: true });

  // Packages
  await page.goto('http://localhost:3000/tour-packages');
  await page.screenshot({ path: '/home/jules/verification/packages_v2.png', fullPage: true });

  // Blog
  await page.goto('http://localhost:3000/blog');
  await page.screenshot({ path: '/home/jules/verification/blog_v2.png', fullPage: true });

  // Offbeat
  await page.goto('http://localhost:3000/offbeat-kashmir');
  await page.screenshot({ path: '/home/jules/verification/offbeat_v2.png', fullPage: true });
});
