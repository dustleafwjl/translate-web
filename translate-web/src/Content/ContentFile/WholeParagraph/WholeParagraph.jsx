import React, { Component } from 'react'
import {Input, Row, Col, Card, Typography, Button } from 'antd'

import { debounce } from '../../../Util/index'

import { translateByGoogle } from '../../../API/index'

const { TextArea } = Input
const { Title } = Typography;


export default class WholeParagraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textAreaData: '',
            targetText: ''
        }

    }
    onTextAreaChange(e) {
        // 输入textArea改变事件
        this.setState({
            textAreaData: e.target.value
        })
        // 想后端发数据翻译防抖
        this.debounceFunc()
    }
    debounceFunc = debounce(this.onTranslateText.bind(this), 800)
    async onTranslateText() {
        const result = await translateByGoogle(this.state.textAreaData, 'zh-CN')
        this.setState({
            targetText: this.formatText(result.data.result)
        }) 
    }
    formatText(text) {
        return <div>
            {text.map((item, index) => <p key={index}>{item}</p>)}
        </div>
    }
    render() {
        return (
            <Row type="flex" justify="center" style={{padding: "0px", minHeight: "500px"}}>
                <Col span={8}>
                    <Card title="原文"
                        bordered={false} 
                        bodyStyle={{padding: "10px" }}
                    >
                    <TextArea
                        value={this.state.textAreaData}
                        onChange={ this.onTextAreaChange.bind(this)}
                        placeholder="请输入翻译文章"
                        autoSize={{ minRows: 10, maxRows: 30 }}
                        style={{border: "none"}}
                    />
                    </Card>
                </Col>
                {/* <Col span={1} offset={1}>
                    <Button type="primary" style={{marginTop: "100px"}}>翻译</Button>
                </Col> */}
                <Col span={8} offset={2}>
                    <Card title="目标" bordered={false} >
                        {this.state.targetText}
                    </Card>
                </Col>
            </Row>
        )
    }
}
