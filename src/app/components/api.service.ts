import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogData } from './add-post/add-post.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = "http://localhost:3000/posts";
  constructor(private httpClient: HttpClient) { }

  public get(){  
		return this.httpClient.get(this.SERVER_URL);  
	}

  public set(post: any) {
    if(post) {
      fetch(this.SERVER_URL, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
           "Content-type": "application/json; charset=UTF-8"
        }
     })
    }
  }

  public delete(id: number) {
    if(id > 0) {
      this.httpClient.delete(this.SERVER_URL+ "/" + id).subscribe(data => {
        console.log("Deleted data: ", data);
      });
    }
  }

  public edit(post: DialogData) {
    if(post) {
    //   fetch(this.SERVER_URL, {
    //     method: "PUT",
    //     body: JSON.stringify(post),
    //     headers: {
    //        "Content-type": "application/json; charset=UTF-8"
    //     }
    //  })
      this.httpClient.put(this.SERVER_URL + "/" + post.id, post).subscribe(result => {
        console.log("Updated data: ", result);
      })
    }
  } 
}
