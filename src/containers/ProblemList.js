import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification,Rate } from 'antd';
import Data from '../problem.js';
import AllData from '../data.js'
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio,Popconfirm,message} from 'antd';
import {changeindexbyid,prevproblem,nextproblem} from '../actions/actions.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../css/ProblemList.less';
const Option = Select.Option;
const RadioGroup = Radio.Group;

var selvalue;
var twinProblem;
var RecommendProblem;
class ProblemList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProblemList';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
          TeX: { extensions: ["color.js"] }
        });
        this.state = {
             index: this.props.problemIndex,
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
        if(Data[this.props.problemIndex].fields.answer==this.state.selvalue){
            var config={};
            config.description=Data[this.props.problemIndex].fields.messagesuccess;
            config.message="Right";
            config.duration=10;
            notification.success(config);
        }
        else
        {
            var config={};
            config.description=Data[this.props.problemIndex].fields.messagefailure;
            config.message="Wrong";
            config.duration=10;
            notification.error(config);
        }
        this.setState({ showResults: true });
    }
    nextQuestion = () =>{
        this.props.actions.nextproblem();
        this.setState({ showResults: false,showAns: false, value: 0, selvalue: 0});
    }
    prevQuestion = () =>{
        this.props.actions.prevproblem();
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
        // console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
          selvalue: e.target.value
        });
        // selvalue=e.target.value;
      }
      showQuestion =(e)=>{
        // console.log(e.target.value);
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
        if(Data[this.props.problemIndex].fields.choicesa!=null){
            choiceA+=Data[this.props.problemIndex].fields.choicesa;
        }
        const radioStyle = {
          height: '30px',
          lineHeight: '30px',
        };
        if(Data[this.props.problemIndex].fields.choicesb!=null){
            choiceB+=Data[this.props.problemIndex].fields.choicesb;
        }if(Data[this.props.problemIndex].fields.choicesc!=null){
            choiceC+=Data[this.props.problemIndex].fields.choicesc;
        }if(Data[this.props.problemIndex].fields.choicesd!=null){
            choiceD+=Data[this.props.problemIndex].fields.choicesd;
        }if(Data[this.props.problemIndex].fields.choicese!=null){
            choiceE+=Data[this.props.problemIndex].fields.choicese;
        }if(Data[this.props.problemIndex].fields.choicesf!=null){
            choiceF+=Data[this.props.problemIndex].fields.choicesf;
        }
        let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];

        var twinOption=[];
        for(var i=0;i<Data[this.props.problemIndex].fields.twinproblems.length;i++){
            var indexx=Data[this.props.problemIndex].fields.twinproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            twinOption.push(<Option key={iddd+""} value={Data[this.props.problemIndex].fields.twinproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
        }
        var recommendOption=[];
        if(Data[this.props.problemIndex].fields.answer==this.state.selvalue){
            for(var i=0;i<Data[this.props.problemIndex].fields.rightproblems.length;i++){
            var indexx=Data[this.props.problemIndex].fields.rightproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            recommendOption.push(<Option key={iddd+""} value={Data[this.props.problemIndex].fields.rightproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
            }
        }
        else{
            for(var i=0;i<Data[this.props.problemIndex].fields.wrongproblems.length;i++){
            var indexx=Data[this.props.problemIndex].fields.wrongproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            recommendOption.push(<Option key={iddd+""} value={Data[this.props.problemIndex].fields.wrongproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
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
                        <Breadcrumb.Item href=""> <Link to="/Problem">
                          <Icon type="book" />
                          <span>Problem List</span></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {questype[Data[this.props.problemIndex].fields.category]}
                            {Data[this.props.problemIndex].fields.code}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button><Link to="/problem">Quit</Link></Button>
                                <Button type="prev" className="prevQuestion" onClick = {this.prevQuestion}>Prev</Button>
                                <Button type="next" className="nextQuestion" onClick = {this.nextQuestion}>Next</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <div id="output" className="questionstem">{
                          Data[this.props.problemIndex].fields.problem.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}
                         {Data[this.props.problemIndex].fields.problempicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture1}/>}
                         {Data[this.props.problemIndex].fields.problempicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture2}/>}
                         {Data[this.props.problemIndex].fields.problempicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture3}/>}
                         {Data[this.props.problemIndex].fields.problempicture4==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture4}/>}
                         {Data[this.props.problemIndex].fields.problempicture5==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture5}/>}
                         {Data[this.props.problemIndex].fields.problempicture6==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.problempicture6}/>}
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
                          { this.state.showAns?Data[this.props.problemIndex].fields.solutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }): null }
                         {this.state.showAns?Data[this.props.problemIndex].fields.solutionspicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.solutionspicture1}/>:null}
                         {this.state.showAns?Data[this.props.problemIndex].fields.solutionspicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.solutionspicture2}/>:null}
                         {this.state.showAns?Data[this.props.problemIndex].fields.solutionspicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.problemIndex].fields.solutionspicture3}/>:null}
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
            problemIndex:state.question.problemIndex,
            index:state.question.index
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            changeindexbyid,
            prevproblem,
            nextproblem
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProblemList);

