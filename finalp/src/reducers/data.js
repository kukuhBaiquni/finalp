let initialState = []

export default function data(state = initialState, action){
  switch (action.type) {

    case 'loginAttemptSuccess':
      return action.data

    case 'tambahResepGagal':
      return state

    case 'tambahResepSukses':
    return state

    case 'addUserSuccess':
    return action.token

    case 'loadResepSukses':
    let order = action.resep.resep
    return order.reverse()
    default:
      return []
  }
}
