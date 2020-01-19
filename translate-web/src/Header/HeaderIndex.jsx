import React, { Component } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import HeaderFile from './HeaderFile/HeaderFile'
import HeaderSingle from './HeaderSingle/HeaderSingle'

class HeaderIndex extends Component {
    render() {
        return <Switch>
        <Route path="/" exact component={HeaderSingle} />
        <Route path="/file" component={HeaderFile}/>
      </Switch>
    }
}

export default HeaderIndex