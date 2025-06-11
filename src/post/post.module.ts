import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { S3Service } from '../aws/s3.service';
import { ConfigModule } from '@nestjs/config';
import { MediaService } from './media.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  providers: [S3Service, MediaService],
  controllers: [PostController],
  exports: [MediaService],
})
export class PostModule {}