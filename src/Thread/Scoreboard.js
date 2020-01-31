import React from 'react'
import { styles } from 'refire-app'

 class Scoreboard extends React.Component {
    constructor() {
        super()
        this.state = {
            articles: [],
        }
    }

    componentDidMount() {
      fetch('https://newsapi.org/v2/top-headlines?' +
      'country=us&' +
      'apiKey=62433ab3eda848a4ab757d4fecd35ec1')
      .then(res => res.json())
      .then((data) => {
        this.setState({ articles: data })
        console.log(this.state.articles)
      })
      .catch(console.log)
    }
    render() {
        return (
            <div style={css}>
               <h1>Scoreboard</h1>
            </div>
        )
            
  }
}

const css = {
    width: "100%",
    textAlign: "center",
}

export default styles(css, Scoreboard)
