import React, { Component } from 'react'
import Search from './Search.jsx'
import Category from './Category.jsx'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners';

import {insertingData, changingPage, selectingCategory, inputSearch} from '../redux/news/action'

import { bindActionCreators } from 'redux'

 class Home extends Component {

  getNews = () => {
    let max = 5
    let start = 0
    this.props.insertingData({max, start})
  }

  selectCategory = (value) => {
    let max = 5
    let start = 0
    this.props.selectingCategory({value, max, start })
  }

  searchInput = (value) => {
    let max = 5
    let start = 0
    this.props.inputSearch({value, max, start })
  }

  prev = () => {
    if (this.props.currentpages > 0) {
      let obj = {
        currentpages: this.props.currentpages - 1,
        start: this.props.start - 5,
        max: this.props.max - 5
      }
      this.props.changingPage(obj)
    }
  }

  next = () => {
    if (this.props.currentpages + 1 < this.props.pages[this.props.pages.length - 1]) {
      let obj = {
        currentpages : this.props.currentpages + 1,
        start: this.props.start + 5,
        max: this.props.max + 5
      }
      this.props.changingPage(obj)
    }
  }

  change = (page) => {
    let obj = {
      currentpages: page,
      start: page * 5,
      max: (page * 5) + 5
    }
    this.props.changingPage(obj)
  }

  componentDidMount () {
    let url = this.props.match.url.split('/')
    let urlInitiate = url[1]
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
    if (this.props.loading) {
      return (
      <div className="content col-lg-8">
        <div className='sweet-loading'>
          <RingLoader
            color={'#123abc'}
          />
        </div>
      </div>
      )
    } else if (this.props.data.length > 0) {
      return (
        <div className="content col-lg-8">
          <Category
          selectCategory = {this.selectCategory}>
          </Category>
          <Search
          search = {this.searchInput}>
          </Search>
          <div className="news-content">
            { this.props.data
              .filter((data, i) => (i >= this.props.start && i < this.props.max) === true)
              .map((news, i) => (
              <div key={i} className="card">
                <a href={news.url} target="_blank" className="card-title">{news.title}</a>
                <div className="news-info text-muted">
                  <div className="author">
                    <span className="news-info-font">By {news.author}</span>
                  </div>
                  <div className="update">
                    <span className="news-info-font">Published At {news.dateParse}</span>
                  </div>
                </div>
                <img className="card-img-top" src={news.urlToImage} alt=""/>
                <div className="card-body">
                  <p className="card-text">{news.description}</p>
                </div>
              </div>
            ))
            }
          </div> 
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
      )
    } else if (this.props.error) {
      return (
        <div>Error</div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.news.data,
    pages: state.news.pages,
    loading: state.news.loading,
    error: state.news.error,
    currentpages: state.news.currentpages,
    start: state.news.start,
    max: state.news.max
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  insertingData, changingPage, selectingCategory, inputSearch
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)