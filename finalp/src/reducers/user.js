let initialState = []

export default function user(state = initialState, action){
  switch (action.type) {

    case 'loadUserSuccess':
      return action.user.user

    case 'stopauth':
      return {auth: false}

    default:
      return state
  }
}
