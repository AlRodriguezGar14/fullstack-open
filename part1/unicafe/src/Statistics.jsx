export const Statistics = (props) => {
    console.log(props.totalPositives)
    if (props.totalVotes > 0) {
        return (
            <div>
            <ul>
              <li>good {props.good}</li>
              <li>neutral {props.neutral}</li>
              <li>bad {props.bad}</li>
              <li>all {props.totalVotes}</li>
            </ul>
            <p>Average {props.average.toFixed(2)}</p>
            <p>Positive votes {props.totalPositives.toFixed(2)}%</p>
            </div>
        )
    } else {
        return (
            <div>
              <p>No feedback given</p>
            </div>
        )
    }
}




