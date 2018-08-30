import { Component,ViewChild, OnInit, Inject } from '@angular/core';
import { LinksService } from 'app/_services/links.service';
import { Http,Response,Headers } from '@angular/http';
import { MediaStreamRecorder } from 'msr';
import { RecordRTC } from 'recordrtc'; 
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

import {
  SpeechRecognitionService,
  SpeechRecognitionLang,
  SpeechRecognitionMaxAlternatives, 
  SpeechRecognitionGrammars,
} from 'lib/speech-recognition';


@Component({ 
  selector: 'app-emotion-analyzer',
  templateUrl: './emotion-analyzer.component.html',
  styleUrls: ['./emotion-analyzer.component.css'],
  providers: [
    {
      provide: SpeechRecognitionLang,
      useValue: 'en-GB' 
    },
    {
      provide: SpeechRecognitionMaxAlternatives, 
      useValue: 2,
    },
    SpeechRecognitionService,
  ], 
})


export class SubComponent {
  public AudioContext: any;
  public navigator: any;
  public message = ''; 
  public predominant_emotion = ''; //'neutral';
  public start_breaking:number;
  public stop_breaking:number;
  public break= 300;
  public audioContext:any;
  public webkitAudioContext: any;  
  private recording_timer : any;
  public mediaRecorder: any;
  
  constructor( private http: Http, private service: SpeechRecognitionService, private links: LinksService) { 

    //convert Blob to File. Pass the blob and the file title as arguments
    var blobToFile = (theBlob: Blob, fileName:string): File => {
      var b: any = theBlob;
      //A Blob() is almost a File(). Add properties to it, the given name and last update date
      b.lastModifiedDate = new Date();
      b.name = fileName;
      b.mimetype ='audio/wav';                
      //Cast to a File() type
      return <File>theBlob;
    }
    var emotion_scores;
    var browser = <any>navigator;  
    var headers = new Headers();  
    var audioCtx = new AudioContext();

    var chunks =[];
    var constraints = {
      audio: true,
      video: false
    };    
      
    //colors in HEX after performing convsersion from HSB(Hue-Saturation-Brightness) values using http://colorizer.org
    var colors = {
      angry: "rgb(179, 0, 0)" , //HSB 360/100/70
      disgust: "rgb(0, 128, 0)", 
      fear: "rgb(102, 102, 102)", //HSB: 0/0/40
      happy: "rgb(255, 191, 0)", //HSB 45/100/100
      neutral: "rgb(255, 255, 255)",
      surprise: "rgb(245, 139, 68)",
      sad: "rgb(0, 0, 128)", //HSB: 240/100/50
    };  

    var emojis = {
      angry:"&#128544",
      disgust:"&#128551;",
      fear:"&#128552;",
      happy:"&#x1f604;",
      neutral:"&#128544;", //" "
      surprise:"&#128558;",
      sad:"&#128551;"
    };

        
    (function() {        
      var promisifiedOldGUM = function(constraints, successCallback, errorCallback) {
        var getUserMedia = (browser.getUserMedia || browser.webkitGetUserMedia || browser.mozGetUserMedia || browser.msGetUserMedia);
          
        // Some browsers just don't implement it - return a rejected promise with an error to keep a consistent interface
        if(!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }          
        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(successCallback, errorCallback) {
          getUserMedia.call(browser, constraints, successCallback, errorCallback);
        });
      
      }
        
        if(browser.mediaDevices === undefined) {
          browser.mediaDevices = {}; 
        }

        if(browser.mediaDevices.getUserMedia === undefined) {
          browser.mediaDevices.getUserMedia = promisifiedOldGUM;
        }
      })();

