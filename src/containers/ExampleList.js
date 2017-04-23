import React from 'react';
import {Select, Breadcrumb, Menu, Dropdown, Icon, notification } from 'antd';
import Data from '../example.js';
import AllData from '../data.js';
import mySelect from './Select.js';
import { Link } from 'react-router' // 引入Link处理导航跳转
import { Button,Radio,Popconfirm,message,Rate} from 'antd';
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
             value: 0,
             // pkIndex:[]
        }
    }
    handleChange(value){
        console.log(`selected ${value}`);
        selvalue=value;
        console.log(selvalue);
    }   
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
        // console.log(e.target.value);
      }
      twinProblemChange = (value) =>{
        // console.log(value);
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        twinProblem=pkIndex[value];
      }
      RecommendProblemChange = (value) =>{
        var pkIndex=[];
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
        var pkIndex=[];
        for(var i=0;i<AllData.length;i++){
          pkIndex[AllData[i].pk]=i;
        }
        let questype=[" ","Example ","Exercise ","Problem ","DIY ","Quiz "];
        // if(Data[this.props.exampleIndex].fields.category==1)
        //     questype="Example  ";
        // if(Data[this.props.exampleIndex].fields.category==2)
        //     questype="Exercise  ";
        // if(Data[this.props.exampleIndex].fields.category==3)
        //     questype="Problem  ";
        // if(Data[this.props.exampleIndex].fields.category==4)
        //     questype="DIY  ";
        // if(Data[this.props.exampleIndex].fields.category==5)
        //     questype="Quiz  ";
        var twinOption=[];
        // var defaultOption;
        // defaultOption=Data[this.props.exampleIndex].fields.twinproblems[0];
        for(var i=0;i<Data[this.props.exampleIndex].fields.twinproblems.length;i++){
            var indexx=Data[this.props.exampleIndex].fields.twinproblems[i];
            var iddd=AllData[pkIndex[indexx]].fields.code;
            twinOption.push(<Option  key={iddd+""} value={Data[this.props.exampleIndex].fields.twinproblems[i]}>{questype[AllData[pkIndex[indexx]].fields.category]+iddd}</Option>)
        }
        var recommendOption=[];
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
                            {questype[Data[this.props.exampleIndex].fields.category]}
                            {Data[this.props.exampleIndex].fields.code}
                        </Breadcrumb.Item>
                        </Breadcrumb>
                          <div className="pannel">
                                <Button><Link to="/ExampleForm">Quit</Link></Button>
                                <Button type="prev" className="prevQuestion" onClick = {this.prevQuestion}>Prev</Button>
                                <Button type="next" className="nextQuestion" onClick = {this.nextQuestion}>Next</Button>
                          </div>
                      </div>
                      <div className="questionCanvas">
                        <div id="output" className="questionstem">{Data[this.props.exampleIndex].fields.problem.split("<br>").map(i => {
                           return <div>{i}</div>;
                          })}
                         {Data[this.props.exampleIndex].fields.problempicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture1}/>}
                         {Data[this.props.exampleIndex].fields.problempicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture2}/>}
                         {Data[this.props.exampleIndex].fields.problempicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture3}/>}
                         {Data[this.props.exampleIndex].fields.problempicture4==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture4}/>}
                         {Data[this.props.exampleIndex].fields.problempicture5==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture5}/>}
                         {Data[this.props.exampleIndex].fields.problempicture6==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.problempicture6}/>}
                        </div>
                        <div className="questionanswer">
                          <div className="questionresult">
                          { Data[this.props.exampleIndex].fields.solutions.split("<br>").map(i => {
                           return <div>{i}</div>;
                          }) }
                         {Data[this.props.exampleIndex].fields.solutionspicture1==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.solutionspicture1}/>}
                         {Data[this.props.exampleIndex].fields.solutionspicture2==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.solutionspicture2}/>}
                         {Data[this.props.exampleIndex].fields.solutionspicture3==""?null:<img src={"http://lala.ust.hk:8000/"+Data[this.props.exampleIndex].fields.solutionspicture3}/>}
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

