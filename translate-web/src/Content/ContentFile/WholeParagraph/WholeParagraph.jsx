import React, { Component } from 'react'
import {Input, Row, Col, Card, Typography } from 'antd'

const { TextArea } = Input
const { Title } = Typography;


export default class WholeParagraph extends Component {
    render() {
        return (
            <Row type="flex" justify="center" style={{padding: "0px"}}>
                <Col span={8}>
                    <Card title="原文"
                        bordered={false} 
                        bodyStyle={{padding: "10px" }}
                    >
                    <TextArea
                    value={`22`}
                    onChange={this.onChange}
                    placeholder="Controlled autosize"
                    autoSize={{ minRows: 10, maxRows: 30 }}
                    style={{border: "none"}}
                    />
                    </Card>
                </Col>
                <Col span={8} offset={2}>
                <Card title="目标" bordered={false} >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                </Col>
            </Row>
        )
    }
}
