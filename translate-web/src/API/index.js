import axios from "axios"

axios.defaults.baseURL = "http://localhost:8081"

/**
 * 
 * @param {text, from?, to} params 服务类型， 翻译文本，源语言类型可选，翻译语言类型
 */
export const translateByGoogle = async (text, to) => { 
    let params = {
        text,
        to,
        type: "google"
    }
    return await axios.get("/translate", {params})
}
export const translateByYoudao = async (text, to) => { 
    let params = {
        text,
        to,
        type: "youdao"
    }
    return await axios.get("/translate", {params})
}
export const translateByBaidu = async (text, to) => { 
    let params = {
        text,
        to,
        type: "baidu"
    }
    return await axios.get("/translate", {params})
}

// export const translateByAllWays = async (...params) => await Promise.all([
//     translateByGoogle(...params),
//     translateByYoudao(...params),
//     translateByBaidu(...params)
// ])
export const translateByAllWays = async (params) => await axios.get("/translateall", {params})

export const getTranslateHistory = () => axios.get("/translatehistory")

export const getTranslateById = (params) => axios.get("/gettranslateById", {params})


export function formatTranslateData(data) {
    if(data.code && data.code === '404') return null
    return {
        from: data.from || "auto",
        to: data.to || "auto",
        text: data.text,
        result: data.result,
        link: data.link || '',
        audio: data.audio || '',
        type: data.type
    }
}

