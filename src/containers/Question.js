import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification } from 'antd';
import Data from '../data.js';
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio } from 'antd';
import {changeindexbyid} from '../actions/actions.js'
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
        this.state = {
             index: this.props.questionIndex,
             mathjax: this.props.mathjax,
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
    submitQuestion = () =>{
        this.props.clickSubmitQuestion();
        if(Data[this.props.questionIndex].fields.answer==selvalue){
            var config={};
            config.description=Data[this.props.questionIndex].fields.messagesuccess;
            config.message="success";
            config.duration=0;
            notification.success(config);
        }
        else
        {
            var config={};
            config.description=Data[this.props.questionIndex].fields.messagefailure;
            config.message="error";
            config.duration=0;
            notification.error(config);
        }
        this.setState({ showResults: true });
    }
    nextQuestion = () =>{
        this.props.clickNextQuestion();
        this.setState({ showResults: false,showAns: false, value: 0});
    }
    prevQuestion = () =>{
        this.props.clickPrevQuestion();
        this.setState({ showResults: false,showAns: false,value: 0});
    }
    componentDidMount = () =>{   
        this.props.MathJax.Hub.Queue(["Typeset",this.props.MathJax.Hub],"output");
    }
    componentDidUpdate = () =>{
        this.props.MathJax.Hub.Queue(["Typeset",this.props.MathJax.Hub],"output");
    }
    showAns = () =>{
        this.setState({ showAns: true});
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
        selvalue=e.target.value;
      }
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
        console.log(Data)
        console.log(this.props.questionIndex)
        var choiceA="";
        var choiceB="";
        var choiceC="";
        var choiceD="";
        var choiceE="";
        var choiceF="";
        var result="";
        if(Data[this.props.questionIndex].fields.choicesa!=null){
            choiceA+=Data[this.props.questionIndex].fields.choicesa;
        }
        const radioStyle = {
          height: '30px',
          lineHeight: '30px',
        };
        if(Data[this.props.questionIndex].fields.choicesb!=null){
            choiceB+=Data[this.props.questionIndex].fields.choicesb;
        }if(Data[this.props.questionIndex].fields.choicesc!=null){
            choiceC+=Data[this.props.questionIndex].fields.choicesc;
        }if(Data[this.props.questionIndex].fields.choicesd!=null){
            choiceD+=Data[this.props.questionIndex].fields.choicesd;
        }if(Data[this.props.questionIndex].fields.choicese!=null){
            choiceE+=Data[this.props.questionIndex].fields.choicese;
        }if(Data[this.props.questionIndex].fields.choicesf!=null){
            choiceF+=Data[this.props.questionIndex].fields.choicesf;
        }
        let questype;
        if(Data[this.props.questionIndex].fields.category==1)
            questype="Example  ";
        if(Data[this.props.questionIndex].fields.category==2)
            questype="Exercise  ";
        if(Data[this.props.questionIndex].fields.category==3)
            questype="Problem  ";
        if(Data[this.props.questionIndex].fields.category==4)
            questype="DIY  ";
        if(Data[this.props.questionIndex].fields.category==5)
            questype="Quiz  ";
        var twinOption=[];
        // var defaultOption;
        // defaultOption=Data[this.props.questionIndex].fields.twinproblems[0];
        for(var i=0;i<Data[this.props.questionIndex].fields.twinproblems.length;i++){
            var indexx=Data[this.props.questionIndex].fields.twinproblems[i];
            var iddd=Data[indexx].fields.code;
            twinOption.push(<Option key={iddd+""} value={Data[this.props.questionIndex].fields.twinproblems[i]}>{iddd.toString()}</Option>)
        }
        var recommendOption=[];
        if(Data[this.props.questionIndex].fields.answer==selvalue){
            for(var i=0;i<Data[this.props.questionIndex].fields.rightproblems.length;i++){
            var indexx=Data[this.props.questionIndex].fields.rightproblems[i];
            var iddd=Data[indexx].fields.code;
            recommendOption.push(<Option key={iddd+""} value={Data[this.props.questionIndex].fields.rightproblems[i]}>{iddd.toString()}</Option>)
            }
        }
        else{
            for(var i=0;i<Data[this.props.questionIndex].fields.wrongproblems.length;i++){
            var indexx=Data[this.props.questionIndex].fields.wrongproblems[i];
            var iddd=Data[indexx].fields.code;
            recommendOption.push(<Option key={iddd+""} value={Data[this.props.questionIndex].fields.wrongproblems[i]}>{iddd.toString()}</Option>)
            }
        }

        return (
        	<div>
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
                            {Data[this.props.questionIndex].fields.code}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button><Link to="/Dashboard">Quit</Link></Button>
                                <Button type="prev" className="prevQuestion" onClick = {this.prevQuestion}>Prev</Button>
                                <Button type="next" className="nextQuestion" onClick = {this.nextQuestion}>Next</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <div id="output" className="questionstem">{Data[this.props.questionIndex].fields.problem}</div>
                        <div className="questionchoice">
                         <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <div>{choiceA==""?"":<div><Radio style={radioStyle} value={"A"}>{choiceA}</Radio></div>}</div>
                            <div>{choiceB==""?"":<div><Radio style={radioStyle} value={"B"}>{choiceB}</Radio></div>}</div>
                            <div>{choiceC==""?"":<div><Radio style={radioStyle} value={"C"}>{choiceC}</Radio></div>}</div>
                            <div>{choiceD==""?"":<div><Radio style={radioStyle} value={"D"}>{choiceD}</Radio></div>}</div>
                            <div>{choiceE==""?"":<div><Radio style={radioStyle} value={"E"}>{choiceE}</Radio></div>}</div>
                            <div>{choiceF==""?"":<div><Radio style={radioStyle} value={"F"}>{choiceF}</Radio></div>}</div>
                          </RadioGroup>
                        </div>
                        <div className="questionanswer">
                          <div className="questionbutton">
                                <Button className="submitQuestion" type="submit" onClick = {this.submitQuestion}>Submit</Button>
                          </div>
                          <div className="questionbutton">{ this.state.showResults?<Button className="submitQuestion" onClick = {this.showAns}>Show Result</Button>: null }</div>
                          <div className="questionresult">
                          { this.state.showAns?<div>Twin problems: </div>: null }
                          <div>{ this.state.showAns?
                             <Select
                                style={{ width: 120 }}
                                // defaultValue={twinOption[0]}
                                placeholder="Select a twin problem"
                                optionFilterProp="children"
                                onChange={this.twinProblemChange}
                                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                 
                                 {twinOption}
                              </Select>:null}
                           { this.state.showAns?<Button onClick = {this.showTwinProblem}><Link to="/ViewQuestion">Show</Link></Button>: null }
                           </div>
                            { this.state.showAns?<div>Recommend problems: </div>: null }
                           <div>{ this.state.showAns?
                             <Select
                                style={{ width: 120 }}
                                // defaultValue={twinOption[0]}
                                placeholder="Select a Recommend problem"
                                optionFilterProp="children"
                                onChange={this.RecommendProblemChange}
                                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                 
                                 {recommendOption}
                              </Select>:null}
                           { this.state.showAns?<Button onClick = {this.showRecommendProblem}><Link to="/ViewQuestion">Show</Link></Button>: null }
                           </div>
                          { this.state.showAns?Data[this.props.questionIndex].fields.solutions: null }
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
            index:state.question.index
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Question);

