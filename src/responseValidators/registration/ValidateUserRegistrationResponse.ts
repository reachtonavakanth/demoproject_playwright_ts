import { RegistrationResponseSchema } from '@response_schema/registration/UserRegistrationSchema';

export function validateRegistrationResponse(payload: unknown) {
  const result = RegistrationResponseSchema.safeParse(payload);

  if (!result.success) {
    throw new Error(`Invalid registration response: ${JSON.stringify(result.error.issues)}`);
  }

  return result.data;
}
