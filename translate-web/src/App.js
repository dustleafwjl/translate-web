import React, { Component } from 'react'
import './App.css'

import { BrowserRouter } from 'react-router-dom'

import { Layout } from 'antd'
import HeaderIndex from './Header/HeaderIndex'
import ContentIndex from './Content/ContentIndex'
import FooterIndex from './Footer/FooterIndex'


const { Header, Footer, Content } = Layout

export default class App extends Component {
  state = {
    tranlsateData: {}
  }
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Header>
            <HeaderIndex handleSearchEnd={this.handleSearchEnd.bind(this)}/>
          </Header>
          <Content>
            <ContentIndex tranlsateData={this.state.tranlsateData}/>
          </Content>
          <Footer style={{backgroundColor: "#001529", marginTop: "50px"}}>
            <FooterIndex />
          </Footer>
        </Layout>
      </BrowserRouter>
    )
  }
  handleSearchEnd(data) {
    console.log(data)
    this.state.tranlsateData = data
  }
}

