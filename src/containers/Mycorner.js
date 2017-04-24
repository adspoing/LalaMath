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

class Mycorner extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Home';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] }
        });
    }
    getCookie = (name) =>{
        var cookie = "PHPSESSID=ST-246654-9tH2qwejxfebKHMXyX15-cas1; token=eebec1e2aadbe04a81f503784f0d844c; userid=chuac; id=14; sessionid=f0x2txscpbtqq5vbbh48rbdl9ki36z6v; csrftoken=OCOoUA5LqTkIydLCfQWuIECH7ZgGEoBihL410VUmZsVK5iZG8Qryy0MCCM3YVeA1";
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
    }

    process = (ability) =>{
            var option = {
                radar: {
                    // shape: 'circle',
                    indicator: [
                       { name: 'Conceptial Understanding', max: 6},
                       { name: 'Computation', max: 6},
                       { name: 'Logic', max: 6},
                       { name: 'Application', max: 6},
                    ]
                },
                series: [{
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data : [
                        {
                            value : [3, 4, 3, 3, 2, 3],
                            name : '预算分配（Allocated Budget）'
                        }
                    ]
                }]
            };
            return option;
    }
    showQuestion = (index) =>{
        this.props.actions.changeindexbyid(index);
      }

    getOptionByUser = (userid)=>{  
        //let chapter = this.state.chapter;
        //console.log(chapter);
        let myChart = echarts.init(this.refs.graphics)
        let option = [];
        let that = this;
        var userid = this.getCookie("id");
        console.log(userid);
        //axios.get("http://lala.ust.hk:8000/get/api/users/"+ userid +"/neurons/"+chapter)
        //    .then(function(ability) {
        //            option = that.process(ability.data);
        //            //console.log("After fetching data",option);
        //           myChart.setOption(option);
        //    })
        option = that.process([]);
        myChart.setOption(option);
        //this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"graphics");
    }

    componentDidMount= ()=> {
        //let myChart = echarts.init(this.refs.graphics) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        //let options = [];
        //设置options
        this.getOptionByUser(2);
    }

    componentDidUpdate = () =>{
        var myChart = echarts.init(this.refs.graphics)
        myChart.setOption(this.props.option)    
    }
    render() {
     	//console.log(MathJax)
        return (
        	<div>
        		<Header />
        		<SideBar />
                <div className="chartwrapper">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Link to="/Home"><Icon type="home" />Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> <Link to="/Chart">
                      <Icon type="picture" />
                      <span>Knowledge Graph</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="completation"> 
                    <h1>Exercise</h1>
                    <Progress percent={23} strokeWidth={15}/>
                    <h1>Problem</h1>
                    <Progress percent={50} strokeWidth={15}/>
                    <h1>DIY</h1>
                    <Progress percent={70} strokeWidth={15}/>
                    <h1>Example</h1>
                    <Progress percent={20} strokeWidth={15}/>
                    <h1>Quiz</h1>
                    <Progress percent={50} strokeWidth={15}/>
                </div>
	            <div ref="graphics" id="graphics" className="chart" ></div>
	            </div>
	        </div>
        )
    }
}
function mapStateToProps (state){
    return { 
            chapter:state.graph.chapter,
            // userdata:state.chart.userData,
            // linkdata:state.chart.linkData,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
            setchapter,
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Mycorner);
