let initialState = []

export default function user(state = initialState, action){
  switch (action.type) {

    case 'loadUserSuccess':
    return action.user.user

    case 'addUserSuccess':
    return action.token

    case 'uploadfpDone':
    return state

    default:
    return state
  }
}
