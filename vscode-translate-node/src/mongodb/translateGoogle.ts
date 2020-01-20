import { Schema, Document, Model, model }  from 'mongoose'
import { ITranslateData } from '../types'

export interface ITranslateGoogle extends ITranslateData{
}
export const TranslateGoogleSchema = new Schema({
    tId: Schema.Types.ObjectId,
    from: String,
    to: String,
    text: String,
    result: [String],
    link: String,
    audio: {
        origiin: String,
        target: String
    },
    type: String
})

export interface ITranslateGoogleModel extends ITranslateGoogle, Document {
    // getTidByText: (text: string) => Schema.Types.ObjectId
}

export const TranslateGoogle: Model<ITranslateGoogleModel> = model<ITranslateGoogleModel>(`translategoogles`, TranslateGoogleSchema)