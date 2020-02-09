import React, { Component, useState } from 'react'
import {connect } from 'react-redux'
import { Row, Col, Collapse, List, Tag, Empty, Icon } from 'antd'

import { setSingleData, setTranslateHistory } from '../../model/action'
import { getTranslateHistory, getTranslateById} from '../../API'

import styles from './ContentSingle.module.scss'

const { Panel } = Collapse

// 图片logo
const translateLogo = {
    bing: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFNSURBVFhH7ZYvDsIwFIc5ALfgBByBM3AAbsAVMPMIBBJFgkKQYOdJUCgwuDkUKFTJB2tYmq577TogYb/kl2309fWjf97W6SaJ+qZbgFKA3nSqJmmqRuv1894WE8NOgNPlohDX2W6nhquVNbaORQBaPMeeDS+A7HptAVqA3wDA/fnc2s/XQQAMnp7PanM8qvF2WwsmeAmWh0P+66s+8AyMbpc6GICqeLvf85a36KOrpgQmGIAry+AS/XmfmLmLDgbAJK8SOYp9TNcC4B4IM66oRgGKsYDQbuojAGy4sv3QKADnnx1v++daUQF0Mly19ggwAG35tb1ngIGrjh8iRvIF5QUgEX18KmI0AGKZbunA2k6AfZbl6ctFOeY9MFgsrHmqXAqASUpyW81H0nV22QmgbZ5zppvN6DvdNosAMIOxuVjnWB8jWAzQlP8dIFEPVxH9th4qW08AAAAASUVORK5CYII=",
    google: "data:image/png;base64,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",
    youdao: "data:image/png;base64,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",
    baidu: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAXFQTFRFt9v8Ho31udz8II72H471hcH6uNv8UKb4AAAAz+f9Z7L5isT63u7+vd78jMX6vN38NJj28fj+0uj9arP5dLn5uNv8Wav47fb+q9X7I4/2a7T5yOP99vr/KZP2+fz/bbX5h8L6yuT9Vqr47vf+Uqf4fb352+3+lcn6bLX55/P+crf58/n/w+H8/f7/ZrL4ns77Qp/3hMD6eLv5msz77vb/TaX3udz86PP+SaP3O5z3LJT2VKj4iMP6J5L2jcX6I5D1RKD39/v//v//brb54/H+v9/8JpH2KpP2pNH7gb/6j8b6Mpf2zOX99Pn/vt78F4n1mMv7Wqv4ptL78Pj+GIr18/n+5fL+H4715PH+XKz49fr/7Pb+HIz1xeL9Q6D3R6L3JZD2O5z22ez9Gov1Ho311ur9JJD2II72jsb6N5r2S6T35vL+HY314O/+kMf6Io/2dbn54fD+FYj1sdf87PX+7/f+QJ73M5j2MJb2////FIj1qLN8hAAAAAl0Uk5TTvRM8vOETb4Aqk9o3wAAAWFJREFUOMuF02Vzg0AQBmBiQN3d3d3dPe7ujSuFpnu/vqSQFBIC7xeOu4fZvRkWI0mc0CLJaAk1SWKkDslER2JqJBscI+QBgWnkgQbjF/5EIibYjz+98asaKACU0E0kEtxeN1t9jBfgXQKEs46tDdukwekDuA98iMAlwzywD1d2hUJoag3guqFELRYYTSb1ADtUC4DM0NkGYDUhAahwsf9tmIwAEPAjIQAuP9V3e5e3ujb0zHrSsRr4YrPJAQsNju52N/fFobCHTBUszk0bZ8b0HenBfvZ8OdcI0ql511/FPoR6hyZyolt88z0gRAGMhIYHxikkAVL5BRvfMhSkQDi1tOoBcCaR6JriEmwPUdQCFCu7waMLgOz+3sEx/ZhrAiW+/N2Jm2FoOtpc4vSschUH+JQokan3UJQGt/n8eR2UJcB/npXAS/k1JAQKv71WeXBwpdFTHF52wAmV9KmKwEnyF2mutxZ+g5+cAAAAAElFTkSuQmCC"
}

const GoogleHead = <section>
    <img src={translateLogo.google} />
    <Tag color="#108ee9" style={{marginLeft: "20px"}}>谷歌翻译</Tag>
</section>

const YoudaoHead = <section>
    <img src={translateLogo.youdao} />
    <Tag color="#108ee9" style={{marginLeft: "20px"}}>有道翻译</Tag>
</section>

const BaiduHead = <section>
    <img src={translateLogo.baidu} />
    <Tag color="#108ee9" style={{marginLeft: "20px"}}>百度翻译</Tag>
</section>

const Audio = props => {
    const { src, tag } = props
    const handleAduioClick = () => {
        const audio = document.getElementById(`${tag}`)
        audio.play()
    }
    return <>
            <Icon type="notification" style={{ color: "rgb(16, 142, 233)", paddingRight: "10px"}} theme="twoTone" onClick={handleAduioClick}/>
            <audio id={ tag } src={ src }/>
        </>
}

const TranslatePanlMain = props => {
    const { result, text, audio, type } = props.data
    
    return <div style={{}}>
        <div>
            <Audio src={audio.origin} tag={text + type}/>
            { text }
        </div>
        <div style={{marginTop: "10px"}}>
            <Audio src={audio.target} tag={result + type}/>
            { result }
        </div>
    </div>
}

const HistoryItem = props => {
    const { text, id, setData } = props
    const itemClick = async () => {
        // 历史记录列表元素点击事件
        const result = await getTranslateById({id})
        setData(result.data)
    }
    return (<div onClick={itemClick} >
        {text}
    </div>)
}

class ContentSingle extends Component {
    async setTranslateHistory() {
        const result = await getTranslateHistory()
        console.log(result)
        this.props.setTranslateHistoryToStore(result.data)
        console.log(result)
    }
    componentWillMount() {
        this.setTranslateHistory()
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={12} offset={2}>
                        <Collapse defaultActiveKey={["1", "2", "3"]} expandIconPosition="right" onChange={this.onPanelChange.bind(this)}>
                            <Panel header={GoogleHead} key="1" >
                                { !this.props.singleDataArr[0] ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> 
                                    : <TranslatePanlMain data={this.props.singleDataArr[0]} /> }
                            </Panel>
                            <Panel header={YoudaoHead} key="2">
                                { !this.props.singleDataArr[1] ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> 
                                    : <TranslatePanlMain data={this.props.singleDataArr[1]}/> }
                            </Panel>
                            <Panel header={BaiduHead} key="3">
                                { !this.props.singleDataArr[2] ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> 
                                    : <TranslatePanlMain data={this.props.singleDataArr[2]}/> }
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col span={7} offset={1} style={{backgroundColor: "#fff"}}>
                        <List
                        size="large"
                        header={<div>翻译历史记录</div>}
                        bordered
                        pagination={true}
                        dataSource={this.props.translateHistoryArr}
                        renderItem={item => <List.Item className={ styles['history-item']} ><HistoryItem text={item.text} id={item._id} setData={this.props.setSingleDataToStore}/></List.Item>}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
    onPanelChange(e) {
        console.log(e)
        console.log(this.props)
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        singleDataArr: state.translateData.singleDataArr,
        translateHistoryArr: state.translateHistory.translateHistoryArr
    }
}
const mapDispatchToProps = (dispatch) => ({
    setSingleDataToStore: (data) => dispatch(setSingleData(data)),
    setTranslateHistoryToStore: data => dispatch(setTranslateHistory(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(ContentSingle)