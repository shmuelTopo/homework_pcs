import { Component, OnInit } from '@angular/core';
import { Post } from '../models/user';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  userId = 1;
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private usersServices: UsersService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.usersServices.getPosts(id).subscribe((posts) => {
        this.posts = posts;
        console.log(this.posts);
      });
    });
  }
}
