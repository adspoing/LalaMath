import React from 'react' // 引入react
import { Route, IndexRoute } from 'react-router' // 引入react路由
import { Home, App, Player, Question, QuestionList, Select, SideBar,Header,rightAns,Chart,Dashboard,ViewQuestion,Syllabus,Example,LectureNotes,ExampleList,Exercise,ExerciseList,Problem,ProblemList
,Diy,DiyList} from './containers' // 引入各容器组件

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path="index" component={Dashboard}/>
        <Route path="QuestionList" component={QuestionList}/>
        <Route path="Home" component={Dashboard}/>
        <Route path="rightAns" component={rightAns}/>
        <Route path="Questions" component={Player}/>
        <Route path="Chart" component={Chart}/>
        <Route path="Dashboard" component={Dashboard}/>
        <Route path="ViewQuestion" component={ViewQuestion}/>
        <Route path="Syllabus" component={Syllabus}/>
        <Route path="Example" component={Example}/>
        <Route path="LectureNotes" component={LectureNotes}/>
        <Route path="ExampleList" component={ExampleList}/>
        <Route path="Exercise" component={Exercise}/>
        <Route path="ExerciseList" component={ExerciseList}/>
        <Route path="Problem" component={Problem}/>
        <Route path="ProblemList" component={ProblemList}/>
        <Route path="Diy" component={Diy}/>
        <Route path="DiyList" component={DiyList}/>
    </Route>
)