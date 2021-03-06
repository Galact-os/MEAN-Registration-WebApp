import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "@/_models";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http
      .post<any>(`${config.apiUrl}/user/authenticate`, { email, password })
      .pipe(
        map((user) => {
          if (user && user.length) {
            this.currentUserSubject.next(user[0]);
            return user;
          }
          return null;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
