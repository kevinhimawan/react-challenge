const initialState = {
  data: [],
  pages: [],
  currentpages: 0,
  start: 0,
  max: 5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INSERT_DATA': {
      return {
        ...state,data: action.payload.dataRefined, pages: action.payload.pages
      }
    }
    case 'CHANGE_PAGE': {
      return {
        ...state, currentpages: action.payload.currentpages,start: action.payload.start,max: action.payload.max
      }
    }
    default:
      return state;
  }
}



export default reducer