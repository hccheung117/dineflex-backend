import { LoggerService, Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class AppLogger implements LoggerService {
  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/app.log' }),
    ],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
