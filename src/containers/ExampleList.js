import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification } from 'antd';
// import Data from '../example.js';
// import AllData from '../data.js';
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio,Popconfirm,message,Rate,Spin} from 'antd';
import {prevexample,nextexample,changeindexbyid} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

const Option = Select.Option;
const RadioGroup = Radio.Group;

var selvalue;
var twinProblem;
var RecommendProblem;
var twinOption=[];
var recommendOption=[];
class Question extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Question';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
          TeX: { extensions: ["color.js"] }
        });
        this.state = {
             index: this.props.exampleIndex,
             mathjax: MathJax,
             showResults: false,
             showAns: false,
             value: 0,
             // AllData:[],
             Data:[],
             loading: true
             // pkIndex:[]
        }
    }
    handleChange(value){
        // console.log(`selected ${value}`);
        selvalue=value;
        // console.log(selvalue);
    }   
    nextQuestion = () =>{
        this.props.actions.nextexample();
        this.setState({ showResults: false,showAns: false, value: 0});
    }
    prevQuestion = () =>{
        this.props.actions.prevexample();
        // this.props.clickPrevQuestion();
        this.setState({ showResults: false,showAns: false,value: 0});
    }
    componentDidMount = () =>{   
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"output");
    }
    componentDidUpdate = () =>{
        let AllData=this.props.allData;
        let Data=this.props.exampleData;
        console.log(AllData);
        console.log(Data);
        let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        for(var i=0;i<Data[this.props.exampleIndex].fields.twinproblems.length;i++){
            var indexx=Data[this.props.exampleIndex].fields.twinproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            twinOption.push(<Option  key={iddd+""} value={Data[this.props.exampleIndex].fields.twinproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
        }
        if(Data[this.props.exampleIndex].fields.answer==selvalue){
            for(var i=0;i<Data[this.props.exampleIndex].fields.rightproblems.length;i++){
            var indexx=Data[this.props.exampleIndex].fields.rightproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            recommendOption.push(<Option key={iddd+""} value={Data[this.props.exampleIndex].fields.rightproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
            }
        }
        else{
            for(var i=0;i<Data[this.props.exampleIndex].fields.wrongproblems.length;i++){
            var indexx=Data[this.props.exampleIndex].fields.wrongproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            recommendOption.push(<Option  key={iddd+""} value={Data[this.props.exampleIndex].fields.wrongproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
            }
        }
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"output");
    }
    componentWillMount = () =>{
        // axios.get('http://lala.ust.hk:8000/get/questions/all')
        // .then(res => {
        //   axios.get('http://lala.ust.hk:8000/get/questions/all?category=1').
        //   then(ress => {
        //       console.log(res.data);
        //       console.log(ress.data);
        //       this.setState({ AllData:res.data,Data:ress.data ,loading: false});
        //   })
        // });

    }
      twinProblemChange = (value) =>{
        var pkIndex=[];
        let AllData = this.props.allData;
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        twinProblem=pkIndex[value];
      }
      RecommendProblemChange = (value) =>{
        var pkIndex=[];
        let AllData = this.props.allData;
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        RecommendProblem=pkIndex[value];
      }
      showTwinProblem = () =>{
        this.props.actions.changeindexbyid(twinProblem);
        this.setState({ showResults: false,showAns: false, value: 0});
      }
      showRecommendProblem = () =>{
        this.props.actions.changeindexbyid(RecommendProblem);
        this.setState({ showResults: false,showAns: false, value: 0});
      }

    render() {
        let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];
        // let Data=this.props.exampleData;
        let AllData=this.props.allData;
        let Data=this.props.exampleData;
        console.log(AllData);
        console.log(Data);
         // console.log(Data);
        // console.log(Data[0]);
        // let AllData = this.state.AllData;
        // var pkIndex=[];
        // for(var i=0;i<AllData.length;i++){
        //   pkIndex[AllData[i].pk]=i;
        // }
        // let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];
        // var twinOption=[];
        // for(var i=0;i<Data[this.props.exampleIndex].fields.twinproblems.length;i++){
        //     var indexx=Data[this.props.exampleIndex].fields.twinproblems[i];
        //     var iddd=AllData[pkIndex[indexx]].fields.code;
        //     twinOption.push(<Option  key={iddd+""} value={Data[this.props.exampleIndex].fields.twinproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
        // }
        // var recommendOption=[];
        // if(Data[this.props.exampleIndex].fields.answer==selvalue){
        //     for(var i=0;i<Data[this.props.exampleIndex].fields.rightproblems.length;i++){
        //     var indexx=Data[this.props.exampleIndex].fields.rightproblems[i];
        //     var iddd=AllData[pkIndex[indexx]].fields.code;
        //     recommendOption.push(<Option key={iddd+""} value={Data[this.props.exampleIndex].fields.rightproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
        //     }
        // }
        // else{
        //     for(var i=0;i<Data[this.props.exampleIndex].fields.wrongproblems.length;i++){
        //     var indexx=Data[this.props.exampleIndex].fields.wrongproblems[i];
        //     var iddd=AllData[pkIndex[indexx]].fields.code;
        //     recommendOption.push(<Option  key={iddd+""} value={Data[this.props.exampleIndex].fields.wrongproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
        //     }
        // }

        return (
        	<div>
            <div className="exam-bg">
        		<div className="questionwrapper">
                <div className="inner-wrapper">
                    <div className="questionHeader">
                        <Breadcrumb>
                        <Breadcrumb.Item href="">
                          <Link to="/Dashboard"><Icon type="home" />Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href=""> <Link to="/Example">
                          <Icon type="book" />
                          <span>Example</span></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href=""> <Link to="/ExampleForm">
                          <Icon type="file-text" />
                          <span>ExampleForm</span></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {Data.length!=0?questype[Data[this.props.exampleIndex].fields.category]:null}
                            {Data.length!=0?Data[this.props.exampleIndex].fields.code:null}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button><Link to="/ExampleForm">Quit</Link></Button>
                                <Button type="prev" className="prevQuestion" onClick = {this.prevQuestion}>Prev</Button>
                                <Button type="next" className="nextQuestion" onClick = {this.nextQuestion}>Next</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <div id="output" className="questionstem">{Data.length!=0?Data[this.props.exampleIndex].fields.problem.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }):null}
                         {Data.length!=0?Data[this.props.exampleIndex].fields.problempicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture1}/>:null}
                         {Data.length!=0?Data[this.props.exampleIndex].fields.problempicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture2}/>:null}
                         {Data.length!=0?Data[this.props.exampleIndex].fields.problempicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture3}/>:null}
                         {Data.length!=0?Data[this.props.exampleIndex].fields.problempicture4==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture4}/>:null}
                         {Data.length!=0?Data[this.props.exampleIndex].fields.problempicture5==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture5}/>:null}
                         {Data.length!=0?Data[this.props.exampleIndex].fields.problempicture6==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture6}/>:null}
                        </div>
                        <div className="questionanswer">
                          <div className="questionresult">
                          {Data.length!=0? Data[this.props.exampleIndex].fields.solutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }) :null}
                         {Data.length!=0?Data[this.props.exampleIndex].fields.solutionspicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.solutionspicture1}/>:null}
                         {Data.length!=0?Data[this.props.exampleIndex].fields.solutionspicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.solutionspicture2}/>:null}
                         {Data.length!=0?Data[this.props.exampleIndex].fields.solutionspicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.solutionspicture3}/>:null}
                          <div>{
                                 <Select
                                    style={{ width: 200 }}
                                    // defaultValue={twinOption[0]}
                                    placeholder="Select a twin problem"
                                    optionFilterProp="children"
                                    onChange={this.twinProblemChange}
                                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                  >
                                     
                                     {twinOption}
                                  </Select>}
                               { <Button onClick = {this.showTwinProblem}><Link to="/ViewQuestion">Show</Link></Button> }
                              
                               { 
                                 <Select
                                    style={{ width: 200 }}
                                    // defaultValue={twinOption[0]}
                                    placeholder="Select a Recommend problem"
                                    optionFilterProp="children"
                                    onChange={this.RecommendProblemChange}
                                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                  >
                                     
                                     {recommendOption}
                                  </Select>}
                               { <Button onClick = {this.showRecommendProblem}><Link to="/ViewQuestion">Show</Link></Button> }
                               </div>
                          </div>
                          <div className="problemcomment"> { "Giving an comment on this problem"}</div>
                           { <Rate />}
                           { <Button onClick = {this.submitcomment}>submit</Button>}
                        </div>
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
            exampleIndex:state.question.exampleIndex,
            index:state.question.index,
            allData:state.question.allData,
            exampleData:state.question.exampleData
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
          changeindexbyid,
            prevexample,
            nextexample
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Question);

