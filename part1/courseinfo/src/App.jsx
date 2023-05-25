import {Header} from "./Header";
import {Content} from "./Content";
import {Total} from "./Total";

const App = () => {
  // const-definitions
const course = [
  { name: "Fundamentals of React", exercises: 10 },
  { name: "Using props to pass data", exercises: 7 },
  { name: "State of a component", exercises: 14 },
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
