export const Total = ({course}) => (

    <p>Number of exercises: {course.parts.reduce((accumulator, current) => accumulator + current.exercises, 0)}</p>
)