      if (browser.mediaDevices.getUserMedia) {
        browser.mediaDevices.getUserMedia(constraints).then((stream) => { 

        this.mediaRecorder = new MediaRecorder(stream);                       
        var doc = new jsPDF('p', 'mm', 'letter');
        doc.setFontSize(8);        
        
        this.mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
          console.log("chunks: ", chunks);  
          var blob1 = new Blob([e.data], { 'type' : 'audio/wav; codecs=MS_PCM' });          
          var file1 = blobToFile(blob1, "my-recording.wav");   
          var fd = new FormData(); 
          var title = 'audio_recording_' + new Date().getTime();
          //append the audio file to form data to prepare it for uploading to conversion API on the backend
          fd.append("audio", file1);
          fd.append("title", title);
          root.http.post( root.links.FfmpegConverter(), fd, { headers:headers }).subscribe((r: Response) => {   
            var conversion_result = r.json();
            root.http.post( root.links.AffectsAnalysis(), { 'path': title }).subscribe((res: Response) => {                
              var analyze_result = res.json();   
              if(analyze_result.status.code === 200)   
                emotion_scores = analyze_result.data;     
                         
            });
          });  
          };
  

        this.mediaRecorder.onpause = ()=>{        
          console.log("Media recorder paused");
        };

        var speech="";
        var message = '';
        this.service.onresult = (e) => {
          this.message = e.results[0].item(0).transcript;	
          if(e.results[0].isFinal){
            speech = this.message; 
            message +="  "+ speech+ "   ";               
            var speech_length = this.message.length;

            console.log(this.message, speech_length, emotion_scores);
            if(emotion_scores.length >0){
              var counter = 0;
              for(var i= 0; i< emotion_scores.length; i++){
                if ((""+ emotion_scores[i].score+"").search("e")  !== -1 ){
                  emotion_scores[i].score = 0;  
                }                 
                if(emotion_scores[i].score !== 0){
                
                var text = speech.substr( counter, parseInt((speech_length*emotion_scores[i].score).toFixed(1))  );
                var bit = document.createElement('span');
                bit.innerHTML = text;
                if(text.length > 0 ){
                  bit.style.cssText = 'position:relative;width:60%;margin:0 auto;height:auto; background:'+ colors[emotion_scores[i].emotion];
                } else{
                  bit.style.cssText = 'position:relative;width:60%;margin:0 auto;height:auto; background:#ffffff';                  
                }
                document.body.appendChild(bit);
                counter += parseInt((speech_length*emotion_scores[i].score ).toFixed(1));     
                }             
                                        
              }
            }
          }         
        };

        //when voice recognition ends, get the message and display it 
        this.service.onend = (e) => {
        };  

        this.service.onaudioend = () => {
        };

        this.service.onaudiostart =() =>{
          // console.log('sound started by:',new Date().getTime());        
        };


        this.mediaRecorder.onstop  = function(){
          // console.log('chunks length ', chunks.length);
          var last_bit= chunks[chunks.length-1];
          var blob = new Blob([last_bit], { 'type' : 'audio/wav; codecs=MS_PCM' });
          var audioURL = window.URL.createObjectURL(blob);
          //convert Blob to file to be able to pass it as argument to the backend API
          var file = blobToFile(blob, "my-recording.wav"); 
        };            

        visualize();       

      //start recording and recognition and call the recursive function ongoing_recording 
        this.record = () => { 
          this.service.start();
          this.mediaRecorder.start();
          console.log( this.mediaRecorder.state);
          if( this.mediaRecorder.state !== 'inactive'){
            this.ongoing_recording(); 
          }
        };         

      
      //stop recording and  abort recognition
      this.stop_recording = () => {
        this.service.abort();
        this.mediaRecorder.stop();                     
      };            
        
       //recursive function to keep breaking and captioning system going
      this.ongoing_recording = ()=> {      
        setTimeout(()=>{
          // console.log('before pausing', this.mediaRecorder.state );          
          if( this.mediaRecorder.state !== 'inactive'){
            // console.log('when pausing' , this.mediaRecorder.state);
            this.mediaRecorder.stop();      
            this.service.stop(); 
            setTimeout(()=>{
              this.service.start();
            },280);
          
            this.mediaRecorder.start();
            this.ongoing_recording();                
          }
        }, 3000);
      };      
      

      this.reset = ()=>{
        console.log('clear');
        this.message = "";
       var spans = document.getElementsByTagName('span');   
         for (var i =0; i<spans.length; i++){
           spans[i].innerHTML = "";
        }
        if( this.mediaRecorder.state !== 'inactive'){
          this.mediaRecorder.stop();  
          this.service.stop();           
        }
      };
     var predominant_emotion='';
      var root = this;

       
      function visualize() {
        var source = audioCtx.createMediaStreamSource(stream);    
        var analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048; 
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);               
        source.connect(analyser);          
      };     


      function download( title) {    
        var content = "";
        // var doc = new jsPDF('p', 'mm', 'letter');
        var spans = document.getElementsByTagName('span');   
        // doc.setFontSize(15); 
        doc.setFont("times");        
        doc.text(20, 30, title); 
        doc.line(20, 20, 60, 20); 
        doc.setFontSize(8)
        doc.setProperties({
          title: title,
          date: new Date()
        });

        for (var i =0; i < spans.length; i++){
          content += " " + spans[i].innerText+ " ";         
          var color = spans[i].style.backgroundColor;
          var previous_text = spans[i].innerText;                      
          var space = 0;
          if(i%2 === 1){
            space +=6;
            doc.text(content.length+40,40+space,spans[i].innerText + '\n');            
          } 
          else{
            doc.text(content.length+40,40+space,spans[i].innerText+ '\n');           
          }

          // doc.setTextColor(getRGBValues(color).r,getRGBValues(color).g,getRGBValues(color).b )
        }
        // doc.text(50,50,content);
        // doc.addHTML(spans, function(err,data){

          doc.save('Test1.pdf');            
        // });
        }
      });        
    }
  }
  

  start() {
    this.service.start();
  }

  stop() {
    this.service.stop(); 
  }

  record(){
    this.record();
  }

  stop_recording(){
    this.stop_recording();
  }
  
  ongoing_recording(){
    this.ongoing_recording();
  }

  reset(){
  this.reset();  
 }

}