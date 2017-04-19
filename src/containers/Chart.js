import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import React from 'react';
import Header from './Header.js';
import SideBar from './SideBar.js';
import { Button,Breadcrumb,Icon } from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import echarts from 'echarts';
import {fetchnode,fetchlink,fetchusernode} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';



class Chart extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Home';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] }
        });
         this.state = {
             mathjax: MathJax
        }
    }
    process = (NodeRawdata,userdata,LinkRawdata,chapter) =>{
        var NodeMap = new Array();
            var nodedata = new Array();
            for (var i=0;i<NodeRawdata.length;i++)
            {
                var node = {

                    tooltip:{formatter:'node'},
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
                node.name = NodeRawdata[i].fields.names.replace(/\\n|\/n/g,"\n").replace(/\\pi/g,"π").replace(/\\beta/g,"β").replace(/\\gamma/g,"γ").replace(/\\delta/g,"Δ").replace(/\\phi/g,"φ");
                node.tooltip.formatter = NodeRawdata[i].fields.detail.replace(/\\n|\/n/g,"\n");
                node.x = NodeRawdata[i].fields.x;
                node.y = NodeRawdata[i].fields.y;
                switch(NodeRawdata[i].fields.typ) {
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
                switch(NodeRawdata[i].fields.difficulty) {
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
                NodeMap[NodeRawdata[i].pk] = i;
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
            tooltip:{position:[10,10]},
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
    getOptionByChapter = (chapter)=>{
        //console.log(chapter);
        //this.props.actions.fetchnode(chapter);
        //this.props.actions.fetchlink(chapter);
        //this.props.actions.fetchusernode(chapter);
        let myChart = echarts.init(this.refs.graphics)
        let option = [];
        let that = this;
        axios.get("http://lala.ust.hk:8000/get/api/neurons/"+chapter)
            .then(function(nodedata) {
                axios.get("http://lala.ust.hk:8000/get/api/connects/"+chapter)
                    .then(function(linkdata) {
                    axios.get("http://lala.ust.hk:8000/get/api/users/4/neurons/"+chapter)
                        .then(function(userdata) {
                            option = that.process(nodedata.data,userdata.data,linkdata.data,chapter);
                            myChart.setOption(option)
                        })
                    })
            })
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"graphics");
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
        if (this.props.nodedata.length != 0){
            let option = this.process(this.props.nodedata,this.props.userdata,this.props.linkdata);
            let myChart = echarts.init(this.refs.graphics) //初始化echarts
            myChart.setOption(options)
        }
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"graphics");
    }
    render() {
     	//console.log(MathJax)
        return (
        	<div>
        		<Header />
        		<SideBar />
                <div className="wrapper">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Link to="/Home"><Icon type="home" />Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> <Link to="/Chart">
                      <Icon type="picture" />
                      <span>Chart</span></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                    <Button onClick = {this.getOptionByChapter.bind(this,'1&2')}>chapter 1&2 </Button>
                    <Button onClick = {this.getOptionByChapter.bind(this,3)}>chapter 3 </Button>
                    <Button onClick = {this.getOptionByChapter.bind(this,4)}>chapter 4 </Button>
                    <Button onClick = {this.getOptionByChapter.bind(this,5)}>chapter 5 </Button>
                    <Button onClick = {this.getOptionByChapter.bind(this,6)}>chapter 6 </Button>
                    <Button onClick = {this.getOptionByChapter.bind(this,7)}>chapter 7 </Button>
	            	<div ref="graphics" id="graphics" className="chart" ></div>
	            </div>
        	</div>
        )
    }
}
function mapStateToProps (state){
    return { 
            nodedata:state.chart.nodeData,
            userdata:state.chart.userData,
            linkdata:state.chart.linkData,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            fetchnode,
            fetchlink,
            fetchusernode,
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
