import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { GlobalAlertService,AlertType } from './global-alert.service';
import { Router } from '@angular/router';

export interface Post{
  userId:number,
  id:number,
  title:string,
  body:string
}

export interface Comment{
  postId:number,
  id:number,
  name:string,
  email:string,
  body:string
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl='https://jsonplaceholder.typicode.com'
  constructor(private http:HttpClient,private alertService:GlobalAlertService,private router:Router) { }

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl+"/posts")
  }

  getPost(id:string):Observable<Post>{
    return this.http.get<Post>(this.baseUrl+"/posts"+`/${id}`).pipe(
      catchError((err: HttpErrorResponse)=>{
        if(err.status==404){
          this.alertService.addAlert({type:AlertType.warning,message:`Post with id=${id} does not Exits`});
        }else{
          this.alertService.addAlert({type:AlertType.warning,message:err.message});
        }
        this.router.navigate(['/404'])
        
        return of()
      })
    )
  }


  getCommentOf(id:string):Observable<Comment[]>{
    return this.http.get<Comment[]>(this.baseUrl+"/posts"+`/${id}/comments`)
  }

  addPost(body:string){
    const headers=new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    })
    return this.http.post(this.baseUrl+"/posts",body,{headers:headers})
  }


  updatePost(id:string,body:string):Observable<Post>{
    const headers=new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    })
    return this.http.patch<Post>(this.baseUrl+`/posts/${id}`,body,{headers:headers})
  }



}
