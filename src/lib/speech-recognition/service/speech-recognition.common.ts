import {
  SpeechRecognition,
  SpeechGrammarListType,
} from '../adapter';

export class SpeechRecognitionCommon {

  protected internal: SpeechRecognition = new SpeechRecognition();

  constructor(
    protected _grammars: SpeechGrammarListType,
    protected _lang: string,
    protected _continuous: boolean,
    protected _interimResults: boolean,
    protected _maxAlternatives: number,
    protected _serviceURI: string,
  ) { }

  get grammars(): SpeechGrammarListType {
    return this._grammars;
  }

  set grammars(grammars: SpeechGrammarListType) {
    this._grammars = grammars;
    if (this._grammars !== undefined && this._grammars != null && this.internal) {
      this.internal.grammars = this._grammars;
    }
  }

  get lang(): string {
    return this._lang;
  }

  set lang(lang: string) {
    this._lang = lang;
    if (this._lang !== undefined && this._lang != null && this.internal) {
      this.internal.lang = this._lang;
    }
  }

  get continuous(): boolean {
    return this._continuous;
  }

  set continuous(continuous: boolean) {
    this._continuous = continuous;
    if (this._continuous !== undefined && this._continuous != null && this.internal) {
      this.internal.continuous = this._continuous;
    }
  }
  
  get interimResults(): boolean {
    return this._interimResults;
  }

  set interimResults(interimResults: boolean) {
    this._interimResults = interimResults;
    if (this._interimResults !== undefined && this._interimResults != null && this.internal) {
      this.internal.interimResults = this._interimResults;
    }
  }
 
  get maxAlternatives(): number {
    return this._maxAlternatives;
  }
  set maxAlternatives(maxAlternatives: number) {
    this._maxAlternatives = maxAlternatives;
    if (this._maxAlternatives !== undefined && this._maxAlternatives != null && this.internal) {
      this.internal.maxAlternatives = this._maxAlternatives;
    }
  }
  get serviceURI(): string {
    return this._serviceURI;
  }
  set serviceURI(serviceURI: string) {
    this._serviceURI = serviceURI;
    if (this._serviceURI !== undefined && this._serviceURI != null && this.internal) {
      this.internal.serviceURI = this._serviceURI;
    }
  }

}
