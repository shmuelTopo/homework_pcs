import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private usersServices: UsersService){}
  users: User[] = [];

  ngOnInit() {
    this.usersServices.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  
}
