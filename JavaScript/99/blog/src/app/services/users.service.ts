import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { UserDto, Post } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<UserDto[]>('https://jsonplaceholder.typicode.com/users')
    .pipe(
      map((res) => {
        return res.map((user: UserDto) => {
          return {
            name: user.name,
            website: user.website,
            email: user.email,
            companyName: user.company.name,
            companyCatchPhrase: user.company.catchPhrase,
            companyBs: user.company.bs
          }
        })
      })
    );
  }

  getPosts(userId: number) {
    return this.httpClient.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  }
}
