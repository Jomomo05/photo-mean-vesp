import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { PhotoService } from 'src/app/services/photo.service';
import {Photo} from '../../interfaces/Photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit{
  id!:string;
  photo!:Photo;

  constructor(private router: Router,
              private activatedRouter: ActivatedRoute,
              private photoService: PhotoService) {

  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe({
      next:(params:any) => {
        console.log(params['id']);
        this.id = params['id'];
        this.photoService.getPhoto(this.id).subscribe({
          next:(res:any) => this.photo = res,
          error:(e) => console.log(e)
        })
      }
    })
  }

  deletePhoto(id:string){
    this.photoService.deletePhoto(id).subscribe({
      next: (res:any) => {
        console.log(res);
        this.router.navigate(['/photos']);
      },
      error: (e) => console.log(e)
    })
  }

  updatePhoto(title:HTMLInputElement, description: HTMLTextAreaElement):boolean{
    this.photoService.updatePhoto(this.id, title.value, description.value).subscribe({
      next:(res:any)=> {console.log(res),
        this.router.navigate(['/photos'])
      },
      error:(e)=> console.log(e)
    })

    return false
  }

}
