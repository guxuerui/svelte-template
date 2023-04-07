export interface CatsType {
  id: string | number
  name: string
  color?: string
}

export interface Book {
  title: string;
  id: string;
  author: string;
}

export interface Todo {
  id: number;
  done: boolean;
  description: string;
}

export interface User {
  id?: string
  email: string
  password: string
  confirmPassword?: string
}
