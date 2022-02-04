import { HttpStatus } from '@nestjs/common';

export type ResponseMessage = {
  status: HttpStatus;
  message: string;
};
