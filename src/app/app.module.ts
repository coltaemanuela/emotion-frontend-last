import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule,Http,Response } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {SpeechRecognitionModule} from 'lib/speech-recognition';
import { LinksService } from './_services/links.service';
import { AppComponent } from './app.component';
import { SubModule } from 'app/components';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    HttpClientModule, 
    // load with configs.
    SpeechRecognitionModule.withConfig({
      lang: 'en-GB',//'en-US', 
      interimResults: true, 
      maxAlternatives: 10,
      // sample handlers.
      onaudiostart:  (ev: Event)                  => console.log('onaudiostart',  ev),
      onsoundstart:  (ev: Event)                  => console.log('onsoundstart',  ev),
      onspeechstart: (ev: Event)                  => console.log('onspeechstart', ev),
      onspeechend:   (ev: Event)                  => console.log('onspeechend',   ev),
      onsoundend:    (ev: Event)                  => console.log('onsoundend',    ev),
      onaudioend:    (ev: Event)                  => console.log('onaudioend',    ev),
      onresult:      (ev: SpeechRecognitionEvent) => console.log('onresult',      ev),
      onnomatch:     (ev: SpeechRecognitionEvent) => console.log('onnomatch',     ev),
      onerror:       (ev: SpeechRecognitionError) => console.log('onerror',       ev),
      onstart:       (ev: Event)                  => console.log('onstart',       ev),
      onend:         (ev: Event)                  => console.log('onend',         ev),
      onpause:       (ev: Event)                  => console.log('onpause',       ev), //added now
    }),
    SubModule,
  ], 
  providers: [ LinksService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor( public links: LinksService ){ }
}

