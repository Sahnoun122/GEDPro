import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class OcrService {
  async extractText(buffer: Buffer): Promise<string> {
    const worker = await createWorker('eng');

    const {
      data: { text },
    } = await worker.recognize(buffer);

    await worker.terminate();
    return text;
  }
}
