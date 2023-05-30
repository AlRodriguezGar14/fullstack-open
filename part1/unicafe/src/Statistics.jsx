export const Statistics = (props) => {
    console.log(props.totalPositives)
    if (props.totalVotes > 0) {
        return (
            <div>
            <ul>
            <li>
              <StatisticLine text="Good" statistic={props.good}/>
            </li>
            <li>
              <StatisticLine text="Neutral" statistic={props.neutral}/>
            </li>
            <li>
              <StatisticLine text="Bad" statistic={props.bad}/>
            </li>
            </ul>
              <StatisticLine text="Average" statistic={props.average.toFixed(2)}/>
              <StatisticLine text="Positive votes" statistic={props.totalPositives.toFixed(2)}/>
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


const StatisticLine = (props) => {
    return (
        <>
          <p>{props.text}: {props.statistic}</p>
        </>
    )
}




