export type UserRole = "ADMIN" | "USER";

export interface User {
  id: number;
  name: string;
  role: UserRole;
  isBlocked: boolean;
  notes: string[];
}
