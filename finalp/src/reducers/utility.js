let initialState = {
  searchmode: false,
  alertresepstatus: false,
  modal: false,
  userlogin: false,
  logoutconfirmation: false
}

export default function utility(state = initialState, action){
  switch (action.type) {

    case 'searchmodeon':
    initialState.searchmode = true
    return {...initialState}

    case 'searchmodeoff':
    initialState.searchmode = false
    return {...initialState}

    case 'alertresepformOn':
    initialState.alertresepstatus = true
    return {...initialState}

    case 'alertresepformOff':
    initialState.alertresepstatus = false
    return {...initialState}

    case 'openmodal':
    initialState.modal = true
    return {...initialState}

    case 'closemodal':
    initialState.modal = false
    return {...initialState}

    case 'userlogin':
    initialState.userlogin = true
    return {...initialState}

    case 'userlogout':
    initialState.userlogin = false
    return {...initialState}

    case 'logoutconfirmationShow':
    initialState.logoutconfirmation = true
    return {...initialState}

    case 'logoutconfirmationHide':
    initialState.logoutconfirmation = false
    return {...initialState}
    
    default:
    return state
  }
}
