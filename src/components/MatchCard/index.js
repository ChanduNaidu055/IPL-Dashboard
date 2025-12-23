import './index.css'

const MatchCard = ({matchDetails}) => {
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  return (
    <li className="match-card-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-card-img"
      />
      <p className="match-card-team">{competingTeam}</p>
      <p className="match-card-result">{result}</p>
      <p className={`match-card-status ${matchStatus.toLowerCase()}`}>
        {matchStatus}
      </p>
    </li>
  )
}

export default MatchCard
