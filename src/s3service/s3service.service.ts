

require('dotenv').config();
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import sharp from 'sharp';

@Injectable()
export class S3serviceService {
  constructor(  private ConfigService: ConfigService){}

  
  async Addimage(file: Express.Multer.File) {
    const serviceAccountKeyFile = 's3config.json';
    // process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountKeyFile;
    const storage = new Storage({ keyFilename: serviceAccountKeyFile });
    const bucketName = 'cdnflyfarladiesv2'; // Replace with your actual bucket name

    const currentDate = new Date();
    const datePrefix = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}_${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}_`;
  
    // Extract the original file extension
    const fileExtension = file.originalname.split('.').pop();
    const bucket = storage.bucket(bucketName);
    const fileName = `${datePrefix}${file.originalname}.webp`;
    const modifiedName = fileName.replace(/\s+/g,'_');
    const fileObject = bucket.file(modifiedName);
  
    try {
      const imageBuffer = file.buffer
      await fileObject.save(imageBuffer, {
        contentType: 'image/webp',
        public: true,
        validation: 'md5',
      });
  
      const fileUrl = `https://storage.googleapis.com/${bucketName}/${modifiedName}`;
      console.log(`File uploaded successfully to ${fileUrl}`);
      return fileUrl;
    } catch (err) {
      console.error('Error uploading file to Google Cloud Storage:', err);
      throw err;
    }
  }

}
