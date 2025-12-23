import {Component} from 'react'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-ipl-bg-container">
        <div className="ipl-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        <TeamCard />
      </div>
    )
  }
}

export default Home
