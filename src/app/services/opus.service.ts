import { Injectable } from '@angular/core';
import encoderPath from 'opus-recorder/dist/encoderWorker.min.js';

@Injectable({
  providedIn: 'root'
})
export class OpusService {

  constructor() { }

  private concatUint8Arrays(a: Uint8Array, b: Uint8Array) {
    let c = new Uint8Array(a.length + b.length);
    c.set(a);
    c.set(b, a.length);
    return c;
  }

  private chunkBuffers(arrayBuffer: ArrayBuffer, chunkLength: number) {
    var chunkedBuffers = [];

    var totalFile = new Int16Array(arrayBuffer);
    // Skip wave header; 44 bytes
    for (let i = 22; i < totalFile.length; i += chunkLength) {

      // Convert 16 bit signed int to 32bit float
      var bufferChunk = new Float32Array(chunkLength);
      for (let j = 0; j < chunkLength; j++) {
        bufferChunk[j] = (totalFile[i + j] + 0.5) / 32767.5;
      }

      chunkedBuffers.push([bufferChunk]);
    };

    return chunkedBuffers
  };

  public encode(arrayBuffer: ArrayBuffer) {
    var encoderWorker = new Worker(encoderPath);
    let completeOggData = new Uint8Array(0);

    var bufferLength = 4096;

    encoderWorker.postMessage({
      command: 'init',
      originalSampleRate: 16000
    });

    encoderWorker.postMessage({
      command: 'getHeaderPages'
    });

    this.chunkBuffers(arrayBuffer, bufferLength).forEach(bufferChunk => encoderWorker.postMessage({
      command: 'encode',
      buffers: bufferChunk
    }));

    encoderWorker.postMessage({
      command: 'done'
    });
    

    let dataBlob;
    encoderWorker.onmessage = ({ data }) => {
      if (data.message === "done") {
        //finished encoding - save to audio tag
        var fileName = new Date().toISOString() + ".ogg";
        
        let dataBlob = new Blob([completeOggData], { type: "audio/ogg" });
        let url = URL.createObjectURL(dataBlob);

        var audio = document.createElement('audio');
        audio.controls = true;
        audio.src = URL.createObjectURL(dataBlob);
        audio.play()

        
      }

      else if (data.message === "page") {
        completeOggData = this.concatUint8Arrays(completeOggData, data.page);
      }
    }
    
    
    return dataBlob;
  }

  public encode2(blob: Blob): void {
    let fileReader = new FileReader();
    let arrayBuffer;

    fileReader.onloadend = () => {
      arrayBuffer = fileReader.result;
      this.encode(arrayBuffer);
    }

    fileReader.readAsArrayBuffer(blob);
  }
}
