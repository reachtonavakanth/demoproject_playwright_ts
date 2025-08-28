# Deep Dive: Type-Safe API Automation with Playwright & TypeScript

## Introduction

Maintaining robust API tests that are easy to read, reliable, and scalable is a critical challenge for QA teams and tech leaders alike. In modern JavaScript/TypeScript stacks, Playwright has become a go-to tool not just for UI, but for API automation as well. But how do you take API automation to the next level—where types, payloads, and validations are reusable, maintainable, and error-resistant?

This repository explores how to achieve this, with a strong focus on:
- Structuring API payloads using TypeScript types
- Cleanly passing and building values based on these types
- Leveraging the structure for data-driven, type-safe test layers

---
## Sample Request
```
{
    "ApplicantBlock": {
        "applicantID": "APP-20250826-002",
        "fullName": {
            "first": "Jane",
            "last": "Doe"
        },
        "dob": "1990-04-15",
        "country": "US",
        "employment": {
            "status": "Employed",
            "employerName": "Acme Corp",
            "annualIncome": 85000
        }
    },
    "MetaBlock": {
        "submissionID": "SUB-20250826-XYZ123",
        "submittedBy": "Teller-102",
        "submissionTimestamp": "2025-08-26T10:15:00Z"
    }
}
````
## Setup

### Project Structure

- **Types**: Defined in `src/types/requests/registration/`
- **Payload Builders**: Located in `tests/payloadbuilders/requests/registration/`
- **Tests**: Under `tests/integrationTests/registration/`
- **Response Validators**: `src/responseValidators/registration/`
- **Config**: Centralized in `playwright.config.ts` with utility loaders and environment configs

### Installing Dependencies

```bash
npm install
npx playwright install
```

### Configuration Highlights

`playwright.config.ts` demonstrates best practices:
- Single-worker execution for API stability
- Multi-reporter support (HTML, Allure, list, dot)
- Environment config loader for flexible env switching

---

## Types: The Foundation of API Structure

**Example: `UserRegistrationPayload`**

```typescript
export interface FullName {
  first: string;
  last: string;
}

export interface Employment {
  status: 'Employed' | 'Unemployed' | 'Self-Employed' | 'Retired';
  employerName: string;
  annualIncome: number;
}

export interface ApplicantBlock {
  applicantID: string;
  fullName: FullName;
  dob: string;
  country: string;
  employment: Employment;
}

export interface MetaBlock {
  submissionID: string;
  submittedBy: string;
  submissionTimestamp: string;
}

export interface UserRegistrationPayload {
  ApplicantBlock: ApplicantBlock;
  MetaBlock: MetaBlock;
}
```

**Why this matters:**  
- All test data and payloads strictly adhere to this schema.
- Reduces runtime errors due to shape mismatches.
- Makes onboarding and code review fast and unambiguous.

---

## Payload Builders: Generating Valid Data

**Example: `buildUserRegistrationRequest`**

```typescript
import { UserRegistrationPayload } from '@requests_types/registration/user-registration';
import { faker } from '@faker-js/faker';

export function buildUserRegistrationRequest(): UserRegistrationPayload {
  return {
    ApplicantBlock: {
      applicantID: `APP-${Date.now()}-${faker.string.numeric({ length: 3, allowLeadingZeros: true })}`,
      fullName: {
        first: faker.person.firstName(),
        last: faker.person.lastName()
      },
      dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
      country: "US",
      employment: {
        status: "Employed",
        employerName: faker.company.name(),
        annualIncome: 85000
      }
    },
    MetaBlock: {
      submissionID: `SUB-${faker.string.alphanumeric(10).toUpperCase()}`,
      submittedBy: "Teller-102",
      submissionTimestamp: new Date().toISOString()
    }
  };
}
```

**Key Points:**
- Uses [faker.js](https://fakerjs.dev/) to generate realistic test data.
- All values conform to the expected type structure.
- Can easily be extended for negative/edge-case scenarios.

---

## Test Layer: Using the Structure

**Test Example: `user-registration.spec.ts`**

```typescript
import { test, expect } from '@api_fixtures/ApiFixtures';
import { buildUserRegistrationRequest } from '@requests_payload/registration/user-registration';
import { validateRegistrationResponse } from '@response_validators/registration/ValidateUserRegistrationResponse';

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

  const response = await apiContext.post(`${apiUrl}/${endpoint.replace(/^\\/+/, '')}`, { data: payload, headers: apiHeaders });
  const responseBody = await response.json();

  expect(response.ok()).toBeTruthy();
  validateRegistrationResponse(responseBody);

  test.info().attach('Response_demo-user-registration', {
    body: JSON.stringify(responseBody),
    contentType: 'application/json',
  });
});
```

**What’s Happening Here?**
- Payload is always generated via the builder, guaranteeing its correctness.
- Test attaches both request and response for traceability in reports.
- Response is validated against a zod schema (`RegistrationResponseSchema`), ensuring backend API stays contract-compliant.

---

## Best Practices

- **Type Everything**: Never send or expect untyped data. Types are your contract.
- **Reusable Builders**: Centralize payload generation logic. Helps for both positive and negative test scenarios.
- **Schema Validation**: Use libraries like [zod](https://zod.dev/) to enforce response structure.
- **Separation of Concerns**: Types, payload logic, validators, and tests are in separate folders/files for maximum maintainability.
- **Environment Management**: Use environment loaders (`envLoader.ts`) and config files for easy switching/testing.
- **Reporting & Observability**: Attach requests/responses to test reports for easy debugging and audit trails.

---

## Conclusion

By strictly enforcing API structures with TypeScript types, centralizing data builders, and validating responses with schemas, you create a test suite that is robust, scalable, and easy.

**Happy testing!**
