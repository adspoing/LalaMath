import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import React from 'react';
import Header from './Header.js';
import SideBar from './SideBar.js';
import AllData from '../data.js';
import { Button,Breadcrumb,Icon,Select} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import echarts from 'echarts';
import {changeindexbyid} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import '../css/Chart.less';
const Option = Select.Option;


class Chart extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Home';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] }
        });
         this.state = {
             mathjax: MathJax,
             example: [],
             exercise: [],
             chapter:"0",
        }
    }
    getCookie = (name) =>{
        var cookie = "PHPSESSID=ST-246654-9tH2qwejxfebKHMXyX15-cas1; token=eebec1e2aadbe04a81f503784f0d844c; userid=chuac; id=14; sessionid=f0x2txscpbtqq5vbbh48rbdl9ki36z6v; csrftoken=OCOoUA5LqTkIydLCfQWuIECH7ZgGEoBihL410VUmZsVK5iZG8Qryy0MCCM3YVeA1";
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
    }

    process = (NodeRawdata,userdata,LinkRawdata,chapter) =>{
        var NodeMap = new Array();
            var nodedata = new Array();
            for (var i=0;i<NodeRawdata.length;i++)
            {
                var node = {

                    name: '',
                    x: 0,
                    y: 0,
                    label: {
                        normal: {
                            textStyle:{
                                fontWeight:500,
                                color:"#000000",
                                fontSize:10,
                                },
                            show: true
                            }
                        },

                    itemStyle:{
                        normal:{
                            color:"#ffffff",
                            borderColor:"#",
                            borderWidth:1,
                        }
                    },
                }
                node.name = NodeRawdata[i].names.replace(/\\n|\/n/g,"\n").replace(/\\pi/g,"π").replace(/\\beta/g,"β").replace(/\\gamma/g,"γ").replace(/\\delta/g,"δ").replace(/\\phi/g,"φ").replace(/\\xi/g,"ξ");
                node.detail = NodeRawdata[i].detail.replace(/\\n|\/n/g,"\n");
                node.title = NodeRawdata[i].title;
                node.example = NodeRawdata[i].example;
                node.exercise = NodeRawdata[i].exercise;
                node.x = NodeRawdata[i].x;
                node.y = NodeRawdata[i].y;
                switch(NodeRawdata[i].typ) {
                    case 1:
                        node.label.normal.textStyle.fontStyle = "normal";
                        break;
                    case 2:
                        node.label.normal.textStyle.fontWeight = 800;
                        break;
                    case 3:
                        node.label.normal.textStyle.fontStyle = "oblique";
                        break;
                    default:
                        node.label.normal.textStyle.fontStyle = "normal";
                        break;
                }
                switch(NodeRawdata[i].difficulty) {
                    case 1:
                        node.symbol = "circle";
                        node.symbolSize = 15;
                        break;
                    case 2:
                        node.symbol = "diamond";
                        node.symbolSize=[30,15];
                        break;
                    case 3:
                        node.symbol = "rect";
                        node.symbolSize=15;
                        break;
                    default:
                        break;
                }
                nodedata.push(node);
                NodeMap[NodeRawdata[i].id] = i;
            }

            for (var i=0;i<userdata.length;i++)
            {
                var index = NodeMap[userdata[i].fields.neuronid];
                var familiar = userdata[i].fields.familiar;
                if (familiar < -0.5)
                    nodedata[index].itemStyle.normal.color =  'rgb(255,0,0)'
                if (familiar > -0.5 && familiar < 0)
                    nodedata[index].itemStyle.normal.color =  'rgb(255,127,36)'
                if (familiar < 0.5 && familiar > 0)
                    nodedata[index].itemStyle.normal.color =  'rgb(0,255,0)'
                if (familiar > 0.5)
                    nodedata[index].itemStyle.normal.color =  'rgb(154,255,154)'
                //new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //              offset: (1-familiar*10), color: '#ffffff' // 0% 处的颜色
                //            }, {
                //              offset: 1, color: '#0066cc' // 100% 处的颜色
                //            }], false);
            }

            var linkdata = new Array();
            for (var i=0;i<LinkRawdata.length;i++)
            {
                var link = {
                    source: 2,
                    target: 3,
                    label:{
                        normal:{
                            formatter:"",
                            show:false,
                        }
                    },
                }
                link.source = NodeMap[LinkRawdata[i].fields.begin];
                link.target = NodeMap[LinkRawdata[i].fields.ending];
                if (LinkRawdata[i].fields.detail != ""){
                    link.label.normal.formatter = LinkRawdata[i].fields.detail;
                    link.label.normal.show = true;
                }
                linkdata.push(link);
            }
            var option = {
            title: {text: 'Chapter'+chapter},
            //tooltip:{position:[10,10]},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [{
                type: 'graph',
                layout: 'none',
                roam: true,
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 10
                        }
                    }
                },
                data: nodedata,
                links: linkdata,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
                }]
            };
            return option;
    }
    showQuestion = (index) =>{
        this.props.actions.changeindexbyid(index);
      }

    getOptionByChapter = (chapter)=>{  
        //let chapter = this.state.chapter;
        //console.log(chapter);
        let myChart = echarts.init(this.refs.graphics)
        let option = [];
        let that = this;
        var userid = this.getCookie("id");
        console.log(userid);
        axios.get("http://lala.ust.hk:8000/get/api/neurons/"+chapter)
            .then(function(nodedata) {
                axios.get("http://lala.ust.hk:8000/get/api/connects/"+chapter)
                    .then(function(linkdata) {
                    axios.get("http://lala.ust.hk:8000/get/api/users/"+ userid +"/neurons/"+chapter)
                        .then(function(userdata) {
                            option = that.process(nodedata.data,userdata.data,linkdata.data,chapter);
                            myChart.setOption(option)
                        })
                    })
            })
        myChart.on('click', function (params) {
                var pkIndex=[];
                for(var i=0;i<AllData.length;i++){
                        pkIndex[AllData[i].pk]=i;
                }
                //console.log(document.getElementById("detail").value);
                let detail = "<b>Neuron Name:</br></b>" + params.data.title;
                let examplediv = [];
                let exercisediv = [];
                if(typeof params.data.detail != 'undefiend'){
                    detail = detail + "<b></br>Neuron Detail:</br></b>" + params.data.detail;
                }
                document.getElementById('detail').innerHTML = detail;
                that.state.mathjax.Hub.Queue(["Typeset",that.state.mathjax.Hub],"detail");
                if(params.data.example.length != 0){   
                    examplediv.push(<b>Examples:</b>)
                    for (var i = 0; i < params.data.example.length; ++i){
                        examplediv.push(<span onClick = {that.showQuestion.bind(this,pkIndex[params.data.example[i]])}><Link to="/ViewQuestion">{AllData[pkIndex[params.data.example[i]]].fields.code}</Link>   </span>)
                    }
                }
                if(params.data.exercise.length != 0){
                    exercisediv.push(<b>Exercise:</b>)
                    for (var i = 0; i < params.data.exercise.length; ++i){
                        exercisediv.push(<span onClick = {that.showQuestion.bind(this,pkIndex[params.data.exercise[i]])}><Link to="/ViewQuestion">{AllData[pkIndex[params.data.exercise[i]]].fields.code}</Link>   </span>)
                    }
                }
                that.setState({example:examplediv, exercise:exercisediv});
        });

        //this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"graphics");
    }

    componentDidMount= ()=> {
        //let myChart = echarts.init(this.refs.graphics) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        //let options = [];
        //设置options
        //myChart.setOption(options)
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"graphics");
    }

    componentDidUpdate = () =>{
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"graphics");
    }
    handleChange = (value)=>{
    	//console.log(value)
        let chapter = '';
    	if(value==0)   {chapter= '1&2';}
    	if(value==1)   {chapter=3;}
    	if(value==2)   {chapter=4;}
    	if(value==3)   {chapter=5;}
    	if(value==4)   {chapter=6;}
    	if(value==5)   {chapter=7;}
        this.setState({chapter:value});
        //console.log(this.state.chapter);
        this.getOptionByChapter(chapter);
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
                <div className="belowbread"> 
                	<Select
                        //defaultValue = {this.state.chapter}
                        style={{ width: 200 }}
                        placeholder="Select a chapter"
                        optionFilterProp="children"
                        onSelect={this.handleChange}
                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                      <Option value="0"><Icon type="picture" />Chapter 1&2</Option>
                        <Option value="1"><Icon type="picture" />Chapter 3</Option>
                        <Option value="2"><Icon type="picture" />Chapter 4</Option>
                        <Option value="3"><Icon type="picture" />Chapter 5</Option>
                        <Option value="4"><Icon type="picture" />Chapter 6</Option>
                        <Option value="5"><Icon type="picture" />Chapter 7</Option>
                     </Select>
                    <div>
	            	<div ref="graphics" id="graphics" className="chart" ></div>
                    <div className="neuraldetail">
                    <div id="detail">{this.detail}</div>
                    <div id="example">{this.state.example}</div>
                    <div id="exercise">{this.state.exercise}</div>
                    </div>
                    </div>
	            </div>
	            </div>
        	</div>
        )
    }
}
function mapStateToProps (state){
    return { 
            // nodedata:state.chart.nodeData,
            // userdata:state.chart.userData,
            // linkdata:state.chart.linkData,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
