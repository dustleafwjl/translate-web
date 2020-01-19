import React, { Component } from 'react'
import {Link, withRouter } from 'react-router-dom'
import { Row, Col, Select, Button, Typography } from 'antd'

const { Title } = Typography;
const { Option } = Select

class HeaderFile extends Component {
    render() {
        return (
            <Row>
                <Col span={2} offset={2}>
                    <Select defaultValue="整段翻译" style={{ width: 120 }} onChange={this.selectChangle.bind(this)}>
                        <Option value="single">逐句翻译</Option>
                        <Option value="whole">整段翻译</Option>
                    </Select>
                </Col>
                <Col span={10} offset={5}>
                    <Title level={3} style={{color: "#fff", paddingTop: "10px"}}>welcome to my website!!!</Title>
                </Col>
                <Col span={1} offset={1}>
                    <Button type="primary">
                        <Link to="/">切换到单句翻译</Link>    
                    </Button>
                </Col>
            </Row>
        )
    }
    selectChangle(value) {
        if(value === 'single') {
            this.props.history.push("/file/single")
        } else {
            this.props.history.push("/file")
        }
    }
}

export default withRouter(HeaderFile)