import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification } from 'antd';
import Data from '../example.js';
import AllData from '../data.js'
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio } from 'antd';
import {prevexample,nextexample,changeindexbyid} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Option = Select.Option;
const RadioGroup = Radio.Group;

var selvalue;
var twinProblem;
var RecommendProblem;
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
             value: 0
        }
    }
    handleChange(value){
        console.log(`selected ${value}`);
        selvalue=value;
        console.log(selvalue);
    }   
    // _clickSubmitQuestion = () =>{
    //     this.props.actions.submitquestion();
    // }
    // _clickNextQuestion = () =>{
    // }
    // _clickPrevQuestion = () =>{
    // }
    // submitQuestion = () =>{
    //     this.props.clickSubmitQuestion();
    //     if(Data[this.props.exampleIndex].fields.answer==selvalue){
    //         var config={};
    //         config.description=Data[this.props.exampleIndex].fields.messagesuccess;
    //         config.message="success";
    //         config.duration=0;
    //         notification.success(config);
    //     }
    //     else
    //     {
    //         var config={};
    //         config.description=Data[this.props.exampleIndex].fields.messagefailure;
    //         config.message="error";
    //         config.duration=0;
    //         notification.error(config);
    //     }
    //     this.setState({ showResults: true });
    // }
    nextQuestion = () =>{
        // this.props.clickNextQuestion();
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
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"output");
    }
    // showAns = () =>{
    //     this.setState({ showAns: true});
    // }
    // onChange = (e) => {
    //     console.log('radio checked', e.target.value);
    //     this.setState({
    //       value: e.target.value,
    //     });
    //     selvalue=e.target.value;
    //   }
      showQuestion =(e)=>{
        console.log(e.target.value);
      }
      twinProblemChange = (value) =>{
        twinProblem=value;
      }
      RecommendProblemChange = (value) =>{
        RecommendProblem=value;
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
        // let Data=this.props.Data;
        // console.log(this.state.mathjax);
        // console.log(Data)
        // console.log(this.props.exampleIndex)
        // var choiceA="";
        // var choiceB="";
        // var choiceC="";
        // var choiceD="";
        // var choiceE="";
        // var choiceF="";
        // var result="";
        // if(Data[this.props.exampleIndex].fields.choicesa!=null){
        //     choiceA+=Data[this.props.exampleIndex].fields.choicesa;
        // }
        // const radioStyle = {
        //   height: '30px',
        //   lineHeight: '30px',
        // };
        // if(Data[this.props.exampleIndex].fields.choicesb!=null){
        //     choiceB+=Data[this.props.exampleIndex].fields.choicesb;
        // }if(Data[this.props.exampleIndex].fields.choicesc!=null){
        //     choiceC+=Data[this.props.exampleIndex].fields.choicesc;
        // }if(Data[this.props.exampleIndex].fields.choicesd!=null){
        //     choiceD+=Data[this.props.exampleIndex].fields.choicesd;
        // }if(Data[this.props.exampleIndex].fields.choicese!=null){
        //     choiceE+=Data[this.props.exampleIndex].fields.choicese;
        // }if(Data[this.props.exampleIndex].fields.choicesf!=null){
        //     choiceF+=Data[this.props.exampleIndex].fields.choicesf;
        // }
        let questype;
        if(Data[this.props.exampleIndex].fields.category==1)
            questype="Example  ";
        if(Data[this.props.exampleIndex].fields.category==2)
            questype="Exercise  ";
        if(Data[this.props.exampleIndex].fields.category==3)
            questype="Problem  ";
        if(Data[this.props.exampleIndex].fields.category==4)
            questype="DIY  ";
        if(Data[this.props.exampleIndex].fields.category==5)
            questype="Quiz  ";
        var twinOption=[];
        // var defaultOption;
        // defaultOption=Data[this.props.exampleIndex].fields.twinproblems[0];
        for(var i=0;i<Data[this.props.exampleIndex].fields.twinproblems.length;i++){
            var indexx=Data[this.props.exampleIndex].fields.twinproblems[i];
            var iddd=AllData[indexx].fields.code;
            twinOption.push(<Option  key={iddd+""} value={Data[this.props.exampleIndex].fields.twinproblems[i]}>{iddd}</Option>)
        }
        var recommendOption=[];
        if(Data[this.props.exampleIndex].fields.answer==selvalue){
            for(var i=0;i<Data[this.props.exampleIndex].fields.rightproblems.length;i++){
            var indexx=Data[this.props.exampleIndex].fields.rightproblems[i];
            var iddd=AllData[indexx].fields.code;
            recommendOption.push(<Option key={iddd+""} value={Data[this.props.exampleIndex].fields.rightproblems[i]}>{iddd}</Option>)
            }
        }
        else{
            for(var i=0;i<Data[this.props.exampleIndex].fields.wrongproblems.length;i++){
            var indexx=Data[this.props.exampleIndex].fields.wrongproblems[i];
            var iddd=AllData[indexx].fields.code;
            recommendOption.push(<Option  key={iddd+""} value={Data[this.props.exampleIndex].fields.wrongproblems[i]}>{iddd}</Option>)
            }
        }

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
                        <Breadcrumb.Item href=""> <Link to="/QuestionList">
                          <Icon type="book" />
                          <span>Qustion List</span></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {questype}
                            {Data[this.props.exampleIndex].fields.code}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button><Link to="/Example">Quit</Link></Button>
                                <Button type="prev" className="prevQuestion" onClick = {this.prevQuestion}>Prev</Button>
                                <Button type="next" className="nextQuestion" onClick = {this.nextQuestion}>Next</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <div id="output" className="questionstem">{Data[this.props.exampleIndex].fields.problem}</div>
                        <div className="questionanswer">
                          <div className="questionresult">
                          <div>Twin problems: </div>
                          <div>
                             <Select
                                style={{ width: 120 }}
                                // defaultValue={twinOption[0]}
                                placeholder="Select a twin problem"
                                optionFilterProp="children"
                                onChange={this.twinProblemChange}
                                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                 
                                 {twinOption}
                              </Select>
                           <Button onClick = {this.showTwinProblem}><Link to="/ViewQuestion">Show</Link></Button>
                           </div>
                            <div>Recommend problems: </div>
                           <div>
                             <Select
                                style={{ width: 120 }}
                                placeholder="Select a Recommend problem"
                                optionFilterProp="children"
                                onChange={this.RecommendProblemChange}
                                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                 
                                 {recommendOption}
                            </Select>
                           <Button onClick = {this.showRecommendProblem}><Link to="/ViewQuestion">Show</Link></Button>
                           </div>
                          { Data[this.props.exampleIndex].fields.solutions }
                          </div>
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
            Data:state.question.questionData,
            // questionData:state.question.questionData
            exampleIndex:state.question.exampleIndex,
            index:state.question.index
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

