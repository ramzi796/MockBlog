import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  data: DialogData = {
    id: 0,
    title: "",
    text: "",
    timestamp: ""
  };

  constructor(public dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) { 
      console.log(dialogData);
      this.data.title = dialogData.title;
      this.data.text = dialogData.text;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}

export interface DialogData {
  id: number;
  title: string;
  text: string;
  timestamp: string
}