import React, { Component } from 'react'

export default class SingleSentence extends Component {
    // status: init pedding success
    state = {
        status: 'init'
    }
    render() {
        return (
            <div style={{minHeight: "480px"}}>
                {(() => {
                    switch (this.state.status) {
                        case 'init':
                            return <div>init</div>
                        case 'pedding': 
                            return <div>pedding</div>
                        case 'success':
                            return <div>success</div>
                        default:
                            return <div>fail</div>
                    }
                })()}
            </div>
        )
    }
}
