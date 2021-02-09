import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface User {
  email: string;
  id: string;
  image: string;
  name: string;
  password: string;
  role: 'user';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  sender: string;
  admin: Omit<Admin, 'id'>;
  room: string;
  message: string;
}

export interface Room {
  id?: string;
  title: string;
  description: string;
  admin: Admin;
  user: User;
  messages: any;
  open: boolean;
  resolved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Request {
  id?: string;
  title: string;
  description: string;
  creator: Admin | User;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  email: string;
  id: string;
  image: string;
  name: string;
  password: string;
  role: 'admin' | 'super_admin';
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  private get(prefix: string) {
    return this.http.get<any>(`${this.baseUrl}/${prefix}`);
  }

  private post(prefix: string, data: any) {
    return this.http.post<any>(`${this.baseUrl}/${prefix}`, data);
  }

  private delete(prefix: string) {
    return this.http.delete<any>(`${this.baseUrl}/${prefix}`);
  }

  private patch(prefix: string, data: any) {
    return this.http.patch<any>(`${this.baseUrl}/${prefix}`, data);
  }

  create(prefix: string, data: any) {
    return this.post(prefix, data);
  }

  find(prefix: string) {
    return this.get(prefix);
  }

  findOne(prefix: string, id: string) {
    return this.get(`${prefix}/${id}`);
  }

  deleteOne(prefix: string, id: string) {
    return this.delete(`${prefix}/${id}`);
  }

  update(prefix: string, id: string, data: any) {
    return this.patch(`${prefix}/${id}`, data);
  }

  queryBuilder(url: string, query: string) {
    let option = query.includes('createdAt') ? 'sort' : 'search';

    console.log(option);
    console.log(query);

    this.router.navigate([], {
      queryParams: { [option]: `${query}` },
      queryParamsHandling: 'merge',
    });

    return this.find(`${url}?${option}=${query}`);
  }
}
