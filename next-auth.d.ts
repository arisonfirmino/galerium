export declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
    };
  }

  interface User extends AdapterUser {
    id: string;
    username: string;
  }
}
