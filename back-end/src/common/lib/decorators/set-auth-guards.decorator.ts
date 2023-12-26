import { CanActivate, SetMetadata, Type } from '@nestjs/common';

export const SetAuthGuards = (...guards: Type<CanActivate>[]) => {
  return SetMetadata('authGuards', guards);
};
