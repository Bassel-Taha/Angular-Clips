import { Injectable } from '@angular/core';
import { createFFmpeg , fetchFile , FS } from '@ffmpeg/ffmpeg';
@Injectable({
  providedIn: 'root'
})
export class FfmpegService {

  // the boolean value to check if the ffmpeg is loaded and ready to be used or not
  isReady : boolean = false;
  private ffmpeg : any;
  constructor() {
    // creating the ffmpeg instance and setting the log to true to log all the activities of the ffmpeg to the console
    this.ffmpeg = createFFmpeg({log: true});
  }

  // the async function to load the ffmpeg so that is dost freeze the app while downloading and checking if It's loaded or not before loading it
  async Init ()
  {
    if (this.isReady === true)
    {
      return;
    }
    else
    {
      await this.ffmpeg.load()
      this.isReady = true;
    }
  }
}
