export type AccountStatus = "ACTIVE" | "FROZEN" | "CLOSED";

export interface BankUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accounts: BankAccount[];
}

export interface BankAccount {
  id: string;
  accountNumber: string;
  balance: number;
  currency: "USD" | "EUR" | "GBP";
  status: AccountStatus;
  ownerId: string;
}

export const databaseEN: BankUser[] = [
  {
    id: "u1",
    email: "john.smith@mail.com",
    firstName: "John",
    lastName: "Smith",
    accounts: [
      {
        id: "a1",
        accountNumber: "EN1000001",
        balance: 3200,
        currency: "USD",
        status: "ACTIVE",
        ownerId: "u1",
      },
    ],
  },
  {
    id: "u2",
    email: "emily.johnson@mail.com",
    firstName: "Emily",
    lastName: "Johnson",
    accounts: [
      {
        id: "a2",
        accountNumber: "EN1000002",
        balance: 15000,
        currency: "EUR",
        status: "ACTIVE",
        ownerId: "u2",
      },
      {
        id: "a3",
        accountNumber: "EN1000003",
        balance: 500,
        currency: "USD",
        status: "FROZEN",
        ownerId: "u2",
      },
    ],
  },
  {
    id: "u3",
    email: "michael.brown@mail.com",
    firstName: "Michael",
    lastName: "Brown",
    accounts: [
      {
        id: "a4",
        accountNumber: "EN1000004",
        balance: 7800,
        currency: "GBP",
        status: "ACTIVE",
        ownerId: "u3",
      },
    ],
  },
  {
    id: "u4",
    email: "sarah.wilson@mail.com",
    firstName: "Sarah",
    lastName: "Wilson",
    accounts: [
      {
        id: "a5",
        accountNumber: "EN1000005",
        balance: 0,
        currency: "EUR",
        status: "CLOSED",
        ownerId: "u4",
      },
    ],
  },
  {
    id: "u5",
    email: "daniel.miller@mail.com",
    firstName: "Daniel",
    lastName: "Miller",
    accounts: [
      {
        id: "a6",
        accountNumber: "EN1000006",
        balance: 1200,
        currency: "USD",
        status: "ACTIVE",
        ownerId: "u5",
      },
      {
        id: "a7",
        accountNumber: "EN1000007",
        balance: 4300,
        currency: "EUR",
        status: "ACTIVE",
        ownerId: "u5",
      },
    ],
  },
];
