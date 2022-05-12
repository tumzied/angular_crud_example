import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertType, GlobalAlertService } from '../global-alert.service';
import { Post, PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  pageHeader = 'Add Post';
  submitBtnText='ADD';

  contactForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('',[Validators.required]),
  });

  postId: string | null = null;

  constructor(
    private postService: PostService,
    private ar: ActivatedRoute,
    private alertService: GlobalAlertService
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((param) => {
      this.postId = param.get('id');

      if (this.postId) {
        this.pageHeader = 'Update Post';
        this.submitBtnText="Update"
        this.postService.getPost(this.postId).subscribe((data) => {
          this.contactForm.setValue({ title: data.title, body: data.body });
        });
      }
    });
  }

  get title(){
    return this.contactForm.get('title')
  }

  get body(){
    return this.contactForm.get('body')
  }

  submit() {
    if(this.contactForm.invalid)
      return;

    if (!this.postId) {
      const body = JSON.stringify({ ...this.contactForm.value, userId: 1 });
      this.postService.addPost(body).subscribe({
        next: () => {
          this.contactForm.reset();
          this.alertService.addAlert({
            type: AlertType.success,
            message: 'Post added successfully',
          });
        },
      });
    } else {
      const body = JSON.stringify({ ...this.contactForm.value });
      this.postService.updatePost(this.postId, body).subscribe({
        next: (data) => {
          console.log(data);
          this.contactForm.setValue({ title: data.title, body: data.body });
          this.alertService.addAlert({
            type: AlertType.success,
            message: 'Post updated successfully',
          });
        },
      });
    }
  }
}
