import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ttsProject';
  inputText:String = "";
  socket: SocketIOClient.Socket;
  selectedLang:String = "";
  selectedLang2:String = "";
  audioPath:String = "";
  audioPath2:String = "";
  showPlayer:boolean = false;
  showPlayer2:boolean = false;
  translatedText:String = "";
  translatedText2:String = "";
  translatedLangLbl:String = "";
  translatedLangLbl2:String = "";
  langToTranslate = [
    {lang:'Thai',val:'th-TH'},
    {lang:'Japanese',val:'ja-JP'},
    {lang:'Vietnamese',val:'vi_VN'},
    {lang:'German',val:'de-DE'}
  ]

  ngOnInit(){
    this.waitForAudio();
    this.waitForAudio2();
  }

  constructor(){
    this.socket = io.connect();
  }

  /**
   * Wait for server event called new-audio which contains the path of translated audio and translated text
   */
  waitForAudio(){
    this.showPlayer = false;
    this.socket.on('new-audio',(data)=>{
      console.log(data);
      this.audioPath = data.audioPath;
      this.translatedText = data.translatedText
      this.showPlayer = true;
    });
  }

  waitForAudio2(){
    this.showPlayer2 = false;
    this.socket.on('new-audio2',(data)=>{
      console.log(data);
      this.audioPath2 = data.audioPath;
      this.translatedText2 = data.translatedText
      this.showPlayer2 = true;
    });
  }

  /**
   * Function for refresh the pagge
   */
  refreshPage(){
    location.reload()
  }

  /**
   * Take the translate language code and return the full language name
   * @param tranCode LAnguage code that used for translating and generate the audio
   */
  getFullLang(tranCode){
    for(let i=0;i<this.langToTranslate.length;i++){
      if(this.langToTranslate[i].val === tranCode){
        return this.langToTranslate[i].lang;
      }
    }
  }

  /**
   * Submit user translate and emit an event to serverside
   */
  submitText(){
    let userData = {userInput:this.inputText, langToTran:this.selectedLang,translateCode: this.selectedLang.substr(0,2)}
    this.translatedLangLbl = this.getFullLang(this.selectedLang);
    console.log(JSON.stringify(userData));
    this.socket.emit('send-text',userData);

    let userData2 = {userInput:this.inputText, langToTran:this.selectedLang2,translateCode: this.selectedLang2.substr(0,2)}
    this.translatedLangLbl2 = this.getFullLang(this.selectedLang2);
    console.log(JSON.stringify(userData2));
    this.socket.emit('send-text2',userData2);
  }
}
