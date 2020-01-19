import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Input, Row, Col, Select, Button } from 'antd'
import { setSingleData } from '../../model/action'

import { translateByAllWays, formatTranslateData } from '../../API/index'

const { Search } = Input
const { Option } = Select

const headerStyle = {

}

class HeaderSingle extends Component {
    state = {
        translateLoading: false,
        targetSelect: 'zh-CN'
    }
    render() {
        return (
            <div style={headerStyle}>
                <Row>
                    <Col span={2} offset={2}>
                        <Select defaultValue="简体中文" style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
                            <Option value="zh-CN">简体中文</Option>
                            <Option value="en">英语</Option>
                        </Select>
                    </Col>
                    <Col span={14} offset={1}>
                        <Search placeholder="input search loading with enterButton"
                            style={{ paddingTop: "10px" }}
                            loading={this.state.translateLoading}
                            size="large"
                            enterButton="翻译"
                            onSearch={this.onSearch.bind(this)} />
                    </Col>
                    <Col span={1} offset={1}>
                        <Button type="primary">
                            <Link to="/file">切换到文章翻译</Link>
                        </Button>
                    </Col>
                </Row>

            </div>
        )
    }
    handleSelectChange(value) {
        this.setState({
            targetSelect: value
        })
    }
    async onSearch(value) {
        const { targetSelect } = this.state
        this.setState({
            translateLoading: true
        })
        const result = await translateByAllWays(value, targetSelect)
        const formatDataArr = result.map(ele => formatTranslateData(ele.data))
        console.log('inputdata', formatDataArr)
        this.props.setSingleDataToStore(formatDataArr)
        this.setState({
            translateLoading: false
        })
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        pageType: state.PageTypeState.pageType
    }
}
const mapDispatchToProps = (dispatch) => ({
    setSingleDataToStore: (data) => dispatch(setSingleData(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderSingle)