import { Admin, User } from './http.service';

export const getPerson = () => JSON.parse(localStorage.getItem('person'));
export const getToken = () => localStorage.getItem('token');
export const setToken = (token: string) => localStorage.setItem('token', token);
export const setPerson = (person: Admin | User) =>
  localStorage.setItem('person', JSON.stringify(person));
export const deleteToken = () => localStorage.removeItem('token');
export const deletePerson = () => localStorage.setItremoveItemem('person');
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
