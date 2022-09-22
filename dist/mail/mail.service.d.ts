import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    getHello(): string;
    send(to: any, subject: any, template: any, context: any): void;
}
