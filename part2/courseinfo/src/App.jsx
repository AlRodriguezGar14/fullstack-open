import {Header} from "./Header";
import {Content} from "./Content";
import {Total} from "./Total";

const App = () => {
  // const-definitions
const courseList = [
  { name: "Fundamentals of React", exercises: 10, id: 1 },
  { name: "Using props to pass data", exercises: 7, id: 2 },
  { name: "State of a component", exercises: 14, id: 3 },
];



  return (
    <div>
      <Header />
      {courseList.map(course =>
          <Content key={course.id} course={course} />
      )}
      <Total exercises={courseList}/>
    </div>
  )
}

export default App
