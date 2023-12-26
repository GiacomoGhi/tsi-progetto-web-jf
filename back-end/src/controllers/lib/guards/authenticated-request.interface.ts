import { Role } from '@interfaces';
import { FastifyRequest } from 'fastify';

export interface AuthenticatedRequest extends FastifyRequest {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
  };
}
