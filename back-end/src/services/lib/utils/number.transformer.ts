import { ValueTransformer } from 'typeorm';

export class NumberTransformer implements ValueTransformer {
  /**
   * Used to marshal Decimal when writing to the database.
   */
  to(value?: number): string | null {
    return value?.toString() || null;
  }
  /**
   * Used to unmarshal Decimal when reading from the database.
   */
  from(dbValue?: string): number | null {
    return dbValue != null ? Number(dbValue) : null;
  }
}
