import { Schema, Document, Model, model }  from 'mongoose'
import { ITranslateData } from '../types'

export interface ITranslateYoudao extends ITranslateData{
}
export const TranslateYoudaoSchema = new Schema({
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

export interface ITranslateYoudaoModel extends ITranslateYoudao, Document {
    // getTidByText: (text: string) => Schema.Types.ObjectId
}

export const TranslateYoudao: Model<ITranslateYoudaoModel> = model<ITranslateYoudaoModel>(`translateyoudaos`, TranslateYoudaoSchema)