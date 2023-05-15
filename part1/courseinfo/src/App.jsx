import {Header} from "./Header";
import {Content} from "./Content";
import {Total} from "./Total";

const App = () => {
  // const-definitions
const course = [
  { part: "Fundamentals of React", exercises: 10 },
  { part: "Using props to pass data", exercises: 7 },
  { part: "State of a component", exercises: 14 },
];


  return (
    <div>
      <Header />
      <Content course={course} />
      <Total exercises={course}/>
    </div>
  )
}

export default App
