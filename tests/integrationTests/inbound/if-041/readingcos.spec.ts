// tests/inbound/IF041.spec.ts

import { test, expect, request } from '@playwright/test';
import { buildIF041Payload } from '@inbound_builders/IF-041';

test('Send IF-041 inbound payload', async () => {
  const context = await request.newContext();
  const payload = buildIF041Payload();

  console.log(payload)

  test.info().attach('IF-041 Payload', {
    body: JSON.stringify(payload),
    contentType: 'application/json',
  });

  test.info().annotations.push({
    type: 'Info',
    description: 'Running IF041 payload test',
  });

  // const response = await context.post('/api/inbound/IF-041', {
  //   data: payload
  // });

  // expect(response.ok()).toBeTruthy();
});
