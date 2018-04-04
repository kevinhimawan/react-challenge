import React, { Component } from 'react';
import axios from 'axios'
import Search from './Search.jsx'
import {Link} from 'react-router-dom'
import logo from '../logo.svg';
import Category from './Category.jsx'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners';

import {insertData, changePage} from '../redux/action'

 class Home extends Component {

  refined = (data) => {
    let start = this.props.start
    const dataRefined = data.articles.filter((article, i) => {
      let split = article.publishedAt.split('-')
      let end = split[2].split('T')
      article['publishDate'] = `${split[0]}/${split[1]}/${end[0]}`
      if (start < this.props.max && i === start) {
        start++
        return article
      }
    })
    let pages = []
    for (let i = 1; i <= Math.ceil(data.articles.length / 5); i++) {
      pages.push(i)
    }
    this.props.newsFeed({dataRefined,pages})
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
      this.refined(response.data)
    })
  }

  prev = () => {
    if (this.props.currentpages > 0) {
      let obj = {
        currentpages: this.props.currentpages - 1,
        start: this.props.start - 5,
        max: this.props.max - 5
      }
      this.props.changePage(obj)
      this.getNews()
    }
  }

  next = () => {
    if (this.props.currentpages < this.props.pages[this.props.pages.length - 1]) {
      let obj = {
        currentpages : this.props.currentpages + 1,
        start: this.props.start + 5,
        max: this.props.max + 5
      }
      this.props.changePage(obj)
      this.getNews()
    }
  }

  change = (page) => {
    let obj = {
      currentpages: page,
      start: page * 5,
      max: (page * 5) + 5
    }
    this.props.changePage(obj)
    this.getNews()
  }

  componentWillMount () {
    let url = this.props.match.url.split('/')
    let urlInitiate = url [1]
    let query = url[2]
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
          { this.props.data &&
            this.props.data.length > 0 ? this.props.data.map((news, i) => (
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
          )) :<div className='sweet-loading'>
                <RingLoader
                  color={'#123abc'}
                />
              </div>
          }
          <nav>
            <ul className="pagination">
              <li className="page-item"><a className="page-link" onClick={this.prev}>Previous</a></li>
              {
                this.props.data &&
                this.props.pages.map((page, i) => (
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
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    pages: state.pages,
    currentpages: state.currentpages,
    start: state.start,
    max: state.max
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newsFeed: (payload) => {
      dispatch(insertData(payload))
    },
    changePage: (payload) => {
      dispatch(changePage(payload))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)