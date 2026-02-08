import { test, expect } from '@playwright/test';

test.describe('Microfrontend Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to shell app
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('Shell app loads successfully', async ({ page }) => {
    // Check if shell header is visible
    await expect(page.locator('h1')).toContainText('Microfrontend Shell');
    
    // Check if navigation is present
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for navigation buttons
    await expect(page.locator('text=🏠 Home')).toBeVisible();
    await expect(page.locator('text=⚛️ React')).toBeVisible();
    await expect(page.locator('text=▲ Next.js')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/microfrontend/screenshots/01-shell-home.png', fullPage: true });
  });

  test('Home page displays welcome message and token', async ({ page }) => {
    // Check welcome message
    await expect(page.locator('h2')).toContainText('Welcome to the Microfrontend Demo');
    
    // Check if demo token is displayed
    await expect(page.locator('text=Shared Token:')).toBeVisible();
    await expect(page.locator('text=demo-token-123')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/microfrontend/screenshots/02-home-token.png', fullPage: true });
  });

  test('React playground loads in shell', async ({ page }) => {
    // Click React navigation
    await page.click('text=⚛️ React');
    
    // Wait for React component to load
    await page.waitForTimeout(2000);
    
    // Check if React widget loaded
    const reactWidget = page.locator('text=React Widget Component');
    await expect(reactWidget).toBeVisible({ timeout: 10000 });
    
    // Check if token is displayed in widget
    await expect(page.locator('code:has-text("demo-token-123")')).toBeVisible();
    
    // Test counter functionality
    const counterValue = page.locator('.counter-demo strong');
    await expect(counterValue).toContainText('0');
    
    // Click increment button
    await page.click('text=Increment');
    await expect(counterValue).toContainText('1');
    
    // Click decrement button
    await page.click('text=Decrement');
    await expect(counterValue).toContainText('0');
    
    // Take screenshot
    await page.screenshot({ path: 'tests/microfrontend/screenshots/03-react-playground.png', fullPage: true });
  });

  test('Next.js playground loads in shell', async ({ page }) => {
    // Click Next.js navigation
    await page.click('text=▲ Next.js');
    
    // Wait for Next.js component to load
    await page.waitForTimeout(2000);
    
    // Check if Next.js widget loaded
    const nextWidget = page.locator('text=Next.js Widget Component');
    await expect(nextWidget).toBeVisible({ timeout: 10000 });
    
    // Check if token is displayed in widget
    await expect(page.locator('code:has-text("demo-token-123")')).toBeVisible();
    
    // Test counter functionality
    const counterValue = page.locator('.counter-demo strong');
    await expect(counterValue).toContainText('0');
    
    // Click increment twice
    await page.click('text=Increment');
    await page.click('text=Increment');
    await expect(counterValue).toContainText('2');
    
    // Click reset
    await page.click('text=Reset');
    await expect(counterValue).toContainText('0');
    
    // Take screenshot
    await page.screenshot({ path: 'tests/microfrontend/screenshots/04-next-playground.png', fullPage: true });
  });

  test('Angular playground loads in shell', async ({ page }) => {
    // Click Angular navigation
    await page.click('text=🅰️ Angular');
    
    // Wait for Angular component to load
    await page.waitForTimeout(2000);
    
    // Check if Angular widget loaded
    const angularWidget = page.locator('text=Angular Widget Component');
    await expect(angularWidget).toBeVisible({ timeout: 10000 });
    
    // Check if token is displayed in widget
    await expect(page.locator('code:has-text("demo-token-123")')).toBeVisible();
    
    // Test counter functionality
    const counterValue = page.locator('.counter-demo strong');
    await expect(counterValue).toContainText('0');
    
    // Click increment button
    await page.click('text=Increment');
    await expect(counterValue).toContainText('1');
    
    // Click decrement button
    await page.click('text=Decrement');
    await expect(counterValue).toContainText('0');
    
    // Take screenshot
    await page.screenshot({ path: 'tests/microfrontend/screenshots/04-angular-playground.png', fullPage: true });
  });

  test('All 3 playgrounds open from shell successfully', async ({ page }) => {
    // Test React Playground
    await page.click('text=⚛️ React');
    await page.waitForTimeout(2000);
    await expect(page.locator('text=React Widget Component')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('code:has-text("demo-token-123")')).toBeVisible();
    console.log('✅ React playground loaded successfully');
    
    // Navigate back to home
    await page.click('text=🏠 Home');
    await page.waitForTimeout(500);
    
    // Test Angular Playground
    await page.click('text=🅰️ Angular');
    await page.waitForTimeout(2000);
    await expect(page.locator('text=Angular Widget Component')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('code:has-text("demo-token-123")')).toBeVisible();
    console.log('✅ Angular playground loaded successfully');
    
    // Navigate back to home
    await page.click('text=🏠 Home');
    await page.waitForTimeout(500);
    
    // Test Next.js Playground
    await page.click('text=▲ Next.js');
    await page.waitForTimeout(2000);
    await expect(page.locator('text=Next.js Widget Component')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('code:has-text("demo-token-123")')).toBeVisible();
    console.log('✅ Next.js playground loaded successfully');
    
    // Take final screenshot showing all playgrounds work
    await page.screenshot({ path: 'tests/microfrontend/screenshots/05-all-playgrounds-verified.png', fullPage: true });
    
    console.log('✅✅✅ All 3 playgrounds opened successfully from shell!');
  });

  test('Navigation between playgrounds works without page reload', async ({ page }) => {
    let navigationCount = 0;
    
    // Listen for page navigation (should not happen)
    page.on('framenavigated', (frame) => {
      if (frame === page.mainFrame()) {
        navigationCount++;
      }
    });
    
    // Navigate to React
    await page.click('text=⚛️ React');
    await page.waitForTimeout(1000);
    await expect(page.locator('text=React Widget Component')).toBeVisible({ timeout: 10000 });
    
    // Navigate to Next.js
    await page.click('text=▲ Next.js');
    await page.waitForTimeout(1000);
    await expect(page.locator('text=Next.js Widget Component')).toBeVisible({ timeout: 10000 });
    
    // Navigate back to Home
    await page.click('text=🏠 Home');
    await page.waitForTimeout(500);
    await expect(page.locator('h2')).toContainText('Welcome');
    
    // Should only have initial navigation
    expect(navigationCount).toBeLessThanOrEqual(1);
    
    // Take screenshot
    await page.screenshot({ path: 'tests/microfrontend/screenshots/05-navigation-flow.png', fullPage: true });
  });

  test('Token sharing works across playgrounds', async ({ page }) => {
    // Check home page token
    await expect(page.locator('text=demo-token-123')).toBeVisible();
    
    // Navigate to React and check token
    await page.click('text=⚛️ React');
    await page.waitForTimeout(2000);
    await expect(page.locator('code:has-text("demo-token-123")')).toBeVisible({ timeout: 10000 });
    
    // Navigate to Next.js and check token
    await page.click('text=▲ Next.js');
    await page.waitForTimeout(2000);
    await expect(page.locator('code:has-text("demo-token-123")')).toBeVisible({ timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ path: 'tests/microfrontend/screenshots/06-token-sharing.png', fullPage: true });
  });

  test('Standalone React playground works', async ({ page }) => {
    // Navigate directly to React playground
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    
    // Check if React app loaded
    await expect(page.locator('h1')).toContainText('React Playground');
    await expect(page.locator('text=React Widget Component')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/microfrontend/screenshots/07-react-standalone.png', fullPage: true });
  });

  test('Standalone Next.js playground works', async ({ page }) => {
    // Navigate directly to Next.js playground
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');
    
    // Check if Next.js app loaded
    await expect(page.locator('h1')).toContainText('Next.js-style Playground');
    await expect(page.locator('text=Next.js Widget Component')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/microfrontend/screenshots/08-next-standalone.png', fullPage: true });
  });

  test.skip('Error handling when playground is not available', async ({ page }) => {
    // This test is skipped when all playgrounds are running
    // It tests error handling when Angular is NOT running
    // To test error handling, stop the Angular playground and remove .skip
    
    // Navigate to Angular (when it's not running)
    await page.click('text=🅰️ Angular');
    await page.waitForTimeout(2000);
    
    // Check if error message is displayed
    await expect(page.locator('text=Angular Playground Not Available')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Make sure the Angular playground is running')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/microfrontend/screenshots/09-error-handling.png', fullPage: true });
  });
});

test.describe('Microfrontend Visual Tests', () => {
  test('Full integration flow with screenshots', async ({ page }) => {
    // 1. Shell Home
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/microfrontend/screenshots/flow-01-home.png', fullPage: true });
    
    // 2. React Playground
    await page.click('text=⚛️ React');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/microfrontend/screenshots/flow-02-react.png', fullPage: true });
    
    // 3. Interact with React counter
    await page.click('text=Increment');
    await page.click('text=Increment');
    await page.click('text=Increment');
    await page.screenshot({ path: 'tests/microfrontend/screenshots/flow-03-react-counter.png', fullPage: true });
    
    // 4. Next.js Playground
    await page.click('text=▲ Next.js');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/microfrontend/screenshots/flow-04-next.png', fullPage: true });
    
    // 5. Interact with Next counter
    await page.click('text=Increment');
    await page.click('text=Increment');
    await page.screenshot({ path: 'tests/microfrontend/screenshots/flow-05-next-counter.png', fullPage: true });
    
    // 6. Back to Home
    await page.click('text=🏠 Home');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/microfrontend/screenshots/flow-06-back-home.png', fullPage: true });
    
    console.log('✅ All screenshots captured successfully!');
  });
});
