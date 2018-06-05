let initialState = {
  searchmode: false
}

export default function utility(state = initialState, action){
  switch (action.type) {

    case 'searchmodeon':
    return {searchmode: true}

    case 'searchmodeoff':
    return {searchmode: false}

    default:
    return state
  }
}
