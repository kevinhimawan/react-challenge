import { 
  INSERT_DATA,
  INSERT_DATA_LOADING,
  INSERT_DATA_ERROR,
  changePage,
  SELECT_CATEGORY,
  INPUT_KEY } from './actionTypes'
import axios from 'axios'

const insertingData = (payload) => {
  return dispatch => {
    dispatch (insertingDataLoading({loading: true}))
    let url = `https://newsapi.org/v2/top-headlines?category=general&pageSize=100&country=us&apiKey=dee035a49bd44ca384069a7dabb85f9a`
    axios.get(url).then(({data}) => {
      console.log(data)
      let pages = []
      for (let i = 1; i <= Math.ceil(data.articles.length / 5); i++) {
        pages.push(i)
      }
      dispatch (insertingDataSuccess({pages, data: data.articles, max: payload.max, start: payload.start}))
    })
    .catch(err => {
      dispatch (insertingDataError({loading: false, error: true}))
    })
  }
}

const insertingDataLoading = (data) => ({
  type: INSERT_DATA_LOADING,
  payload: data.loading
})

const insertingDataSuccess = (data) => ({
  type: INSERT_DATA,
  payload: data
  
})

const insertingDataError = (data) => ({
  type: INSERT_DATA_ERROR,
  payload: data
})

const changingPage = (data) => {
  return {
    type: changePage,
    payload: data
  }
}

const selectingCategory = (payload) => {
  return dispatch => {
    dispatch (insertingDataLoading({loading: true}))
    let url = `https://newsapi.org/v2/top-headlines?category=${payload.value}&country=us&apiKey=dee035a49bd44ca384069a7dabb85f9a`
    axios.get(url).then(({data}) => {
      let pages = []
      for (let i = 1; i <= Math.ceil(data.articles.length / 5); i++) {
        pages.push(i)
      }
      dispatch(selectCategory({pages, data: data.articles, max: payload.max, start: payload.start}))
    })
    .catch(err => {
      dispatch (insertingDataError({loading: false, error: true}))
    })
  }
}

const selectCategory = (data) => ({
  type: SELECT_CATEGORY,
  payload: data
})

const inputSearch = (payload) => {
  return dispatch => {
    dispatch (insertingDataLoading({loading: true}))
    let url = `https://newsapi.org/v2/everything?q=${payload.value}&language=en&apiKey=dee035a49bd44ca384069a7dabb85f9a`
    axios.get(url).then(({data}) => {
      if(data.articles.length > 0) {
        let pages = []
      for (let i = 1; i <= Math.ceil(data.articles.length / 5); i++) {
        pages.push(i)
      }
      dispatch(inputingSearch({pages, data: data.articles, max: payload.max, start: payload.start}))
      } else {
        dispatch (insertingDataError({loading: false, error: true}))  
      }
    })
    .catch(err => {
      dispatch (insertingDataError({loading: false, error: true}))
    })
  }
}

const inputingSearch = (data) => ({
  type: INPUT_KEY,
  payload: data
})

export {insertingData, changingPage, selectingCategory, inputSearch}