import { createHash } from 'crypto';

import { generateIntegritySignature } from './signature.util';

describe('generateIntegritySignature', () => {
  it('should generate a valid SHA256 signature', () => {
    const reference = 'REF123';
    const amount = 5000000;
    const currency = 'COP';
    const integrityKey = 'my-secret-key';

    const expected = createHash('sha256')
      .update(`${reference}${amount}${currency}${integrityKey}`)
      .digest('hex');

    const result = generateIntegritySignature(
      reference,
      amount,
      currency,
      integrityKey,
    );

    expect(result).toBe(expected);
  });

  it('should generate different signatures for different references', () => {
    const signature1 = generateIntegritySignature(
      'REF001',
      5000000,
      'COP',
      'secret',
    );

    const signature2 = generateIntegritySignature(
      'REF002',
      5000000,
      'COP',
      'secret',
    );

    expect(signature1).not.toBe(signature2);
  });

  it('should always return a 64-character hash', () => {
    const signature = generateIntegritySignature(
      'REF123',
      100000,
      'COP',
      'secret',
    );

    expect(signature).toHaveLength(64);
  });
});