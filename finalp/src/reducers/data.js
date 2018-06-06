let initialState = []

export default function data(state = initialState, action){
  switch (action.type) {

    case 'loginAttemptSuccess':
      return action.data

    case 'tambahResepGagal':
      return state

    case 'tambahResepSukses':
    return state

    case 'resepDetailFailed':
    return state

    case 'resepDetailSuccess':
    return action.data.resep

    case 'myrecipe':
    return action.resep.data

    case 'deleteresepsuccess':
    console.log(action);
    console.log(state);
    return state

    case 'searching':
    let result = state.filter(x => x.namaresep.includes(action.query))
    return result

    case 'loadResepSukses':
    let order = action.resep.resep
    return order.reverse()

    case 'menusahur':
    let result1 = state.filter(x => x.kategori === 'Menu Sahur')
    return result1

    case 'menubuka':
    let result2 = state.filter(x => x.kategori === 'Menu Buka')
    return result2

    case 'sarapan':
    let result3 = state.filter(x => x.kategori === 'Sarapan')
    return result3

    case 'cemilan':
    let result4 = state.filter(x => x.kategori === 'Cemilan')
    return result4

    case 'makansiang':
    let result5 = state.filter(x => x.kategori === 'Makan Siang')
    return result5

    case 'makanmalam':
    let result6 = state.filter(x => x.kategori === 'Makan Malam')
    return result6

    case 'katering':
    let result7 = state.filter(x => x.kategori === 'Katering')
    return result7

    case 'perasmanan':
    let result8 = state.filter(x => x.kategori === 'Perasmanan')
    return result8

    case 'kuelebaran':
    let result9 = state.filter(x => x.kategori === 'Kue Lebaran')
    return result9

    default:
      return state
  }
}
