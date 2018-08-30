import { Injectable, ApplicationRef, Inject, Optional } from '@angular/core';

import {
  SpeechRecognitionGrammars,
  SpeechRecognitionLang,
  SpeechRecognitionContinuous,
  SpeechRecognitionInterimResults,
  SpeechRecognitionMaxAlternatives,
  SpeechRecognitionServiceUri,
  SpeechRecognitionAudiostartHandler,
  SpeechRecognitionSoundstartHandler,
  SpeechRecognitionSpeechstartHandler,
  SpeechRecognitionSpeechendHandler,
  SpeechRecognitionSoundendHandler,
  SpeechRecognitionAudioendHandler,
  SpeechRecognitionResultHandler,
  SpeechRecognitionNomatchHandler,
  SpeechRecognitionErrorHandler,
  SpeechRecognitionStartHandler,
  SpeechRecognitionEndHandler,
} from './speech-recognition.token';

import {
  SpeechGrammarListType,
} from '../adapter';

import {
  SpeechRecognitionCommon,
} from './speech-recognition.common';

@Injectable()

export class SpeechRecognitionService extends SpeechRecognitionCommon {

  private initHandlers() {
    const _ = () => { };
    if (!this.audiostartHandler) { this.audiostartHandler = _; }
    if (!this.soundstartHandler) { this.soundstartHandler = _; }
    if (!this.speechstartHandler) { this.speechstartHandler = _; }
    if (!this.speechendHandler) { this.speechendHandler = _; }
    if (!this.soundendHandler) { this.soundendHandler = _; }
    if (!this.audioendHandler) { this.audioendHandler = _; }
    if (!this.resultHandler) { this.resultHandler = _; }
    if (!this.nomatchHandler) { this.nomatchHandler = _; }
    if (!this.errorHandler) { this.errorHandler = _; }
    if (!this.startHandler) { this.startHandler = _; }
    if (!this.endHandler) { this.endHandler = _; }
  }

  private initInternal() {
    this.grammars = this._grammars;
    this.lang = this._lang;
    this.continuous = this._continuous;
    this.interimResults = this._interimResults;
    this.maxAlternatives = this._maxAlternatives;
    this.serviceURI = this._serviceURI;

    this.internal.onaudiostart = (e: Event) => {
      this.audiostartHandler(e);
      this.ref.tick();
    };
    this.internal.onsoundstart = (e: Event) => {
      this.soundstartHandler(e);
      this.ref.tick();
    };
    this.internal.onspeechstart = (e: Event) => {
      this.speechstartHandler(e);
      this.ref.tick();
    };
    this.internal.onspeechend = (e: Event) => {
      this.speechendHandler(e);
      this.ref.tick();
    };
    this.internal.onsoundend = (e: Event) => {
      this.soundendHandler(e);
      this.ref.tick();
    };
    this.internal.onaudioend = (e: Event) => {
      this.audioendHandler(e);
      this.ref.tick();
    };
    this.internal.onresult = (e: SpeechRecognitionEvent) => {
      this.resultHandler(e);
      this.ref.tick();
    };
    this.internal.onnomatch = (e: SpeechRecognitionEvent) => {
      this.nomatchHandler(e);
      this.ref.tick();
    };
    this.internal.onerror = (e: SpeechRecognitionError) => {
      this.errorHandler(e);
      this.ref.tick();
    };
    this.internal.onstart = (e: Event) => {
      this.startHandler(e);
      this.ref.tick();
    };
    this.internal.onend = (e: Event) => {
      this.endHandler(e);
      this.ref.tick();
    };
  }


  constructor(
    private ref: ApplicationRef,

    @Optional() @Inject(SpeechRecognitionGrammars)
    grammars: SpeechGrammarListType,

    @Optional() @Inject(SpeechRecognitionLang)
    lang: string,

    @Optional() @Inject(SpeechRecognitionContinuous)
    continuous: boolean,

    @Optional() @Inject(SpeechRecognitionInterimResults)
    interimResults: boolean,

    @Optional() @Inject(SpeechRecognitionMaxAlternatives)
    maxAlternatives: number,

    @Optional() @Inject(SpeechRecognitionServiceUri)
    serviceURI: string,

    @Optional() @Inject(SpeechRecognitionAudiostartHandler)
    private audiostartHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionSoundstartHandler)
    private soundstartHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionSpeechstartHandler)
    private speechstartHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionSpeechendHandler)
    private speechendHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionSoundendHandler)
    private soundendHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionAudioendHandler)
    private audioendHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionResultHandler)
    private resultHandler: (ev: SpeechRecognitionEvent) => any,

    @Optional() @Inject(SpeechRecognitionNomatchHandler)
    private nomatchHandler: (ev: SpeechRecognitionEvent) => any,

    @Optional() @Inject(SpeechRecognitionErrorHandler)
    private errorHandler: (ev: SpeechRecognitionError) => any,

    @Optional() @Inject(SpeechRecognitionStartHandler)
    private startHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionEndHandler)
    private endHandler: (ev: Event) => any
  ) {
    super(grammars, lang, continuous, interimResults, maxAlternatives, serviceURI);

    this.initHandlers();

    this.initInternal();
  }


 
  set onaudiostart(handler: (ev: Event) => any) {
    this.audiostartHandler = handler;
  }

  set onsoundstart(handler: (ev: Event) => any) {
    this.soundstartHandler = handler;
  }

 
  set onspeechstart(handler: (ev: Event) => any) {
    this.speechstartHandler = handler;
  }

  set onspeechend(handler: (ev: Event) => any) {
    this.speechendHandler = handler;
  }

  set onsoundend(handler: (ev: Event) => any) {
    this.soundendHandler = handler;
  }


  set onaudioend(handler: (ev: Event) => any) {
    this.audioendHandler = handler;
  }

  
  set onresult(handler: (ev: SpeechRecognitionEvent) => any) {
    this.resultHandler = handler;
  }

  
  set onnomatch(handler: (ev: SpeechRecognitionEvent) => any) {
    this.nomatchHandler = handler;
  }

 
  set onerror(handler: (ev: SpeechRecognitionError) => any) {
    this.errorHandler = handler;
  }

  
  set onstart(handler: (ev: Event) => any) {
    this.startHandler = handler;
  }

  
  set onend(handler: (ev: Event) => any) {
    this.endHandler = handler;
  }

  
  public start(): void {
    this.internal.start();
    this.ref.tick();
  }

 
  public stop(): void {
    this.internal.stop();
    this.ref.tick();
  }

  
  public abort(): void {
    this.internal.abort();
    this.ref.tick();
  }


}
