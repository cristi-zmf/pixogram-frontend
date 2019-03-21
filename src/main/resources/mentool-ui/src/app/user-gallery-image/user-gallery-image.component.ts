import {Component, OnInit} from '@angular/core';
import {MyDialogComponent} from "../shared/my-dialog/my-dialog.component";
import {MatDialog} from "@angular/material";
import {ImageService} from "./image.service";
import {CurrentUserService} from "../login/current-user.service";
import {User} from "../user/user";
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
  userImageIds: Array<String>;
  processedImages: {id: string, title: string, img: string, fullImg: string}[] = [];
  baseUrl: string = window.location.origin;

  ngOnInit(): void {
    this.user = this.currentUserService.getCurrentUser();
    this.imageService.getImagesIds(this.user.username).subscribe(
      (imageIds: Array<String>) => {
        this.userImageIds = imageIds;
        console.log(this.userImageIds);
        this.preparePicturesUrls();
        console.log(this.processedImages);
      }
  );

  }

  private preparePicturesUrls() {
    let counter: number = 0;
    for(let imageId of this.userImageIds) {
      console.log(imageId);
      let processedImage: {id: string, title: string, img: string, fullImg: string} = {};
      processedImage.img = `${this.baseUrl}/${AppSettings.IMAGES_API_PREFIX}/thumbnails/${imageId}`;
      processedImage.title = `Image no. ${counter}`;
      processedImage.id = String(counter);
      processedImage.fullImg = `${this.baseUrl}/${AppSettings.IMAGES_API_PREFIX}/full-image/${imageId}`;
      console.log(processedImage);
      this.processedImages.push(processedImage);
    }

  }

  constructor(private dialog: MatDialog, private imageService: ImageService, private currentUserService: CurrentUserService) {}

  pictures = [
    {
      id: 1,
      title: 'A natural view',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg'
    },
    {
      id: 2,
      title: 'Newspaper',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/LTLE4QGRVQ.jpg'
    },
    {
      id: 3,
      title: 'Favourite pizza',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/R926LU1YEA.jpg'
    },
    {
      id: 4,
      title: 'Abstract design',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/U9PP3KXXY2.jpg'
    },
    {
      id: 5,
      title: 'Tech',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/NO9CN3QYR3.jpg'
    },
    {
      id: 6,
      title: 'Nightlife',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/X1UK6NLGRU.jpg'
    },
  ];

  display(pic:string):any
  {
    let dialogRef = this.dialog.open(MyDialogComponent, {
      //width: '600px',
      data: pic
    });
    console.log("Clicked "+pic);
  }


}
