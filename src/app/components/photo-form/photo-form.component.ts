import { Component, OnInit } from '@angular/core';
import {Router } from "@angular/router";
import {PhotoService} from "../../services/photo.service";

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  file!: File;
  photoSelected!: ArrayBuffer | null;

  constructor(private photoService:PhotoService, private router:Router) { }

  ngOnInit(): void {

  }

  onPhotoSelected(event: any): void{
    if(this.file=event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      // Image preview
      const reader = new FileReader();
      reader.onload =(e: ProgressEvent<FileReader>) => {
        this.photoSelected = e.target?.result as ArrayBuffer;
      }
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title:HTMLInputElement, description:HTMLTextAreaElement):boolean{
    this.photoService.createPhoto(title.value, description.value, this.file)
      .subscribe({
        complete:()=>this.router.navigate(['/photos']),
        error:(e)=> console.log(e)
      });

}
