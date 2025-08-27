import { test as base, APIRequestContext, expect as baseExpect } from '@playwright/test';
import { loadEnvConfig } from '@test_utils/envLoader';

const testEnvConfig = loadEnvConfig();

type MyFixtures = {
  apiContext: APIRequestContext;
  apiUrl: string;
  apiHeaders: Record<string, string>;
};

export const test = base.extend<MyFixtures>({
  // Base URL fixture
  apiUrl: async ({}, use) => {
    // Ensure no trailing slash
    const baseUrl = testEnvConfig.baseUrl.replace(/\/$/, '');
    await use(baseUrl);
  },

  // Dynamic headers fixture
  apiHeaders: async ({}, use) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${testEnvConfig.authToken}`, 
    };
    await use(headers);
  },


  apiContext: async ({ request }, use) => {
    await use(request);
  },
});

export const expect = baseExpect;