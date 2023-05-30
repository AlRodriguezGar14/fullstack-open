export const FeedbackButtons = (props) => {
    return (
        <div>
          <button onClick={props.handle}>{props.text}</button>
        </div>
    )
}


