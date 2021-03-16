import { User } from './http.service';

export const getUser = () => JSON.parse(localStorage.getItem('user'));
export const getToken = () => localStorage.getItem('token');
export const setToken = (token: string) => localStorage.setItem('token', token);
export const setUser = (user: User) =>
  localStorage.setItem('user', JSON.stringify(user));
export const deleteToken = () => localStorage.removeItem('token');
export const deleteUser = () => localStorage.setItremoveItemem('user');
export const clearStorage = () => localStorage.clear();

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}

export const sortByDate = (controls: any) => {
  const { value } = controls.createdAt;
  value === 'ASC'
    ? controls.createdAt.setValue('DESC')
    : controls.createdAt.setValue('ASC');
};

export const isMatchPasswords = (password: string, comparedPassword: string) =>
  password === comparedPassword;

export const isRoleMatch = (user: any, role: Role) => user?.role === role;
