export const Content = (props) => {

    
    return (
        props.course.map(each => (
            <div>
            <p>{each.part}:{each.exercises}</p>
            </div>
        ))
    )
}
