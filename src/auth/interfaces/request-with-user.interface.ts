// src/auth/interfaces/request-with-user.interface.ts
import { Role } from 'src/users/users.entity';

export interface RequestWithUser {
  user: {
    id: string;
    role: Role;
    organisation: {
      id: string;
    };
  };
}
