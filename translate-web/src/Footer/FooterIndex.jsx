import React, { Component } from 'react'


import styles from './FooterIndex.module.scss'
export default class FooterIndex extends Component {
    render() {
        console.log(styles)
        return (
            <div className={styles['footer']}>
                <ul>
                    <li>说明：</li>
                    <li>1. 本站为dustleaf本人设计，个人可以使用，但未经许可不得用于任何商业用途</li>
                </ul>
                <div>
                    Copyright © 2018-2019 wangjianglin_priv@qq.com All rights reserved. 蜀ICP备19015361号
                </div>
            </div>
        )
    }
}
