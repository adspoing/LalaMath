import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router' // 引入Link处理导航跳转
export default class App extends Component {
    render() {
        return(
         <div>  
            <div>
                { this.props.children }
            </div>
            </div>
            )
    }
}