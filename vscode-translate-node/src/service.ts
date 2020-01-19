import { Middleware } from 'koa'
import { youdao, baidu, google } from 'translation.js'
import { TranslateResult } from 'translation.js/declaration/api/types'
import { ITranslateAndaudioResult } from './types'
import mongodb from './mongodb/index'

new mongodb()

export const translateByGet: Middleware = async (ctx, next) => {
    const { type, text, to } = ctx.query
    const translateParams = { text, from: "auto", to }
    let result: TranslateResult
    try {
        let textAndArdio: ITranslateAndaudioResult
        switch(type) {
            case "google" :
                result = await google.translate(translateParams)
                break;
            case "youdao" :
                result = await youdao.translate(translateParams);
                break;
            default:
                result = await baidu.translate(translateParams);
                break;
        }
        if(result.result) {
            console.log("sadf")
            const [target, origin] = await Promise.all([baidu.audio(result.result[0]), baidu.audio(result.text)])
            textAndArdio = {
                ...result,
                type,
                audio: {
                    origin,
                    target
                }
            }
            console.log(textAndArdio)
            ctx.response.body = textAndArdio
        }else {
            ctx.response.body = result
        }
    } catch (error) {
        console.log("error")
        ctx.response.body = { code: "404" }
    }
}

export default {}
