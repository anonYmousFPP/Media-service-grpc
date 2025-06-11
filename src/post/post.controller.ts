import { Body, Controller, Post, Delete, NotFoundException, Get, Param, Query } from '@nestjs/common';
import { S3Service } from '../aws/s3.service';
import { GetSignedUploadUrlsRequest, GetSignedUploadUrlsResponse, DeleteMediaRequest, DeleteMediaResponse, GetMediaResponse, GetMediaRequest } from 'src/stubs/media';
import { MediaService } from './media.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('media')
export class PostController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly mediaService: MediaService, // Add MediaService
  ) {}

  //   // testing purpose
  // @Get()
  // async getMediaByQuery(@Query('fileKey') fileKey: string) {
  //   try {
  //     const encodedFileKey = encodeURIComponent(fileKey);
  //     const response = await this.mediaService.getMediaInternal({
  //       fileKey: encodedFileKey
  //     });
  //     return response;
  //   } catch(error) {
  //     console.error("Full error:", error);
  //     throw new NotFoundException('Error getting media URL', error.message);
  //   }
  // }

  @GrpcMethod('MediaService', 'GetMedia')
  async getMedia(@Body() request: GetMediaRequest): Promise<GetMediaResponse> {
    try {
      return await this.mediaService.getMediaInternal(request);
    } catch(error) {
      throw new NotFoundException('Error getting media URL', error.message);
    }
  }

  @GrpcMethod('MediaService', 'GetSignedUploadUrls')
  async getSignedUploadUrls(@Body() request: GetSignedUploadUrlsRequest): Promise<GetSignedUploadUrlsResponse> {
    try {
      return await this.mediaService.getSignedUrlsInternal(request);
    } catch(error) {
      throw new NotFoundException('Error generating upload URL', error.message);
    }
  }

  @GrpcMethod('MediaService', 'DeleteMedia')
  async deleteMedia(@Body() request: DeleteMediaRequest): Promise<DeleteMediaResponse> {
    try {
      return await this.mediaService.deleteMediaInternal(request);
    } catch(error) {
      throw new NotFoundException('Error deleting media', error.message);
    }
  }
}