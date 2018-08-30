import { Injectable } from '@angular/core';

@Injectable()
export class LinksService {
    
    private base_url: string =  'http://127.0.0.1:3000'; 

    constructor() { }

    public getRegister(): string{
        return this.base_url + '/api/register';
    }

    public getDummy(): string{
        return this.base_url + '/api/dummy';
    }

    public PostTranscript(): string{
        return this.base_url + '/api/transcript';        
    }

    public AddRecording(): string{
        return this.base_url + '/api/add-recording';
    }

    public EmpathAnalysis(): string{
        return this.base_url +'/api/empath-analysis';
    }

    public AffectsAnalysis(): string{
        return this.base_url + '/api/affects-v3';
    }

    public AffectsAnalysisV1(): string{
        return this.base_url + '/api/affects';
    }

    public FileUploader(): string{
        return this.base_url + '/api/upload_file';
    }

    public Converter():string{
        return this.base_url + '/api/convert';
    }
    public FfmpegConverter():string{
        return this.base_url + '/api/convert-ffmpeg';
    }
}