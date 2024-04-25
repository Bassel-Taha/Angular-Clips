import { Injectable } from '@angular/core';
import { createFFmpeg , fetchFile  } from '@ffmpeg/ffmpeg';
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
  // the async function to store the files in the ffmpeg memory to be used later and getting the screenshots from the video
  async GetScreenShot(dropedFile: File) {
    // the fetchFile method convert the file to a binary data and store it in the data variable to be stored using the FS method
    let data = await fetchFile(dropedFile)
    //saving the pinary data from the file to a separate memory for Ffmpeg to use the stored data later
    this.ffmpeg.FS("writeFile", dropedFile.name, data)

    const seconds = [1,10,20];
    const comands :string[] = [];
    seconds.forEach((second) => {
      comands.push(
        //todo Input
        '-i', dropedFile.name,
        //todo OutPut Options
        //getting the timestamp in the specified timing
        '-ss', `00:00:${second}`,
        //taking on frame only in the specified timing
        '-frames:v', '1',
        //using the filter command and the scalling mehtod
        '-filter:v', 'scale=510:-1',
        //todo OutPutName
        `outPut_${second}.png`
      )
    })

    //using the FFmpeg.run function to run ffmpeg using WASM instead of installing ffmpeg on my computer
    this.ffmpeg.run(
      ...comands
    )
  }


}
