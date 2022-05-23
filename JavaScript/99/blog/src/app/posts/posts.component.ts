import { Component, OnInit } from '@angular/core';
import { Post } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  userId = 1;
  posts: Post[] = [];
  showComments = false;
  comments = null;
  buttonText = 'Show Comments';

  constructor(private usersServices: UsersService) { }

  ngOnInit() {
    this.usersServices.getPosts(this.userId).subscribe((posts) => {
      this.posts = posts;
      console.log(this.posts);
    })
  }

}
