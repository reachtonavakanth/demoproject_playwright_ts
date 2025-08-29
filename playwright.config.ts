import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,           // 30 seconds per test
  testDir: './tests',           // Directory containing your tests
  fullyParallel: false,         // Run tests in the same worker
  workers: 1,                   // Single worker for consistent results
  reporter: [
    ['html'],                   // HTML report
    ['allure-playwright'],      // Allure report
    ['dot'],                    // Dot reporter in console
    ['list']                    // List reporter in console
  ],
  use: {
    trace: 'on-first-retry',    // Capture trace only on first retry
  },
  projects: [
    {
      name: 'Demo API Tests',        // Project name will appear in reports
    },
  ],
});