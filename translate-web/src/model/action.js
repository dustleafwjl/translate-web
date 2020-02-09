export const TOTYPEFILE = "TOTYPEFILE"
export const TOTYPESINGLE = "TOTYPESINGLE"
export const SETTRANSLATEHISTORY = "SETTRANSLATEHISTORY"


// 设置单句翻译的数据
export const SETSINGLEDATA = "SETSINGLEDATA"

export function changeToTypeFile() {
    return { type: TOTYPEFILE, value: 1 }
}

export function changeToTypeSingle() {
    return { type: TOTYPESINGLE, value: 0}
}

export function setSingleData(data) {
    return { type: SETSINGLEDATA , value: data}
}

export function setTranslateHistory(data) {
    return { type: SETTRANSLATEHISTORY, value: data}
}