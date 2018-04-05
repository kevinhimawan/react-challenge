const initialState = {
  data: [],
  pages: [],
  loading: true,
  error: false,
  currentpages: 0,
  start: 0,
  max: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INSERT_DATA': {
      return {
        ...state,
        data: action.payload.data,
        pages: action.payload.pages,
        loading: false,
        start: action.payload.start,
        max: action.payload.max
      }
    }
    case 'INSERT_DATA_LOADING': {
      return {
        ...state,
        loading: action.payload,
      }
    }

    case 'INSERT_DATA_ERROR': {
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
        data: []
      }
    }

    case 'CHANGE_PAGE': {
      return {
        ...state,
        currentpages: action.payload.currentpages,
        start: action.payload.start,
        max: action.payload.max,
        loading: false,
      }
    }

    case 'SELECT_CATEGORY': {
      return {
        ...state,
        data: action.payload.data,
        pages: action.payload.pages,
        loading: false,
        max: action.payload.max,
        start: action.payload.start,
      }
    }

    case 'INPUT_KEY': {
      console.log(action.payload)
      return {
        ...state,
        data: action.payload.data,
        pages: action.payload.pages,
        loading: false,
        start: action.payload.start,
        max: action.payload.max
      }
    }

    default:
      return state;
  }
}



export default reducer