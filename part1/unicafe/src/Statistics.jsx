export const Statistics = (props) => {
    console.log(props.totalPositives)
    if (props.totalVotes > 0) {
        return (
            <div>
              <StatisticLine text="Good" statistic={props.good}/>
              <StatisticLine text="Neutral" statistic={props.neutral}/>
              <StatisticLine text="Bad" statistic={props.bad}/>
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
        <table>
        <thead></thead>
        <tbody>
            <tr>
            <td>{props.text}</td>
            <td>{props.statistic}</td>
            </tr>
        </tbody>
        <tfoot></tfoot>
        </table>
        </>
    )
}




