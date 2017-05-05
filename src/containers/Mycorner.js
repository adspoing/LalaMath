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
        this.state = {
            done:{"exercise":0,"example":0,"problem":0,"diy":0,"quiz":0},
            right:{"exercise":0,"example":0,"problem":0,"diy":0,"quiz":0},
            all:{"exercise":1,"example":1,"problem":1,"diy":1,"quiz":1},
        }
    }
    getCookie = (name) =>{
        //var cookie = "PHPSESSID=ST-246654-9tH2qwejxfebKHMXyX15-cas1; token=eebec1e2aadbe04a81f503784f0d844c; userid=chuac; id=14; sessionid=f0x2txscpbtqq5vbbh48rbdl9ki36z6v; csrftoken=OCOoUA5LqTkIydLCfQWuIECH7ZgGEoBihL410VUmZsVK5iZG8Qryy0MCCM3YVeA1";
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
    }

    process = (ability) =>{
            var done = new Object();
            var right = new Object()
            var all = new Object();
            done.exercise = ability.doneexercise;
            done.example = ability.doneexample;  
            done.quiz = ability.donequiz; 
            done.problem = ability.doneproblem; 
            done.diy = ability.donediy;  
            right.exercise = ability.rightexercise;
            right.example = ability.rightexample;  
            right.quiz = ability.rightquiz; 
            right.problem = ability.rightproblem; 
            right.diy = ability.rightdiy;  
            all.exercise = ability.allexercise;
            all.example = ability.allexample;  
            all.quiz = ability.allquiz; 
            all.problem = ability.allproblem; 
            all.diy = ability.alldiy;  
            this.setState({done:done,right:right,all:all});

            let value = [];
            for (var i = 1; i < 5;i++){
                value[i-1] = ability[i]+3
            }
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
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data : [
                        {
                            value : value,
                            name : 'Abilities'
                        }
                    ]
                }]
            };
            return option;
    }
    showQuestion = (index) =>{
        this.props.actions.changeindexbyid(index);
      }

    getOptionByUser = ()=>{  
        //let chapter = this.state.chapter;
        //console.log(chapter);
        let myChart = echarts.init(this.refs.graphics)
        let option = [];
        let that = this;
        var userid = this.getCookie("id");
        // userid = 14;
        axios.get("http://lala.ust.hk:8000/get/api/evaluate/"+ userid)
            .then(function(ability) {
                option = that.process(ability.data);
                myChart.setOption(option);
            })
        //this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"graphics");
    }
    percent = (a,b)=>{
        if (b == 0)
            return 0;
        else
            return((100 * a / b).toFixed(0))
    }

    componentDidMount= ()=> {
        //let myChart = echarts.init(this.refs.graphics) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        //let options = [];
        //设置options
        this.getOptionByUser();
    }

    render() {
     	console.log(this.state)
        var username = this.getCookie("userid");
        //var username = "jlicy";
        return (
        	<div>
        		<Header />
        		<SideBar />
                <div className="chartwrapper">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Link to="/Home"><Icon type="home" />Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> <Link to="/Mycorner">
                      <Icon type="picture" />
                      <span>Mycorner</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="welcome"><h1>Hi, {username}</h1></div>
                <div className="completation"> 
                    <h1>Example</h1>
                    <Progress percent={this.percent(this.state.done.example, this.state.all.example)} format={percent => `${this.state.done.example} / ${this.state.all.example}`} strokeWidth={15}/>
                    <Progress percent={this.percent(this.state.right.example, this.state.done.example)} format={percent => `${percent} %`} strokeWidth={15}/>
                    <h1>Problem</h1>
                    <Progress percent={this.percent(this.state.done.problem, this.state.all.problem)} format={percent => `${this.state.done.problem} / ${this.state.all.problem}`} strokeWidth={15}/>
                    <Progress percent={this.percent(this.state.right.problem, this.state.done.problem)} format={percent => `${percent} %`} strokeWidth={15}/>
                    <h1>DIY</h1>
                    <Progress percent={this.percent(this.state.done.diy, this.state.all.diy)} format={percent => `${this.state.done.diy} / ${this.state.all.diy}`} strokeWidth={15}/>
                    <Progress percent={this.percent(this.state.right.diy, this.state.done.diy)} format={percent => `${percent} %`} strokeWidth={15}/>
                    <h1>Exercise</h1>
                    <Progress percent={this.percent(this.state.done.exercise, this.state.all.exercise)} format={percent => `${this.state.done.exercise} / ${this.state.all.exercise}`} strokeWidth={15}/>
                    <Progress percent={this.percent(this.state.right.exercise, this.state.done.exercise)} format={percent => `${percent} %`} strokeWidth={15}/>
                    <h1>Quiz</h1>
                    <Progress percent={this.percent(this.state.done.quiz, this.state.all.quiz)} format={percent => `${this.state.done.quiz} / ${this.state.all.quiz}`} strokeWidth={15}/>
                    <Progress percent={this.percent(this.state.right.quiz, this.state.done.quiz)} format={percent => `${percent} %`} strokeWidth={15}/>
                </div>
	            <div ref="graphics" id="graphics" className="radar" ></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Mycorner);
