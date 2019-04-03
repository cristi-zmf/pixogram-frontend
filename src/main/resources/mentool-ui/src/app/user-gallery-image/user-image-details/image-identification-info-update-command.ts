export class ImageIdentificationInfoUpdateCommand {
  constructor(public owner: string, public imageId: string, public title: string, public description: string) {
  }
}
