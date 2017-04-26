import '../css/Mycorner.less';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import React from 'react';
import Header from './Header.js';
import SideBar from './SideBar.js';
import AllData from '../data.js';
import { Button,Breadcrumb,Icon,Progress} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import echarts from 'echarts';
import {changeindexbyid,setchapter} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

class Settings extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Settings';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] }
        });
    }
   

    render() {
        return (
        	<div>
        		<Header />
        		<SideBar />
                <div className="chartwrapper">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Link to="/Home"><Icon type="home" />Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 
                      <Icon type="settings" />
                      <span>Settings</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="belowbread">
                    Under Construction 
	            </div>
                </div>
	        </div>
        )
    }
}
function mapStateToProps (state){
    return { 
            //chapter:state.graph.chapter,
            // userdata:state.chart.userData,
            // linkdata:state.chart.linkData,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
