import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend} from 'recharts'
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

  getMatchStats = recentMatches => {
    let won = 0
    let lost = 0
    let drawn = 0

    recentMatches.forEach(match => {
      if (match.matchStatus === 'Won') {
        won += 1
      } else if (match.matchStatus === 'Lost') {
        lost += 1
      } else {
        drawn += 1
      }
    })

    return [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Drawn', value: drawn},
    ]
  }

  renderTeamItemDetails = () => {
    const {teamData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamData
    const {match} = this.props
    const {params} = match
    const {id} = params

    const statsData = this.getMatchStats(recentMatches)
    const COLORS = ['#28a745', '#dc3545', '#ffc107']

    return (
      <div className={`team-match-bg-container ${id.toLowerCase()}`}>
        <div className="team-banner-container">
          <img src={teamBannerUrl} alt="team banner" className="banner-img" />
        </div>

        <Link to="/">
          <button type="button" className="back-button">
            Back
          </button>
        </Link>

        <LatestMatch latestMatchDetails={latestMatchDetails} />

        <div className="pie-chart-container">
          <h1 className="pie-chart-heading">Match Statistics</h1>
          <PieChart width={300} height={300}>
            <Pie
              data={statsData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
            >
              {statsData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

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
