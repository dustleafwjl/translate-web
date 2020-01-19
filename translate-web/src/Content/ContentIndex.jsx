import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect  } from 'react-router-dom'

import styles from './ContentIndex.module.scss'

import { changeToTypeFile, changeToTypeSingle} from '../model/action'


import ContentFile from './ContentFile/ContentFile'
import ContentSingle from './ContentSingle/ContentSingle'

class ContentIndex extends Component {

    render() {
        return (
            <div className={styles['content-wrap']}>
                <Switch className={styles['content-wrap']}>
                    <Route path="/" exact component={ContentSingle}/>
                    <Route path="/file" component={ContentFile}/>
                    {/* <Redirect to="/" /> */}
                </Switch>
            </div>
            
        )
    }
}

export default ContentIndex