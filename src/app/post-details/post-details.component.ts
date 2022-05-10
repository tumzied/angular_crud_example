import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PostService,Comment } from '../post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post!:Post;
  comments!:Comment[];
  id:string | null | undefined;
  postLoading=false;
  commentLoading=false;

  constructor(private postService:PostService,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.postLoading=true;
    this.commentLoading=true;

    this.activeRoute.paramMap.subscribe((param)=>{
      this.id=param.get('id');
    })
    if(this.id){

      this.postService.getPost(this.id).subscribe(data=>{
        this.post=data;
        this.postLoading=false;
      });

      this.postService.getCommentOf(this.id).subscribe(data=>{
        this.comments=data;
        this.commentLoading=false;
      })

    
    }
  }

}
