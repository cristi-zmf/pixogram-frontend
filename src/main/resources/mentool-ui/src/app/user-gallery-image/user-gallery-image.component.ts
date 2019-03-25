import {Component, OnInit} from '@angular/core';
import {MyDialogComponent} from "../shared/my-dialog/my-dialog.component";
import {MatDialog} from "@angular/material";
import {ImageService} from "./image.service";
import {CurrentUserService} from "../login/current-user.service";
import {AuthentifiedUser} from "../login/authentified-user";
import {AppSettings} from "../app-settings";

@Component({
  selector: 'app-user-gallery-image',
  templateUrl: './user-gallery-image.component.html',
  styleUrls: ['./user-gallery-image.component.css']
})
export class UserGalleryImageComponent implements OnInit {
  title = 'app';
  user: AuthentifiedUser;
  userImageIds: Array<{id: string, title: string}>;
  processedImages: {id: string, title: string, img: string, fullImg: string}[] = [];
  baseUrl: string = window.location.origin;

  ngOnInit(): void {
    this.user = this.currentUserService.getCurrentUser();
    this.imageService.getImagesIds(this.user.username).subscribe(
      (imageIds: Array<{id: string, title: string}>) => {
        this.userImageIds = imageIds;
        this.preparePicturesUrls();
      }
  );

  }

  private preparePicturesUrls() {
    let counter: number = 0;
    for(let imageIdTitle of this.userImageIds) {
      console.log(imageIdTitle);
      let processedImage: {id: string, title: string, img: string, fullImg: string} =  {
        id: String(counter),
        title: imageIdTitle.title,
        img: `${this.baseUrl}/${AppSettings.IMAGES_API_PREFIX}/thumbnails/${imageIdTitle.id}`,
        fullImg: `${this.baseUrl}/${AppSettings.IMAGES_API_PREFIX}/full-images/${imageIdTitle.id}`
      };
      this.processedImages.push(processedImage);
    }

  }

  constructor(private dialog: MatDialog, private imageService: ImageService, private currentUserService: CurrentUserService) {}



  display(pic:string):any
  {
    let dialogRef = this.dialog.open(MyDialogComponent, {
      //width: '600px',
      data: pic
    });
    console.log("Clicked "+pic);
  }


}
