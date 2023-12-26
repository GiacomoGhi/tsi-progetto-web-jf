/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';

export async function getRequest<T>(
  httpService: HttpService,
  logger: Logger,
  url: string,
  config?: AxiosRequestConfig<any> | undefined
): Promise<T> {
  try {
    const response$: Observable<AxiosResponse<T>> = httpService.get(
      url,
      config
    );
    const response = await firstValueFrom(response$);

    return response.data;
  } catch (error) {
    logger.error(error);
    let statusCode = 500;
    let data = '';
    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      data = error.response.data as string;
    }
    throwExceptionFromStatusCode(statusCode, data);
    return {} as T;
  }
}

export async function postRequest<T>(
  httpService: HttpService,
  logger: Logger,
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any> | undefined
): Promise<T> {
  try {
    const response$: Observable<AxiosResponse<T>> = httpService.post(
      url,
      data,
      config
    );
    const response = await firstValueFrom(response$);

    return response.data;
  } catch (error) {
    logger.error('postRequest error');
    logger.error(error);
    let statusCode = 500;
    let data = '';
    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      data = error.response.data as string;
    }
    throwExceptionFromStatusCode(statusCode, data);
  }
}

export function throwExceptionFromStatusCode(
  statusCode: number,
  message: string
) {
  switch (statusCode) {
    case 401:
      throw new UnauthorizedException(message);
    case 403:
      throw new ForbiddenException(message);
    case 404:
      throw new NotFoundException(message);
    case 409:
      throw new ConflictException(message);
    case 502:
      throw new BadGatewayException(message);
    case 503:
      throw new ServiceUnavailableException(message);

    default:
      throw new InternalServerErrorException(message);
  }
}
