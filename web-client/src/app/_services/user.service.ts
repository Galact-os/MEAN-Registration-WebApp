import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "@/_models";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/user`);
  }

  register(user: User) {
    return this.http.post(`${config.apiUrl}/user`, user);
  }

  delete(email: string) {
    return this.http.post(`${config.apiUrl}/user/${email}`, {});
  }
}
