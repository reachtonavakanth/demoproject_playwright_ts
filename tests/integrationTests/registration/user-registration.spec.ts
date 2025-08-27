import { test, expect } from '@api_fixtures/ApiFixtures';
import { buildUserRegistrationRequest } from '@requests_payload/registration/user-registration';
// import testData from '@test_data/inbound/if-041/readingcos.json';
import { loadEnvConfig } from '@test_utils/envLoader';
import {validateRegistrationResponse} from '@response_validators/registration/ValidateUserRegistrationResponse';

const testEnvConfig = loadEnvConfig();

test('verify demo-user-registration', async ({ apiContext, apiUrl, apiHeaders }) => {
  const endpoint = 'demo-user-registration';

  let payload;

  await test.step('generating Payload for demo-user-registration test', async () => {
    payload = buildUserRegistrationRequest();

  });

  test.info().attach('Request_demo-user-registration', {
    body: JSON.stringify(payload),
    contentType: 'application/json',
  });
  const response = await apiContext.post(`${apiUrl}/${endpoint.replace(/^\/+/, '')}`, { data: payload, headers: apiHeaders, });
  const responseBody = await response.json();
  console.log(response)

  expect(response.ok()).toBeTruthy();
  test.info().attach('Response_demo-user-registration', {
    body: JSON.stringify(responseBody),
    contentType: 'application/json',
  });
});

test('verify demo-user-registrations api schema', async ({ apiContext, apiUrl, apiHeaders }) => {
  const endpoint = 'demo-user-registration';

  let payload;

  await test.step('generating Payload for demo-user-registration test', async () => {
    payload = buildUserRegistrationRequest();

  });

  test.info().attach('Request_demo-user-registration', {
    body: JSON.stringify(payload),
    contentType: 'application/json',
  });
  const response = await apiContext.post(`${apiUrl}/${endpoint.replace(/^\/+/, '')}`, { data: payload, headers: apiHeaders, });
  const responseBody = await response.json();
  console.log(response)

  validateRegistrationResponse(response);
  expect(response.status).toBe('SUCCESS');

  expect(response.ok()).toBeFalsy();
  test.info().attach('Response_demo-user-registration', {
    body: JSON.stringify(responseBody),
    contentType: 'application/json',
  });
});