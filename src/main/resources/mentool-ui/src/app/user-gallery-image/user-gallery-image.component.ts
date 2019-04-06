import {Component, OnInit} from '@angular/core';
import {MyDialogComponent} from "../shared/my-dialog/my-dialog.component";
import {MatDialog} from "@angular/material";
import {ImageService} from "./image.service";
import {CurrentUserService} from "../login/current-user.service";
import {AuthentifiedUser} from "../login/authentified-user";
import {AppSettings} from "../app-settings";
import {ImageSummary} from "./image-summary";
import {ActivatedRoute} from "@angular/router";

interface ImageIdentificationInfo {
  id: string,
  title: string,
  img: string,
  fullImg: string
}

@Component({
  selector: 'app-user-gallery-image',
  templateUrl: './user-gallery-image.component.html',
  styleUrls: ['./user-gallery-image.component.css']
})
export class UserGalleryImageComponent implements OnInit {
  title = 'app';
  userAddress: string;
  userImageIds: Array<{id: string, title: string}>;
  processedImages: ImageIdentificationInfo[] = [];
  allProcessedImages: ImageIdentificationInfo[] = [];
  baseUrl: string = window.location.origin;

  constructor(
    private dialog: MatDialog, private imageService: ImageService,
    private currentUserService: CurrentUserService, private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userAddress = this.activatedRoute.snapshot.params['id'];
    this.imageService.getImagesIds(this.userAddress).subscribe(
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
      let processedImage: ImageIdentificationInfo =  {
        id: imageIdTitle.id,
        title: imageIdTitle.title,
        img: `${this.baseUrl}/${AppSettings.IMAGES_API_PREFIX}/thumbnails/${imageIdTitle.id}`,
        fullImg: `${this.baseUrl}/${AppSettings.IMAGES_API_PREFIX}/full-images/${imageIdTitle.id}`
      };
      this.processedImages.push(processedImage);
      this.allProcessedImages.push(processedImage);
    }

  }


  applyFilter(filterValue: string) {
    console.log(filterValue);
    filterValue = filterValue.trim().toLowerCase()
    this.processedImages = this.allProcessedImages.filter(i => i.title.includes(filterValue));
  }



  display(pic:ImageIdentificationInfo):any
  {
    this.imageService.getImageSummary(pic.id).subscribe((summary: any) => {
      this.dialog.open(MyDialogComponent, {
        // width: '1080px',
        // height: '600px',
        data: new ImageSummary(summary)
      });
    });
  }


  thereAreNoPictures(): boolean {
    return !this.processedImages || this.processedImages.length === 0;
  }
}
