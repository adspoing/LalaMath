import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification } from 'antd';
import Data from '../quiz.js';
import AllData from '../data.js'
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio,Popconfirm,message,Rate} from 'antd';
import {changeindexbyid,prevquiz,nextquiz} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Option = Select.Option;
const RadioGroup = Radio.Group;

var selvalue;
var twinProblem;
var RecommendProblem;
class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'QuizList';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
          TeX: { extensions: ["color.js"] }
        });
        this.state = {
             // index: this.props.quizIndex,
             mathjax: MathJax,
             showResults: false,
             showAns: false,
             value: 0,
             selvalue: 0
        }
    }
    handleChange(value){
        this.setState({ selvalue: value });
    }   
    submitQuestion = () =>{
        // this.props.clickSubmitQuestion();
        if(Data[this.props.quizIndex].fields.answer==this.state.selvalue){
            var config={};
            config.description=Data[this.props.quizIndex].fields.messagesuccess;
            config.message="Right";
            config.duration=10;
            notification.success(config);
        }
        else
        {
            var config={};
            config.description=Data[this.props.quizIndex].fields.messagefailure;
            config.message="Wrong";
            config.duration=10;
            notification.error(config);
        }
        this.setState({ showResults: true });
    }
    nextQuestion = () =>{
        this.props.actions.nextquiz();
        this.setState({ showResults: false,showAns: false, value: 0, selvalue: 0});
    }
    prevQuestion = () =>{
        this.props.actions.prevquiz();
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
          selvalue: e.target.value,
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
      submitcomment = () =>{
          message.success('Thanks for your comment');
      }

    render() {
        // let Data=this.props.Data;
        console.log(Data)
        // console.log(AllData)
        // console.log(this.props.quizIndex)
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        // console.log(pkIndex);
        var choiceA="";
        var choiceB="";
        var choiceC="";
        var choiceD="";
        var choiceE="";
        var choiceF="";
        var result="";
        if(Data[this.props.quizIndex].fields.choicesa!=null){
            choiceA+=Data[this.props.quizIndex].fields.choicesa;
        }
        const radioStyle = {
          height: '30px',
          lineHeight: '30px',
        };
        if(Data[this.props.quizIndex].fields.choicesb!=null){
            choiceB+=Data[this.props.quizIndex].fields.choicesb;
        }if(Data[this.props.quizIndex].fields.choicesc!=null){
            choiceC+=Data[this.props.quizIndex].fields.choicesc;
        }if(Data[this.props.quizIndex].fields.choicesd!=null){
            choiceD+=Data[this.props.quizIndex].fields.choicesd;
        }if(Data[this.props.quizIndex].fields.choicese!=null){
            choiceE+=Data[this.props.quizIndex].fields.choicese;
        }if(Data[this.props.quizIndex].fields.choicesf!=null){
            choiceF+=Data[this.props.quizIndex].fields.choicesf;
        }
        let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];
        var twinOption=[];
        for(var i=0;i<Data[this.props.quizIndex].fields.twinproblems.length;i++){
            var indexx=Data[this.props.quizIndex].fields.twinproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            twinOption.push(<Option key={iddd+""} value={Data[this.props.quizIndex].fields.twinproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
        }
        var recommendOption=[];
        if(Data[this.props.quizIndex].fields.answer==this.state.selvalue){
            for(var i=0;i<Data[this.props.quizIndex].fields.rightproblems.length;i++){
            var indexx=Data[this.props.quizIndex].fields.rightproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            recommendOption.push(<Option key={iddd+""} value={Data[this.props.quizIndex].fields.rightproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
            }
        }
        else{
            for(var i=0;i<Data[this.props.quizIndex].fields.wrongproblems.length;i++){
            var indexx=Data[this.props.quizIndex].fields.wrongproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            recommendOption.push(<Option key={iddd+""} value={Data[this.props.quizIndex].fields.wrongproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
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
                        <Breadcrumb.Item>
                            {questype[Data[this.props.quizIndex].fields.category]}
                            {Data[this.props.quizIndex].fields.code}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button><Link to="/Dashboard">Quit</Link></Button>
                                <Button type="prev" className="prevQuestion" onClick = {this.prevQuestion}>Prev</Button>
                                <Button type="next" className="nextQuestion" onClick = {this.nextQuestion}>Next</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <div id="output" className="questionstem">{Data[this.props.quizIndex].fields.problem.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}
                         {Data[this.props.quizIndex].fields.problempicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.problempicture1}/>}
                         {Data[this.props.quizIndex].fields.problempicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.problempicture2}/>}
                         {Data[this.props.quizIndex].fields.problempicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.problempicture3}/>}
                         {Data[this.props.quizIndex].fields.problempicture4==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.problempicture4}/>}
                         {Data[this.props.quizIndex].fields.problempicture5==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.problempicture5}/>}
                         {Data[this.props.quizIndex].fields.problempicture6==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture6}/>}
                        </div>
                        <div className="questionchoice">
                          <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <div>{choiceA==""?"":<div><Radio style={radioStyle} value={"A"}><div className="choicecontent">{choiceA.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                            <div>{choiceB==""?"":<div><Radio style={radioStyle} value={"B"}><div className="choicecontent">{choiceB.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                            <div>{choiceC==""?"":<div><Radio style={radioStyle} value={"C"}><div className="choicecontent">{choiceC.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                            <div>{choiceD==""?"":<div><Radio style={radioStyle} value={"D"}><div className="choicecontent">{choiceD.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                            <div>{choiceE==""?"":<div><Radio style={radioStyle} value={"E"}><div className="choicecontent">{choiceE.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                            <div>{choiceF==""?"":<div><Radio style={radioStyle} value={"F"}><div className="choicecontent">{choiceF.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}</div></Radio></div>}</div>
                          </RadioGroup>
                        </div>
                        <div className="questionanswer">
                        <div className="questionbutton">
                                {this.state.selvalue==0?
                                  <Button className="submitQuestion" type="submit" disabled>Submit</Button>:
                                    <Popconfirm placement="top" title={"Are you sure to submit?"} onConfirm={this.submitQuestion} okText="Yes" cancelText="No">
                                      <Button className="submitQuestion" type="submit">Submit</Button>
                                    </Popconfirm>
                                }
                          </div>
                          <div className="questionbutton">{ this.state.showResults?<Button className="submitQuestion" onClick = {this.showAns}>Show Result</Button>: null }</div>
                          <div className="questionresult">
    
                          { this.state.showAns?Data[this.props.quizIndex].fields.solutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }): null }
                         {this.state.showAns?Data[this.props.quizIndex].fields.solutionspicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.solutionspicture1}/>:null}
                         {this.state.showAns?Data[this.props.quizIndex].fields.solutionspicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.solutionspicture2}/>:null}
                         {this.state.showAns?Data[this.props.quizIndex].fields.solutionspicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.quizIndex].fields.solutionspicture3}/>:null}
                            <div>{ this.state.showAns?
                                   <Select
                                      style={{ width: 200 }}
                                      // defaultValue={twinOption[0]}
                                      placeholder="Select a twin problem"
                                      optionFilterProp="children"
                                      onChange={this.twinProblemChange}
                                      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                       
                                       {twinOption}
                                    </Select>:null}
                                 { this.state.showAns?<Button onClick = {this.showTwinProblem}><Link to="/ViewQuestion">Show</Link></Button>: null }
                                
                                 { this.state.showAns?
                                   <Select
                                      style={{ width: 200 }}
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
                            </div>
                            <div className="problemcomment"> { this.state.showAns?"Giving an comment on this problem":null}</div>
                             { this.state.showAns?<Rate />:null}
                             { this.state.showAns?<Button onClick = {this.submitcomment}>submit</Button>:null}
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
            quizIndex:state.question.quizIndex,
            index:state.question.index
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
            prevquiz,
            nextquiz
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);

