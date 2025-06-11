import { Body, Controller, Post, Delete, NotFoundException, Get, Param, Query } from '@nestjs/common';
import { S3Service } from '../aws/s3.service';
import { GetSignedUploadUrlsRequest, GetSignedUploadUrlsResponse, DeleteMediaRequest, DeleteMediaResponse, GetMediaResponse, GetMediaRequest } from 'src/stubs/media';
import { MediaService } from './media.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('media')
export class PostController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly mediaService: MediaService,
  ) {}

  @GrpcMethod('MediaService', 'GetMedia')
  async getMedia(@Body() request: GetMediaRequest): Promise<GetMediaResponse> {
    return await this.mediaService.getMediaInternal(request);
  }

  @GrpcMethod('MediaService', 'GetSignedUploadUrls')
  async getSignedUploadUrls(@Body() request: GetSignedUploadUrlsRequest): Promise<GetSignedUploadUrlsResponse> {
    return await this.mediaService.getSignedUrlsInternal(request);
  }

  @GrpcMethod('MediaService', 'DeleteMedia')
  async deleteMedia(@Body() request: DeleteMediaRequest): Promise<DeleteMediaResponse> {
    return await this.mediaService.deleteMediaInternal(request);
  }
}