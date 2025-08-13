// tests/inbound/IF041.spec.ts

import { test, expect, request } from '@playwright/test';
import { buildIF041Payload } from '@inbound_builders/IF-041';
import testData from '@test_data/inbound/if-041/readingcos.json';
import { loadEnvConfig } from '@test_utils/envLoader';

const testEnvConfig = loadEnvConfig();

test('Send IF-041 inbound payload', async () => {

  const context = await request.newContext();
  const payload = buildIF041Payload(testData.tc_01.mpan, testData.tc_01.gsp,testData.tc_01.senderRoleID ,testData.tc_01.meterId, testData.tc_01.cumulativeRegisterReading, testData.tc_01.cumulativeRegisterReadingDateTime, testData.tc_01.readingMethod, testData.tc_01.siteVisitCheckCode);
  console.log('Payload:', JSON.stringify(payload, null, 2));

  test.info().attach('IF-041 Payload', {
    body: JSON.stringify(payload),
    contentType: 'application/json',
  });

  test.info().annotations.push({
    type: 'Info',
    description: 'Running IF041 payload test',
  });

  const url = new URL('api/inbound/IF-041', testEnvConfig.baseUrl);
console.log(url);
const response = await context.post(url.toString(), {
  data: payload
});
console.log(response)
  expect(response.ok()).toBeTruthy();
});
