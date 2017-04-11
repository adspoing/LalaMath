// require('../index.less');

import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './Header.js';
import SideBar from './SideBar.js';
import Question from './Question.js';
import MyFooter from './MyFooter.js';


// import "../index.css"

import {submitquestion, prevquestion, nextquestion, playmodule, randomplay} from '../actions/actions.js'


class ViewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ViewQuestion';
        MathJax.Hub.Config({
          showProcessingMessages: false,
          tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] }
        });
    }
    _clickSubmitQuestion = () =>{
        this.props.actions.submitquestion();
    }
    _clickNextQuestion = () =>{
        this.props.actions.nextquestion();
    }
    _clickPrevQuestion = () =>{
        this.props.actions.prevquestion();
    }

    render() {
        return (
            <div>
                <div className="allWrapper">
                <Header />
                <SideBar />
                <Question clickSubmitQuestion={this._clickSubmitQuestion}
                            clickNextQuestion={this._clickNextQuestion}
                            clickPrevQuestion={this._clickPrevQuestion}
                            questionIndex={this.props.index}
                            MathJax={MathJax}/>
                </div>
            </div>
        )
    }
}
function mapStateToProps (state){
    return { 
            index:state.question.index
        }
}

function mapDispatchToProps (dispatch){
    return{
        actions: bindActionCreators({
            submitquestion,
            prevquestion,
            nextquestion,
            playmodule,
            randomplay
        },dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewQuestion);
