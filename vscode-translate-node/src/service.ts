import { Middleware } from 'koa'
import { youdao, baidu, google } from 'translation.js'
import { TranslateResult } from 'translation.js/declaration/api/types'
import { ITranslateAndaudioResult } from './types'
import TranslateDao from './Dao/TranslateDao'



export const test: Middleware = async (ctx, next) => {
    await TranslateDao.insertTranslateIndex({text: "asdsfd"})
}

export const translateAll: Middleware = async(ctx, next) => {
    const { text, to } = ctx.query
    const translateParams = { text, from: "auto", to }
    let result: TranslateResult[]
    try {
        let textAndAudioArr: ITranslateAndaudioResult[] = []
        result = await Promise.all([
            google.translate(translateParams),
            youdao.translate(translateParams),
            youdao.translate(translateParams)
        ])
        for(let i = 0; i < result.length; i ++) {
            let ele = result[i]
            if(ele.result) {
                const [target, origin] = await Promise.all([baidu.audio(ele.result[0]), baidu.audio(ele.text)])
                textAndAudioArr[i] = {
                    ...ele,
                    type: "none",
                    audio: {
                        origin,
                        target
                    }
                }
                result[i] = textAndAudioArr[i]
            }
        }
        ctx.response.body = result
        // 将查找数据insert进数据库
        await TranslateDao.insertTranslateIndex(translateParams)
        const index = await TranslateDao.getIndexByText(text)
        Promise.all([
            TranslateDao.insertTranslateGoogle({
                text: result[0].text, 
                tId: index,
                from: result[0].from,
                to: result[0].to,
                audio: (result[0] as ITranslateAndaudioResult).audio,
                link: result[0].link,
                result: result[0].result
            }),
            TranslateDao.insertTranslateYoudao({
                text: result[1].text, 
                tId: index,
                from: result[1].from,
                to: result[1].to,
                audio: (result[1] as ITranslateAndaudioResult).audio,
                link: result[1].link,
                result: result[1].result
            }),
            TranslateDao.insertTranslateBaidu({
                text: result[2].text, 
                tId: index,
                from: result[2].from,
                to: result[2].to,
                audio: (result[2] as ITranslateAndaudioResult).audio,
                link: result[2].link,
                result: result[2].result
            }),
        ])
    } catch (error) {
        console.log(error)
        ctx.response.body = {code: "404"}
    }
}

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
            const [target, origin] = await Promise.all([baidu.audio(result.result[0]), baidu.audio(result.text)])
            textAndArdio = {
                ...result,
                type,
                audio: {
                    origin,
                    target
                }
            }
            result = textAndArdio
            ctx.response.body = textAndArdio
        }else {
            ctx.response.body = result
        }
        // 将查找数据insert进数据库
        await TranslateDao.insertTranslateIndex(translateParams)
    } catch (error) {
        ctx.response.body = { code: "404" }
    }
}

export default {}
