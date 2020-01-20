import { Schema, Document, Model, model }  from 'mongoose'
import { ITranslateIndex } from '../types'


export const TranslateIndexSchema = new Schema({
    text: String,
    from: String,
    to: String
})

export interface ITranslateIndexModel extends ITranslateIndex, Document {
    // getTidByText: (text: string) => Schema.Types.ObjectId
}

export const TranslateIndex: Model<ITranslateIndexModel> = model(`translateindexes`, TranslateIndexSchema)