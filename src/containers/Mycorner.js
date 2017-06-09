import '../css/Mycorner.less';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import React from 'react';
import Header from './Header.js';
import SideBar from './SideBar.js';
import AllData from '../data.js';
import { Button,Breadcrumb,Icon,Progress,Table,Spin} from 'antd';
import { Link } from 'react-router' // 引入Link处理导航跳转
import echarts from 'echarts';
import {changeindexbyid,setchapter,loaddata} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];
class Mycorner extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'Home';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] }
        });
        this.state = {
            loading: true,
            wrong:[],
            favorate:[],
            userResult:[],
            countarr: [],
            done:{"exercise":0,"example":0,"problem":0,"diy":0,"quiz":0},
            right:{"exercise":0,"example":0,"problem":0,"diy":0,"quiz":0},
            all:{"exercise":1,"example":1,"problem":1,"diy":1,"quiz":1},
        }
    }
    getCookie = (name) =>{
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
    }

    SetWrong = () =>{
        this.setState({userResult:this.state.wrong})
      }
    SetFavor = () =>{
        this.setState({userResult:this.state.favorate})
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
        //userid = 14;
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

    findQuestion = (questionid) =>{
        let Data=this.props.allData;
        let Counter=this.state.countarr;
        let question=new Object();
        for(var i=0;i<Data.length;i++){
            if(Data[i].pk==questionid){
                question.code = questype[Data[i].fields.category]+Data[i].fields.code;
                question.difficulty = Data[i].fields.difficulty;
                question.category=Data[i].fields.category;
                for(var i=0;i<Counter.length;i++){
                    if(Counter[i].questionid==questionid){
                        question.correctcount=Counter[i].rightcount+"/"+Counter[i].donecount;
                        return question;
                    }
                }
            }
        }
    }
    onrowclick=(record, index)=>{
        var indexxx;
        // console.log(this.state.Hottest[index]);
        let Data=this.props.allData;

        for(var i=0;i<Data.length;i++){
        if(Data[i].fields.code==record.code.split(' ')[1]&&
            Data[i].fields.category==this.state.userResult[index].category){
            indexxx=i;
            }
        }
        this.props.actions.changeindexbyid(indexxx);
    }
    componentWillMount=()=>{
        if(this.props.allData.length==0){
          axios.get('http://lala.ust.hk:8000/get/questions/all')
          .then(res => {
            this.props.actions.loaddata(res.data);
            this.setState({loading: false});
          });
        }else{
              this.setState({loading: false});
        }
        if(this.state.countarr.length==0){
                let url="http://lala.ust.hk:8000/get/api/questions/getcount";
                axios.get(url)
                .then(res => {
                    this.setState({loading: false,countarr:res.data});
                });
        }
    }
    componentDidMount= ()=> {
        var userid = this.getCookie("id");
        //userid = 14;
        let wrong = [];
        let that = this;
        axios.get("http://lala.ust.hk:8000/get/api/users/"+userid+"/questions/?right=wrong")
            .then(function(question) {
                for (var i = 0; i < question.data.length; i++){
                    let tm=new Object();
                    tm.key=i;
                    var problem = that.findQuestion(question.data[i].fields.questionid)
                    tm.code=problem.code;
                    tm.category = problem.category;
                    tm.difficulty = problem.difficulty;
                    tm.correctcount = problem.correctcount;
                    tm.time=question.data[i].fields.time;
                    wrong.push(tm);
                }
                wrong.sort(function(a, b) {
                    return ((a.code.split(' ')[0] > b.code.split(' ')[0])?1:-1);
                });
                that.setState({wrong:wrong});
            })
        let favorate = [];
        axios.get("http://lala.ust.hk:8000/get/api/users/"+userid+"/questionslikes/")
            .then(function(question) {
                for (var i = 0; i < question.data.length; i++){
                  let tm=new Object();
                  tm.key=i;
                  var problem = that.findQuestion(question.data[i].fields.questionid);
                  tm.code=problem.code;
                  tm.category = problem.category;
                  tm.difficulty = problem.difficulty;
                  tm.correctcount = problem.correctcount;
                  favorate.push(tm);
                }
                favorate.sort(function(a, b) {
                    return ((a.code.split(' ')[0] > b.code.split(' ')[0])?1:-1);
                  });
                that.setState({favorate:favorate});
            })

        that.setState({userResult:favorate});
        this.getOptionByUser();
    }

    render() {
        var username = this.getCookie("userid");
        //var username = "jlicy";
        let columns = [{
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: text => <Link to="/ViewQuestion">{text}</Link>,
            sorter: (a, b) => a.code.split(' ')[0] > b.code.split(' ')[0]?1:-1,
            filters: [
                { text: 'Example', value: 1 },
                { text: 'Exercise', value: 2 },
                { text: 'Problem', value: 3 },
                { text: 'DIY', value: 4 },
                { text: 'Quiz', value: 5 },
            ],
            onFilter: (value, record) => record.category==value,
            }, {
              title: 'Correct Count/Submit Count',
              dataIndex: 'correctcount',
              key: 'correctcount',
            },{
              title: 'Difficulty',
              dataIndex: 'difficulty',
              key: 'difficulty',
              sorter: (a, b) => a.difficulty - b.difficulty,
              filters: [
                { text: '1', value: 1 },
                { text: '2', value: 2 },
                { text: '3', value: 3 },
                { text: '4', value: 4 },
                { text: '5', value: 5 },
              ],
              onFilter: (value, record) => record.difficulty==value,
            }];
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
                <div className="userResult">
                    <Button  onClick = {this.SetFavor}>Favorate</Button>
                    <Button style={{marginLeft: '10px'}} onClick = {this.SetWrong}>Wrong</Button>
                    <Spin spinning={this.state.loading} tip="Loading questions...">
                    <Table dataSource={this.state.userResult} columns={columns} onRowClick={this.onrowclick.bind(this)} />
                    </Spin>
                </div>
	            </div>
	        </div>
        )
    }
}
function mapStateToProps (state){
    return { 
            allData:state.question.allData,
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,loaddata
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Mycorner);
