import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Comment } from '../models/user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  constructor(private userServices: UsersService) {}

  @Input() postId = 0;

  comments!: Observable<Comment[]>;

  ngOnInit() {
    this.comments = this.userServices.getComments(this.postId);
  }
}
