// import { translateGoogleModel, translateBaiduModel, translateIndexModel, translateYoudaoModel} from './model'
// import { mongoInstance } from '../mongodb/mongodb'
import { TranslateIndex } from '../mongodb/translateIndex'
import { TranslateGoogle, ITranslateGoogle } from '../mongodb/translateGoogle'
import { TranslateYoudao, ITranslateYoudao } from '../mongodb/translateYoudao'
import { TranslateBaidu, ITranslateBaidu } from '../mongodb/translateBaidu'
import { ITranslateData, ITranslateIndex } from '../types'

export const getTidByText = async (text: string) => {
    const newIndex = new TranslateIndex({
        text: "asdf"
    })
    // await newIndex.save()
    const result = await TranslateIndex.findOne({})
// connection.close()
}

export default class TranslateDao {
    static async insertTranslateIndex(data: ITranslateIndex) {
        if(data.text && await TranslateDao.getIndexByText(data.text)) return
        const newIndex = new TranslateIndex(data)
        await newIndex.save()
    }
    static async insertTranslateGoogle(data: ITranslateData) {
        const newGoogle = new TranslateGoogle(data)
        return await newGoogle.save()
    }
    static async insertTranslateYoudao(data: ITranslateData) {
        const newYoudao = new TranslateYoudao(data)
        return await newYoudao.save()
    }
    static async insertTranslateBaidu(data: ITranslateData) {
        const newBaidu = new TranslateBaidu(data)
        return await newBaidu.save()
    }
    static async getIndexByText(text: String) {
        const result = await TranslateIndex.findOne({text})
        return result?._id
    }
    static async getGoogleBytId(id: string): Promise<ITranslateGoogle | null> {
        return await TranslateGoogle.findOne({"tId": id})
    }
    static async getYoudaoBytId(id: string): Promise<ITranslateYoudao | null> {
        return await TranslateYoudao.findOne({"tId": id})
    }
    static async getBaiduBytId(id: string): Promise<ITranslateBaidu | null> {
        return await TranslateBaidu.findOne({"tId": id})
    }
    static async getAllTranlsateHistory() {
        const result =  await TranslateIndex.find()
        return result
    }
}