import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import SingleSentence from './SingleSentence/SingleSentence'
import WholeParagraph from './WholeParagraph/WholeParagraph'

export default class ContentFile extends Component {
    render() {
        return (
            <Switch>
                <Route path="/file" exact component={WholeParagraph}/>
                <Route path="/file/single" component={SingleSentence}/>
            </Switch>
        )
    }
}
