import { test, expect } from '@api_fixtures/ApiFixtures';
import { buildUserRegistrationRequest } from '@requests_payload/registration/UserRegistration';
import Ajv from 'ajv';
import path from "path";
import fs from "fs";



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
  expect(responseBody.status).toBe('SUCCESS');

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

  const schemaPath = path.resolve(
    process.cwd(),
    "src",
    "response-schemas",
    "registration",
    "user-registration.json"
  );

  console.log("schemaPath ---> "+schemaPath)
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));


  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(responseBody);

  expect(isValid).toBeTruthy();


  test.info().attach('Response_demo-user-registration', {
    body: JSON.stringify(responseBody),
    contentType: 'application/json',
  });
});