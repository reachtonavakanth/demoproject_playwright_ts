// utils/dynamicDataGenerators.ts

import { formatISO, format } from 'date-fns';

const ID_DATE_FORMAT = 'yyyyMMdd';

function formatDate(date: Date, pattern: string): string {
  return format(date, pattern);
}

function generateUUID(): string {
  return crypto.randomUUID().replace(/-/g, '').toUpperCase();
}

function generateUUIDSuffix(): string {
  return generateUUID().substring(0, 16);
}

function generateRandomHex(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0'))
    .join('')
    .substring(0, length)
    .toUpperCase();
}

export function generateSenderUniqueReference(
  messageName: string,
  senderDipId: string,
  senderRoleID: string
): string {
  const datePart = formatDate(new Date(), ID_DATE_FORMAT);
  const randomSuffix = generateRandomHex(5);
  return `S-${messageName}-${senderDipId}-${senderRoleID}-${datePart}-${randomSuffix}`;
}

export function generateSenderTimestamp(): string {
  return formatISO(new Date()); // e.g., 2025-08-12T21:36:09+01:00
}

export function generateSenderCorrelationID(): string {
  const datePart = formatDate(new Date(), ID_DATE_FORMAT);
  return `CI-${datePart}-${generateUUIDSuffix()}`;
}

export function generateTransactionID(
  messageName: string,
  senderDipId: string,
  roleID: string
): string {
  const datePart = formatDate(new Date(), ID_DATE_FORMAT);
  return `T-${messageName}-${senderDipId}-${roleID}-${datePart}-${generateUUIDSuffix()}`;
}

export function generateTransactionTimestamp(): string {
  return generateSenderTimestamp();
}

export function generateInitialCorrelationID(): string {
  return generateSenderCorrelationID();
}
