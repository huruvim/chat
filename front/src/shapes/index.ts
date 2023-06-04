export type Nullable<T> = T | null;

export interface User {
  id: string;
  name: string;
}

export interface MessageI {
  id: string;
  text: string;
  user: User;
}

export interface User {
  name: string;
  id: string;
}