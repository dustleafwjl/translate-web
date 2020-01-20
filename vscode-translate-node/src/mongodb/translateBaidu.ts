import { Schema, Document, Model, model }  from 'mongoose'
import { ITranslateData } from '../types'

export interface ITranslateBaidu extends ITranslateData {
}
export const TranslateBaiduSchema = new Schema({
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

export interface ITranslateBaiduModel extends ITranslateBaidu, Document {
    // getTidByText: (text: string) => Schema.Types.ObjectId
}

export const TranslateBaidu: Model<ITranslateBaiduModel> = model<ITranslateBaiduModel>(`translatebaidus`, TranslateBaiduSchema)