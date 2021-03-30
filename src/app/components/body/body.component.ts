import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent, DialogData } from '../add-post/add-post.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  posts: any[] = [];
  value: any = {};
  post: DialogData = {
	  id: 0,
	  text: "",
	  title: "",
	  timestamp: ""
  };
	constructor(private apiService: ApiService, public dialog: MatDialog) { }
	ngOnInit() {
		this.apiService.get().subscribe((data: any)=>{
			this.posts = data; 
     		this.value = data[0]; 
		})  
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(AddPostComponent, {
		  	data: this.post
		});
	
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.post.text = result.text;
				this.post.title = result.title;
				this.post.id = this.posts.length + 1;
				var date = new Date();
				this.post.timestamp = date.toDateString();
				console.log(this.post);
				this.apiService.set(this.post);
				window.location.reload();
			}
		});
	  }

	delete(id: number) {
		this.apiService.delete(id);
		window.location.reload();
	}

	edit(post: DialogData) {
		const dialogRef = this.dialog.open(AddPostComponent, {
			data: post
	  	});

		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.post.text = result.text;
				this.post.title = result.title;
				this.post.id = result.id;
				this.post.timestamp = result.timestamp;
				console.log(this.post);
				this.apiService.edit(post);
				window.location.reload();
			}
		});
	}

}
