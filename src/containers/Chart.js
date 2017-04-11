import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import React from 'react';
import Header from './Header.js';
import SideBar from './SideBar.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import echarts from 'echarts';



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
    getOption = ()=>{
    	var option = {
			    title: {
			        text: 'Graph example'
			    },
			    tooltip: {},
			    animationDurationUpdate: 1500,
			    animationEasingUpdate: 'quinticInOut',
			    series : [
			        {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
                normal: {
                    textStyle:{
                        fontWeight:500,
                        color:"#000000",
                        fontSize:17,
                        
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
            
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                normal: {
                    textStyle: {
                        fontSize: 10
                    }
                }
            },
            data: [{
                name: '',
                x: 500,
                y: 0,
                symbolSize:[50,25],
                symbol:"diamond",
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0.3, color: '#ffffff' // 0% 处的颜色
}, {
  offset: 0.6, color: '#0066cc' // 100% 处的颜色
}], false),
                        borderColor:"#"
                    }
                },
            }, {
                name: '                                  space average\n                                     and time average',
                x: 500,
                y: 200,
                
                symbol:"diamond",
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0, color: '#ffffff' // 0% 处的颜色
}, {
  offset: 0.3, color: '#0066cc' // 100% 处的颜色
}], false),
                        borderColor:"#"
                    }
                },
                symbolSize:[50,25],
                
            }, {
                name: '\n                                       long-run behavior',
                x: 500,
                y: 400,
                symbolSize:25,
                symbol:"rect",
                label:{
                    normal:{
                        textStyle:{
                            fontWeight:"bolder"
                        }
                    }
                },
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0.7, color: '#ffffff' // 0% 处的颜色
}, {
  offset: 1, color: '#0066cc' // 100% 处的颜色
}], false),
                        borderColor:"#"
                    }
                }
            }, {
                name: '\n\n\nπ=πp',
                x: 200,
                y: 300,
                symbolSize:25,
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0.6, color: '#ffffff' // 0% 处的颜色
}, {
  offset: 0.9, color: '#0066cc' // 100% 处的颜色
}], false),
                        borderColor:"#"
                    }
                },
                symbol:"circle"
            }, {
                name: '\n\n\nregular M.C',
                x: 300,
                y: 600,
                
                symbolSize:[50,25],
                symbol:"diamond",
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0.6, color: '#ffffff' // 0% 处的颜色
}, {
  offset: 0.9, color: '#0066cc' // 100% 处的颜色
}], false),
                        borderColor:"#"
                    }
                },
                
                
                
            }, {
                name: '\n\n\na sufficient condition',
                x: 700,
                y: 600,
                symbolSize:25,
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0.3, color: '#ffffff' // 0% 处的颜色
}, {
  offset: 0.6, color: '#0066cc' // 100% 处的颜色
}], false),
                        borderColor:"#"
                    }
                },
                symbol:"circle"
            }, {
                name: '\n\n\napplication',
                x: 800,
                y: 300,
                symbolSize:25,
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0.3, color: '#ffffff' // 0% 处的颜色
}, {
  offset: 0.6, color: '#0066cc' // 100% 处的颜色
}], false),
                        borderColor:"#"
                    }
                },
                symbol:"rect"
            }, {
                name: '\n\n          with state \n      rewards',
                x: 1100,
                y: 100,
                symbolSize:[50,25],
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0.3, color: '#ffffff' // 0% 处的颜色
}, {
  offset: 0.6, color: '#0066cc' // 100% 处的颜色
}], false),
                        borderColor:"#"
                    }
                },
                symbol:"diamond"
            }, {
                name: '\n\n\ncoupling',
                x: 1100,
                y: 300,
                symbolSize:25,
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0.3, color: '#ffffff' // 0% 处的颜色
}, {
  offset: 0.6, color: '#0066cc' // 100% 处的颜色
}], false),
                        borderColor:"#"
                    }
                },
                symbol:"rect"
            }, {
                name: '\n\n\nincluding history',
                x: 1100,
                y: 500,
                symbolSize:[50,25],
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0.3, color: '#ffffff' // 0% 处的颜色
}, {
  offset: 0.6, color: '#0066cc' // 100% 处的颜色
}], false),
                        borderColor:"#"
                    }
                },
                symbol:"diamond"
            }],
            links: [{
                source: 1,
                target: 0
                
                
            },
            {
                source: 2,
                target: 1,
                label:{
                    normal:{
                        formatter:"interpretation",
                        show:true,
                        position:"middle",
                    }
                },
            },{
                source: 2,
                target: 3,
                label:{
                    normal:{
                        formatter:"calculation",
                        show:true,
                    }
                },
            },{
                source: 2,
                target: 6
            },{
                source: 6,
                target: 7
            },
            {
                source: 6,
                target: 8
            },
            {
                source: 6,
                target: 9
            },{
                source: 4,
                target: 2
            },{
                source: 5,
                target: 4
            }],
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        }
			    ]
			};
		return option;
    }
    componentDidMount= ()=> {
        let myChart = echarts.init(this.refs.graphics) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        let options = this.getOption();
        //设置options
        myChart.setOption(options)
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"graphics");
    }

    componentDidUpdate = () =>{
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"graphics");
    }
     render() {
     	console.log(MathJax)
        return (
        	<div>
        		<Header />
        		<SideBar />
        		<div className="wrapper">
	            	<div ref="graphics" id="graphics" className="chart"></div>
	            </div>
        	</div>
        )
    }
}

export default Chart;
