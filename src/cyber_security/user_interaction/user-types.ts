export type UserRole = "ADMIN" | "USER";
export type AdminWarning = "OK" | "ADMIN WARNING"

export type User =
  | {
      id: number;
      name: string;
      role: "ADMIN";
      isBlocked: boolean;
      notes: string[];
      adminLevel: number;
      warnings: AdminWarning;
      adminPassword: string;
    }
  | {
      id: number;
      name: string;
      role: "USER";
      isBlocked: boolean;
      notes: string[];
    };
