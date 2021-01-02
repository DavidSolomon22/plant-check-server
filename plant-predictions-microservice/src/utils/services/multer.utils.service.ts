import { Request } from 'express';
import { diskStorage, StorageEngine } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export class MulterUtilsService {
  private static imageFolderPath = './media';

  public static plantPhotoDiskStorage(): StorageEngine {
    return diskStorage({
      destination: this.imageFolderPath,
      filename: this.editFilename,
    });
  }

  public static plantPhotoFileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void {
    callback(null, true);
  }

  private static editFilename(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ): void {
    const name = uuidv4();
    const extension = file.originalname.split('.')[1];
    callback(null, `${name}.${extension}`);
  }
}
