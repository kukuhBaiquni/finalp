let initialState = []

export default function data(state = initialState, action){
  switch (action.type) {
    case 'loadUserSuccess':
      return action.data

    case 'loginAttemptSuccess':
      return action.data

    case 'tambahResepGagal':
      return state

    case 'tambahResepSukses':
    return null

    case 'loadResepSukses':
    return action.resep.data
    default:
      return []
  }
}
