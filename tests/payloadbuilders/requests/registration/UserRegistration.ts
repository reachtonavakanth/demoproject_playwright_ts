import { UserRegistrationPayload } from '@requests_types/registration/UserRegistration';
import { loadEnvConfig } from '@test_utils/envLoader';
import { faker } from '@faker-js/faker';


export function buildUserRegistrationRequest(): UserRegistrationPayload {

  return {
    ApplicantBlock:
    {
      applicantID: `APP-${Date.now()}-${faker.string.numeric({ length: 3, allowLeadingZeros: true })}`,
      fullName:
      {
        first: faker.person.firstName(),
        last: faker.person.lastName()
      },
      dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
      country: "US",
      employment:
      {
        status: "Employed",
        employerName: faker.company.name(),
        annualIncome: 85000
      }
    },
    MetaBlock:
    {
      submissionID: `SUB-${faker.string.alphanumeric(10).toUpperCase()}`,
      submittedBy: "Teller-102",
      submissionTimestamp: new Date().toISOString()
    }

  };
}
