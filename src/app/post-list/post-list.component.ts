import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Post, PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts!:Post[];
  loading=false;

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.loading=true;
    this.postService.getPosts().pipe(delay(500)).subscribe(data=>{
      this.posts=data;
      this.loading=false;
    })

  }

}
