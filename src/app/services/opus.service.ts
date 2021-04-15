import {Injectable} from '@angular/core';
import encoderPath from 'opus-recorder/dist/encoderWorker.min.js';

@Injectable({
  providedIn: 'root',
})
export class OpusService {

  constructor() { }

  private concatUint8Arrays(a: Uint8Array, b: Uint8Array) {
    const c = new Uint8Array(a.length + b.length);
    c.set(a);
    c.set(b, a.length);
    return c;
  }

  private chunkBuffers(arrayBuffer: ArrayBuffer, chunkLength: number) {
    const chunkedBuffers = [];

    const totalFile = new Int16Array(arrayBuffer);
    // Skip wave header; 44 bytes
    for (let i = 22; i < totalFile.length; i += chunkLength) {

      // Convert 16 bit signed int to 32bit float
      const bufferChunk = new Float32Array(chunkLength);
      for (let j = 0; j < chunkLength; j++) {
        bufferChunk[j] = (totalFile[i + j] + 0.5) / 32767.5;
      }

      chunkedBuffers.push([bufferChunk]);
    };

    return chunkedBuffers;
  };

  public async encode(blob: Blob): Promise<Blob> {

    const arrayBuffer = await this.blob2arraybuffer(blob);

    const encoderWorker = new Worker(encoderPath);
    let completeOggData = new Uint8Array(0);

    const bufferLength = 4096;

    encoderWorker.postMessage({
      command: 'init',
      originalSampleRate: 16000,
    });

    encoderWorker.postMessage({
      command: 'getHeaderPages',
    });

    this.chunkBuffers(arrayBuffer, bufferLength).forEach((bufferChunk) => {
      encoderWorker.postMessage({
        command: 'encode',
        buffers: bufferChunk,
      });
    });

    encoderWorker.postMessage({
      command: 'done',
    });

    // wait for encoding to finish - resolve when successfull
    const promise = new Promise<Blob>((resolve) => {

      encoderWorker.onmessage = ({data}) => {
        if (data.message === 'done') {
          // finished encoding
          const dataBlob = new Blob([completeOggData], {type: 'audio/ogg'});
          resolve(dataBlob);

        } else if (data.message === 'page') {
          completeOggData = this.concatUint8Arrays(completeOggData, data.page);
        };
      };

    });

    return promise;
  }

  private blob2arraybuffer(blob: Blob): Promise<ArrayBuffer> {
    const fileReader = new FileReader();

    return new Promise<ArrayBuffer>((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new Error('Failed to read blob'));
      };

      fileReader.onloadend = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        resolve(arrayBuffer);
      };

      fileReader.readAsArrayBuffer(blob);

    });
  }
}
