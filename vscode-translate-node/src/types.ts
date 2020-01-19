import { TranslateResult } from 'translation.js/declaration/api/types'

interface IaudioSrc {
    origin: string,
    target: string
}


export interface ITranslateAndaudioResult extends TranslateResult {
    type: string,
    audio: IaudioSrc
}