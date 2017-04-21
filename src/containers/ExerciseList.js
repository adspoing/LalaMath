import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification } from 'antd';
import Data from '../exercise.js';
import AllData from '../data.js'
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio } from 'antd';
import {changeindexbyid,prevexercise,nextexercise} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Option = Select.Option;
const RadioGroup = Radio.Group;

var selvalue;
var twinProblem;
var RecommendProblem;
class ExerciseList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ExerciseList';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
          TeX: { extensions: ["color.js"] }
        });
        this.state = {
             index: this.props.exerciseIndex,
             mathjax: MathJax,
             showResults: false,
             showAns: false,
             value: 0,
             selvalue: 0
        }
    }
    handleChange(value){
        // console.log(`selected ${value}`);
        // selvalue=value;
        this.setState({ selvalue: value });
        // console.log(selvalue);
    }   
    submitQuestion = () =>{
        // this.props.clickSubmitQuestion();
        if(Data[this.props.exerciseIndex].fields.answer==this.state.selvalue){
            var config={};
            config.description=Data[this.props.exerciseIndex].fields.messagesuccess;
            config.message="Right";
            config.duration=10;
            notification.success(config);
        }
        else
        {
            var config={};
            config.description=Data[this.props.exerciseIndex].fields.messagefailure;
            config.message="Wrong";
            config.duration=10;
            notification.error(config);
        }
        this.setState({ showResults: true });
    }
    nextQuestion = () =>{
        this.props.actions.nextexercise();
        this.setState({ showResults: false,showAns: false, value: 0, selvalue: 0});
    }
    prevQuestion = () =>{
        this.props.actions.prevexercise();
        this.setState({ showResults: false,showAns: false,value: 0, selvalue: 0});
    }
    componentDidMount = () =>{   
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"output");
    }
    componentDidUpdate = () =>{
        this.state.mathjax.Hub.Queue(["Typeset",this.state.mathjax.Hub],"output");
    }
    showAns = () =>{
        this.setState({ showAns: true});
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
          selvalue: e.target.value
        });
        // selvalue=e.target.value;
      }
      showQuestion =(e)=>{
        console.log(e.target.value);
      }
      twinProblemChange = (value) =>{
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        twinProblem=pkIndex[value];
        // twinProblem=value;
      }
      RecommendProblemChange = (value) =>{
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        RecommendProblem=pkIndex[value];
        // RecommendProblem=value;
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
        // console.log(Data)
        // console.log(this.props.exerciseIndex)
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        var choiceA="";
        var choiceB="";
        var choiceC="";
        var choiceD="";
        var choiceE="";
        var choiceF="";
        var result="";
        if(Data[this.props.exerciseIndex].fields.choicesa!=null){
            choiceA+=Data[this.props.exerciseIndex].fields.choicesa;
        }
        const radioStyle = {
          height: '30px',
          lineHeight: '30px',
        };
        if(Data[this.props.exerciseIndex].fields.choicesb!=null){
            choiceB+=Data[this.props.exerciseIndex].fields.choicesb;
        }if(Data[this.props.exerciseIndex].fields.choicesc!=null){
            choiceC+=Data[this.props.exerciseIndex].fields.choicesc;
        }if(Data[this.props.exerciseIndex].fields.choicesd!=null){
            choiceD+=Data[this.props.exerciseIndex].fields.choicesd;
        }if(Data[this.props.exerciseIndex].fields.choicese!=null){
            choiceE+=Data[this.props.exerciseIndex].fields.choicese;
        }if(Data[this.props.exerciseIndex].fields.choicesf!=null){
            choiceF+=Data[this.props.exerciseIndex].fields.choicesf;
        }
        let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];
        // if(Data[this.props.exerciseIndex].fields.category==1)
        //     questype="Example  ";
        // if(Data[this.props.exerciseIndex].fields.category==2)
        //     questype="Exercise  ";
        // if(Data[this.props.exerciseIndex].fields.category==3)
        //     questype="Problem  ";
        // if(Data[this.props.exerciseIndex].fields.category==4)
        //     questype="DIY  ";
        // if(Data[this.props.exerciseIndex].fields.category==5)
        //     questype="Quiz  ";
        var twinOption=[];
        // var defaultOption;
        // defaultOption=Data[this.props.exerciseIndex].fields.twinproblems[0];
        for(var i=0;i<Data[this.props.exerciseIndex].fields.twinproblems.length;i++){
            var indexx=Data[this.props.exerciseIndex].fields.twinproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            twinOption.push(<Option key={iddd+""} value={Data[this.props.exerciseIndex].fields.twinproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
        }
        var recommendOption=[];
        if(Data[this.props.exerciseIndex].fields.answer==this.state.selvalue){
            for(var i=0;i<Data[this.props.exerciseIndex].fields.rightproblems.length;i++){
            var indexx=Data[this.props.exerciseIndex].fields.rightproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            recommendOption.push(<Option key={iddd+""} value={Data[this.props.exerciseIndex].fields.rightproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
            }
        }
        else{
            for(var i=0;i<Data[this.props.exerciseIndex].fields.wrongproblems.length;i++){
            var indexx=Data[this.props.exerciseIndex].fields.wrongproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            recommendOption.push(<Option key={iddd+""} value={Data[this.props.exerciseIndex].fields.wrongproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
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
                        <Breadcrumb.Item href=""> <Link to="/Exercise">
                          <Icon type="book" />
                          <span>Exercise List</span></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {questype[Data[this.props.exerciseIndex].fields.category]}
                            {Data[this.props.exerciseIndex].fields.code}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button><Link to="/Exercise">Quit</Link></Button>
                                <Button type="prev" className="prevQuestion" onClick = {this.prevQuestion}>Prev</Button>
                                <Button type="next" className="nextQuestion" onClick = {this.nextQuestion}>Next</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <div id="output" className="questionstem">{Data[this.props.exerciseIndex].fields.problem.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div>
                        <div className="questionchoice">
                         <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <div>{choiceA==""?"":<div><Radio style={radioStyle} value={"A"}>{choiceA.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</Radio></div>}</div>
                            <div>{choiceB==""?"":<div><Radio style={radioStyle} value={"B"}>{choiceB.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</Radio></div>}</div>
                            <div>{choiceC==""?"":<div><Radio style={radioStyle} value={"C"}>{choiceC.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</Radio></div>}</div>
                            <div>{choiceD==""?"":<div><Radio style={radioStyle} value={"D"}>{choiceD.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</Radio></div>}</div>
                            <div>{choiceE==""?"":<div><Radio style={radioStyle} value={"E"}>{choiceE.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</Radio></div>}</div>
                            <div>{choiceF==""?"":<div><Radio style={radioStyle} value={"F"}>{choiceF.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</Radio></div>}</div>
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
                          { this.state.showAns?Data[this.props.exerciseIndex].fields.solutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }): null }
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
            exerciseIndex:state.question.exerciseIndex,
            index:state.question.index
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
            prevexercise,
            nextexercise
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);

