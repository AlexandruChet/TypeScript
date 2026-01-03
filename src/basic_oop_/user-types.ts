export type UserRole = "ADMIN" | "USER";

export interface User {
  id: number;
  role: UserRole;
  isBlocked: boolean;
}
