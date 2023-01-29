import {Component} from '@angular/core';
import {message} from "../../models/message";
import {HotelServiceService} from "../../service/hotel-service.service";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  textContent: string = '';
  messages: message[] = [];

  constructor(private service: HotelServiceService) {
  }


  sendMessage() {
    if (this.textContent === '' || this.textContent === ' ') {
      return;
    }
    this.createMessageAndPush(this.textContent, 1);
    let prompt = this.createPrompt();
    this.textContent = '';
    this.createMessageAndPush('KI Schreibt...', 2);
    console.log(prompt)
    this.service.getAnwser(prompt).then((response) => {
      this.messages.pop();
      this.createMessageAndPush(response, 2);
    });
  }

  private createPrompt() {
    let prompt = '';
    this.messages.forEach((message) => {
      if (message.ownerId === 1) {
        prompt += '\nHuman: ' + message.text;
      } else {
        prompt += '\nAI: ' + message.text;
      }
    });
    return prompt;
  }

  createMessageAndPush(text?: string, ownerId?: number) {
    let message: message = {
      text: text,
      ownerId: ownerId,
    };
    this.messages.push(message);
  }
}
