import {Header} from "./Header";
import {Content} from "./Content";
import {Total} from "./Total";

const App = () => {
  // const-definitions
// const courseList = [
//   { name: "Fundamentals of React", exercises: 10, id: 1 },
//   { name: "Using props to pass data", exercises: 7, id: 2 },
//   { name: "State of a component", exercises: 14, id: 3 },
// ];

const courseList = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <Header />
      {courseList.map(course => (
          <div key={`course-content${course.id}`}>
          <Content course={course} />
          <Total course={course}/>
          </div>
      )
      )}
    </div>
  )
}

export default App
