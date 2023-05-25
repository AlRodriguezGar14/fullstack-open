export const Content = (props) => {

    
    return (
        props.course.map(each => (
            <div>
            <p>{each.name}: {each.exercises}</p>
            </div>
        ))
    )
}
