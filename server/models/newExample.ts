import { Document, Schema, model } from 'mongoose';

export class NewExampleDto {
  name: string;

  constructor(data: {
    name: string,
  }) {
    this.name = data.name;
  }
}

let schema = new Schema({
    name: {type: String, required: true},
});

export interface NewExampleDocument extends NewExampleDto, Document { }

export const NewExampleModel = model<NewExampleDocument>('NewExample', schema);
