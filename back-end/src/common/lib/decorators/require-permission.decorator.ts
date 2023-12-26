import { SetMetadata } from '@nestjs/common';

export const REQUIREPERMISSIONS_KEY = 'requirepermissions';
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(REQUIREPERMISSIONS_KEY, permissions);
