import { TranslateResult } from 'translation.js/declaration/api/types'
import { Schema } from 'mongoose';

interface IaudioSrc {
    origin: string,
    target: string
}


export interface ITranslateAndaudioResult extends TranslateResult {
    type: string,
    audio: IaudioSrc
}

export interface ITranslateIndex {
    text?: String,
    from?: String,
    to?: String
}
export interface ITranslateData {
    tId: Schema.Types.ObjectId,
    from: String,
    to: String,
    text: String,
    result: Array<string> | undefined,
    link: String,
    audio: {
        origin: String,
        target: String
    }
}