import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import React from 'react';
import Header from './Header.js';
import SideBar from './SideBar.js';
import { Button,Breadcrumb,Icon,Select} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import echarts from 'echarts';
import {fetchnode,fetchlink,fetchusernode} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import '../css/Chart.less';



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
                node.name = NodeRawdata[i].names.replace(/\\n|\/n/g,"\n").replace(/\\pi/g,"π").replace(/\\beta/g,"β").replace(/\\gamma/g,"γ").replace(/\\delta/g,"δ").replace(/\\phi/g,"φ");
                node.detail = NodeRawdata[i].detail.replace(/\\n|\/n/g,"\n");
                node.title = NodeRawdata[i].title;
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
        myChart.on('click', function (params) {
                //console.log(document.getElementById("detail").value);
                let detail = "<b>Neuron Name:</br></b>" + params.data.title + "<b></br>Neuron Detail:</br></b>" + params.data.detail;
                document.getElementById('detail').innerHTML = detail;
                console.log(that.state.mathjax)
                that.state.mathjax.Hub.Queue(["Typeset",that.state.mathjax.Hub],"detail");
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
    	if(value==0)this.getOptionByChapter('1&2');
    	if(value==1)this.getOptionByChapter(3);
    	if(value==2)this.getOptionByChapter(4);
    	if(value==3)this.getOptionByChapter(5);
    	if(value==4)this.getOptionByChapter(6);
    	if(value==5)this.getOptionByChapter(7);
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
                        style={{ width: 200 }}
                        placeholder="Select a chapter"
                        // onChange={handleChange}
                        optionFilterProp="children"
                        onChange={this.handleChange}
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
                    <div className="neuraldetail" id="detail">{this.detail}
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
            fetchnode,
            fetchlink,
            fetchusernode,
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
