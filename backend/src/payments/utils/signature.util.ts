import { createHash } from 'crypto';

export function generateIntegritySignature(
  reference: string,
  amountInCents: number,
  currency: string,
  integrityKey: string,
): string {

  const data =
    `${reference}${amountInCents}${currency}${integrityKey}`;

  return createHash('sha256')
    .update(data)
    .digest('hex');
}