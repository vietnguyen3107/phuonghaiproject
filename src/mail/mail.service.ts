import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  getHello(): string {
    return 'Hello World!';
  }

  public send(to, subject, template, context ): void {
    this
      .mailerService
      .sendMail({
        to: to, // List of receivers email address
        from: 'tuvangiamsatbachkhoa@gmail.com', // Senders email address
        subject: subject,
        template: template, // The `.pug` or `.hbs` extension is appended automatically.
        context:context,
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });

    }

}