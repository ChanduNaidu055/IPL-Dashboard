import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getMatchItemData()
  }

  getMatchItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.convertToCamelCase(data.latest_match_details),
      recentMatches: data.recent_matches.map(this.convertToCamelCase),
    }

    this.setState({teamData: updatedData, isLoading: false})
  }

  convertToCamelCase = match => ({
    umpires: match.umpires,
    result: match.result,
    manOfTheMatch: match.man_of_the_match,
    id: match.id,
    date: match.date,
    venue: match.venue,
    competingTeam: match.competing_team,
    competingTeamLogo: match.competing_team_logo,
    firstInnings: match.first_innings,
    secondInnings: match.second_innings,
    matchStatus: match.match_status,
  })

  renderTeamItemDetails = () => {
    const {teamData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamData
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className={`team-match-bg-container ${id.toLowerCase()}`}>
        <div className="team-banner-container">
          <img src={teamBannerUrl} alt="team banner" className="banner-img" />
        </div>
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        <ul className="recent-matches-list">
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? (
      <div data-testid="loader" className="loader-container">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      this.renderTeamItemDetails()
    )
  }
}

export default TeamMatches
