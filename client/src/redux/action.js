const insertData = (data) => {
  return {
    type: 'INSERT_DATA',
    payload: data
  }
}

const changePage = (data) => {
  return {
    type: 'CHANGE_PAGE',
    payload: data
  }
}

export {insertData, changePage}