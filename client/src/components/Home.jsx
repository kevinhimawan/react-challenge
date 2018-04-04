import React, { Component } from 'react';
import axios from 'axios'
import Search from './Search.jsx'
import {Link} from 'react-router-dom'
import logo from '../logo.svg';
import Category from './Category.jsx'

export default class Home extends Component {
  constructor () {
    super ()
    this.state = {
      data: [],
      pages: [],
      currentpages: 0,
      start: 0,
      max: 5
    }
  }

  refined = (data) => {
    let start = this.state.start
    const dataRefined = data.articles.filter((article, i) => {
      let split = article.publishedAt.split('-')
      let end = split[2].split('T')
      article['publishDate'] = `${split[0]}/${split[1]}/${end[0]}`
      if (start < this.state.max && i === start) {
        start++
        return article
      }
    })
    let pages = []
    for (let i = 1; i <= Math.ceil(data.articles.length / 5); i++) {
      pages.push(i)
    }
    this.setState({
      data: dataRefined,
      pages: pages
    })
  }

  getNews = () => {
    let url = `https://newsapi.org/v2/top-headlines?category=general&country=us&apiKey=dee035a49bd44ca384069a7dabb85f9a`
    axios.get(url).then(response => {
      this.refined(response.data)
    })
  }

  selectCategory = (value) => {
    let url = `https://newsapi.org/v2/top-headlines?category=${value}&country=us&apiKey=dee035a49bd44ca384069a7dabb85f9a`
    axios.get(url).then(response => {
      this.refined(response.data)
    })
  }

  searchInput = (value) => {
    let url = `https://newsapi.org/v2/everything?q=${value}&language=en&apiKey=dee035a49bd44ca384069a7dabb85f9a`
    axios.get(url).then(response => {
      console.log(response)
      this.refined(response.data)
    })
  }

  prev = () => {
    if (this.state.currentpages > 0) {
      this.setState({
        currentpages: this.state.currentpages - 1,
        start: this.state.start - 5,
        max: this.state.max - 5
      })
      this.getNews()
    }
  }

  next = () => {
    if (this.state.currentpages < this.state.pages[this.state.pages.length - 1]) {
      this.setState({
        currentpages : this.state.currentpages + 1,
        start: this.state.start + 5,
        max: this.state.max + 5
      })
      this.getNews()
    }
  }

  change = (page) => {
    this.setState({
      currentpages: page,
      start: page * 5,
      max: (page * 5) + 5
    })

    this.getNews()
  }

  componentWillMount () {
    let url = this.props.match.url.split('/')
    let urlInitiate = url [1]
    let query = url[2]
    console.log(url)
    if (urlInitiate === 'category') {
      this.selectCategory(query)
    } else if (urlInitiate === 'search') {
      this.searchInput(query)
    } else {
      this.getNews() 
    }
  }

  render() {
    return (
      <div className="content col-lg-8">
      <Category
        selectCategory = {this.selectCategory}></Category>
        <Search
        search = {this.searchInput}></Search>
        <div className="news-content">
          {
            this.state.data.length > 0 ? this.state.data.map((news, i) => (
            <div key={i} className="card">
              <h5 className="card-title">{news.title}</h5>
              <div className="news-info text-muted">
                <div className="author">
                  <span className="news-info-font">By {news.author}</span>
                </div>
                <div className="update">
                  <span className="news-info-font">Published At {news.publishDate}</span>
                </div>
              </div>
              <img className="card-img-top" src={news.urlToImage} alt=""/>
              <div className="card-body">
                <p className="card-text">{news.description}</p>
              </div>
            </div>
          )) :<div className="wating">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Waitt</h1>
              </div>
          }
          <nav>
            <ul className="pagination">
              <li className="page-item"><a className="page-link" onClick={this.prev}>Previous</a></li>
              {
                this.state.pages.map((page, i) => (
                  <li className="page-item" key={i}><a className="page-link" onClick={() => this.change(i)}>{i}</a></li>
                ))
              }
              <li className="page-item"><a className="page-link" onClick={this.next}>Next</a></li>
            </ul>
          </nav>
        </div>
        
      </div>
    )
  }
};
