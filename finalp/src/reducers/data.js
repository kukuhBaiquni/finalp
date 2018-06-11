let initialState = []

export default function data(state = initialState, action){
  switch (action.type) {

    case 'tambahResepGagal':
      return state

    case 'tambahResepSukses':
    return state

    case 'resepDetailFailed':
    return state

    case 'resepDetailSuccess':
    return action.data.resep

    case 'likingsuccess':
    return state

    case 'myrecipe':
    return action.resep.data

    case 'myrecipelost':
    return []

    case 'loadlikedfailed':
    return []

    case 'deletefilter':
    let filtered = state.filter(x => x.resepid !== action.resepid)
    return filtered

    case 'searching':
    let copy = state
    let result = copy.filter(x => x.namaresep.includes(action.query))
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

    case 'prasmanan':
    let result8 = state.filter(x => x.kategori === 'Prasmanan')
    return result8

    case 'kuelebaran':
    let result9 = state.filter(x => x.kategori === 'Kue Lebaran')
    return result9

    case 'asc-alfabet':
    let cloneascalf = [...state]
    let sortascalf = cloneascalf.sort(function(x, y){
      let a = x.namaresep.toUpperCase()
      let b = y.namaresep.toUpperCase()
      return (a < b) ? -1 : (a > b) ? 1 : 0
    })
    return sortascalf

    case 'asc-date':
    let cloneascdate = [...state]
    let sortascdate = cloneascdate.sort(function(x, y){
      let c = x.actualdate
      let d = y.actualdate
      return (c < d) ? -1 : (c > d) ? 1 : 0
    })
    return sortascdate

    case 'asc-like':
    let cloneasclike = [...state]
    let sortasclike = cloneasclike.sort(function(x, y){
      let e = x.like
      let f = y.like
      return (e < f) ? -1 : (e > f) ? 1 : 0
    })
    return sortasclike.reverse()

    case 'asc-comment':
    let cloneasccomment = [...state]
    let sortasccomment = cloneasccomment.sort(function(x, y){
      let g = x.comment
      let h = y.comment
      return (g < h) ? -1 : (g > h) ? 1 : 0
    })
    return sortasccomment.reverse()

    case 'desc-alfabet':
    let clonedescalf = [...state]
    let sortdescalf = clonedescalf.sort(function(x, y){
      let a = x.namaresep.toUpperCase()
      let b = y.namaresep.toUpperCase()
      return (a < b) ? -1 : (a > b) ? 1 : 0
    })
    return sortdescalf.reverse()

    case 'desc-date':
    let clonedescdate = [...state]
    let sortdescdate = clonedescdate.sort(function(x, y){
      let c = x.actualdate
      let d = y.actualdate
      return (c < d) ? -1 : (c > d) ? 1 : 0
    })
    return sortdescdate.reverse()

    case 'desc-like':
    let clonedesclike = [...state]
    let sortdesclike = clonedesclike.sort(function(x, y){
      let e = x.like
      let f = y.like
      return (e < f) ? -1 : (e > f) ? 1 : 0
    })
    return sortdesclike

    case 'desc-comment':
    let clonedesccomment = [...state]
    let sortdesccomment = clonedesccomment.sort(function(x, y){
      let g = x.comment
      let h = y.comment
      return (g < h) ? -1 : (g > h) ? 1 : 0
    })
    return sortdesccomment

    default:
      return state
  }
}
