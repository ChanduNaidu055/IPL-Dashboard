import './index.css'

const LatestMatch = ({latestMatchDetails}) => {
  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchDetails

  return (
    <div className="latest-match-container">
      <p className="latest-match-heading">Latest Matches</p>
      <div className="latest-match-card">
        <div className="match-info">
          <p className="match-info-heading">{competingTeam}</p>
          <p className="match-info-items">{date}</p>
          <p className="match-info-items">{venue}</p>
          <p className="match-info-items">{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="latest-match-img"
        />
        <div className="match-innigs">
          <p className="match-innigs-items">{firstInnings}</p>
          <p className="match-innigs-items">{secondInnings}</p>
          <p className="match-innigs-items">{manOfTheMatch}</p>
          <p className="match-innigs-items">{umpires}</p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch
