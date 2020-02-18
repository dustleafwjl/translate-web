import React, { Component } from 'react'
import {Input, Row, Col, Card, Spin, Button, Popover, Tag, Tooltip  } from 'antd'

import { translateByGoogle } from '../../../API/index'


const { TextArea } = Input;

const FormateToSuccessDom = props => {
    const { text, result } = props.data
    const textArr = text.split(".")
    const tagColor = ["#f50", "#2db7f5", "#87d068", "#108ee9"]
    textArr.pop()

    return <div style={{width: "800px", margin: "0 auto", borderRadius: "15px", fontSize: "16px", backgroundColor: "#fff", padding: "20px"}}>
        { textArr.map((ele, index) => {
            return <Tooltip placement="topLeft" title={result[index]} key={ele.slice(0, 4)+index}>
                <Tag style={{height: "30px", lineHeight: "30px", fontSize: "16px", margin: "3px"}} color={tagColor[index%4]}>{ele}</Tag>
            </Tooltip>
            // return <Popover content={result[index]}>
            //     <Tag color={tagColor[index%4]}>{ele}</Tag>
            // </Popover>
        }) }
    </div>
}
export default class SingleSentence extends Component {
    // status: init pedding success
    state = {
        status: 'init',
        originTranslate: '',
        targetTranslate: ''
    }
    async handleTranslateClick() {
        if(this.state.originTranslate == '') return
        this.setState({
            status: "pedding"
        })
        const result = await translateByGoogle(this.state.originTranslate, "zh-CN")
        this.setState({
            targetTranslate: result.data,
            status: "success"
        })
    }
    render() {
        const initDom = <div style={{
            width: "46%", 
            margin: "0 auto", 
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center", 
            alignItems: "center"}}>
            <TextArea 
            placeholder="请输入翻译数据"
            value={this.state.originTranslate}
            onChange={(e)=>this.setState({originTranslate: e.target.value})}
            autoSize={{ minRows: 5, maxRows: 10 }}></TextArea>
            <Button onClick={this.handleTranslateClick.bind(this)} 
                type="primary"
                style={{marginTop: "20px"}}>点击进行翻译</Button>
        </div>

        const peddingDom = <div style={{
            display: "flex", 
            paddingTop: "30px",
            justifyContent: "center", 
            alignItems: "center"
        }}>
            <Spin size="large" />
        </div>

        return (
            <div style={{minHeight: "480px"}}>
                {(() => {
                    switch (this.state.status) {
                        case 'init':
                            return initDom
                        case 'pedding': 
                            return peddingDom
                        case 'success':
                            return <FormateToSuccessDom data={this.state.targetTranslate}/>
                        default:
                            return <div>fail</div>
                    }
                })()}
            </div>
        )
    }
}
