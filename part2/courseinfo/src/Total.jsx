export const Total = (props) => (

    <p>Number of exercises: {props.exercises.reduce((accumulator, current) => accumulator + current.exercises, 0)}</p>
)
