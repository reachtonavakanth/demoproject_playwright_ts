import { z } from 'zod';

export const RegistrationResponseSchema = z.object({
  status: z.string(),
  applicantID: z.string(),
});
