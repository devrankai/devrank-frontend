export enum USER_ROLE {
  USER = "user",
  ADMIN = "admin",
}

export interface UserInterface {
  role?: USER_ROLE | null;
  token?: string | null;
  full_name?: string | null;
}

export class User {
  status: string;
  role: string | null;
  token: string | null;
  full_name: string | null;

  constructor({ role, token, full_name }: UserInterface) {
    this.status = this.status = "SUCCESS";
    this.role = role || "";
    this.token = token || null;
    this.full_name = full_name || null;
  }
}
