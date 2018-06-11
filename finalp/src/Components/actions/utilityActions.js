export function logoutconfirmationShow(){
  return {type: 'logoutconfirmationShow'}
}

export function logoutconfirmationHide(){
  return {type: 'logoutconfirmationHide'}
}

export function openmodal(){
  return {type: 'openmodal'}
}

export function closemodal(){
  return {type: 'closemodal'}
}

export function alertresepformOn (){
  return {type: 'alertresepformOn'}
}

export function alertresepformOff(){
  return {type: 'alertresepformOff'}
}

export function searching(query){
  return {type: 'searching', query}
}

export function sortasc(type){
  switch (type) {
    case 'alfabet':
    return {type: 'asc-alfabet'}
    case 'date':
    return {type: 'asc-date'}
    case 'like':
    return {type: 'asc-like'}
    case 'comment':
    return {type: 'asc-comment'}

    default:
    return 'Tercyduk'
  }
}

export function sortdesc(type){
  switch (type) {
    case 'alfabet':
    return {type: 'desc-alfabet'}
    case 'date':
    return {type: 'desc-date'}
    case 'like':
    return {type: 'desc-like'}
    case 'comment':
    return {type: 'desc-comment'}

    default:
    return 'Tercyduk'
  }
}

export function searchModeOn(){
  return {type: 'searchmodeon'}
}

export function searchModeOff(){
  return {type: 'searchmodeoff'}
}
