// import { User } from '@prisma/client';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type { User };
