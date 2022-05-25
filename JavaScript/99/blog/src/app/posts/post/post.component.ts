import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { Post, Comment } from '../../models/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  constructor(private usersServices: UsersService){}

  showComments = false;
  buttonText = 'Show Comments';
  @Input() post!: Post;

  showHideComments() {
    console.log(this.post);
    this.showComments = !this.showComments;
    if (this.showComments) {
      this.buttonText = 'Hide Comments';
    } else {
      this.buttonText = 'Show Comments';
    }
  }
}
