import React from 'react'
import { styles } from 'refire-app'

 class NewsImage extends React.Component {
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
        if(this.state.articles.articles) {
        return (
            <div>
               <img src={this.state.articles.articles[0].urlToImage} style={css}/>
            </div>
        )
        } else return ( <div>Loading..</div> )
            
  }
}

const css = {
    width: "100%",
}

export default styles(css, NewsImage)
