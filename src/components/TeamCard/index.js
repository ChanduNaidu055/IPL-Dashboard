import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

class TeamCard extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getMatchesData()
  }

  getMatchesData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(eachMatch => ({
      name: eachMatch.name,
      id: eachMatch.id,
      teamImageUrl: eachMatch.team_image_url,
    }))
    this.setState({teamsList: updatedData, isLoading: false})
  }

  render() {
    const {teamsList, isLoading} = this.state
    return isLoading ? (
      <div data-testid="loader" className="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
      </div>
    ) : (
      <ul className="team-card-container">
        {teamsList.map(team => (
          <li key={team.id}>
            <Link to={`/team-matches/${team.id}`} className="team-link">
              <div className="team-cards">
                <img
                  src={team.teamImageUrl}
                  alt={`${team.name}`}
                  className="team-logo-img"
                />
                <p className="logo-name">{team.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}

export default TeamCard
