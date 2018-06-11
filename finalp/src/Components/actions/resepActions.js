import request from 'superagent'
import moment from 'moment'
import {SERVER_URL} from '../../config'

const TARGET = SERVER_URL + 'api/finalp/'

export function resepDetail(resepid){
  return dispatch => {
    return request
    .get(`${TARGET}resepdetail/${resepid}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        dispatch(resepDetailFailed())
      }else{
        dispatch(resepDetailSuccess(res.body))
      }
    })
  }
}

export function resepDetailSuccess(data){
  return {type: 'resepDetailSuccess', data}
}

export function resepDetailFailed(){
  return {type: 'resepDetailFailed'}
}

export function myRecipe(token){
  return dispatch => {
    return request
    .get(`${TARGET}myrecipe/${token}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        if (res.body.status === 'Someone trying to hack our system') {
          dispatch(myRecipeLost())
        }else{
          dispatch(myRecipeSuccess(res.body))
        }
      }
    })
  }
}

export function myRecipeLost(){
  return {type: 'myrecipelost'}
}

export function myRecipeSuccess(resep){
  return {type: 'myrecipe', resep}
}

export function deleteResep(resepid){
  return dispatch => {
    return request
    .post(`${TARGET}myrecipe/${resepid}`)
    .type('form')
    .send({resepid: resepid})
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }
    })
  }
}

export function deletefilter(resepid){
  return {type: 'deletefilter', resepid}
}

export function loadResep(){
  return dispatch => {
    return request
    .get(`${TARGET}resep`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(loadResepSukses(res.body))
      }
    })
  }
}

export function loadResepSukses(resep){
  return {type: 'loadResepSukses', resep}
}

export function tambahResep(bundler){
  let resepid = Date.now()
  let created = moment(resepid).format('DD-MM-YYYY')
  return dispatch => {
    var nonImages = new FormData()
    var parseImages = []
    var parseIndex = bundler.langkah.filter(x => x.images !== '')
    var lordgabon = parseIndex.map(x => x.order)
    bundler.langkah.map(function(x){
      return nonImages.append('langkah',x.langkah)
    })
    bundler.langkah.map(function(r){
      return parseImages.push(r.images)
    })
    bundler.bahan.map(function(p){
      return nonImages.append('bahan',p)
    })
    nonImages.append('kategori', bundler.kategori)
    nonImages.append('resepid', resepid)
    nonImages.append('created', created)
    nonImages.append('nama', bundler.nama)
    nonImages.append('foto', bundler.foto)
    nonImages.append('penulis', bundler.penulis)

    return request
    .post(`${TARGET}tambahresep`)
    .send(nonImages)
    .end((err, res)=>{
      if (err) {
        dispatch(tambahResepGagal())
      }else{
        dispatch(uploadFotoResep(res.body.data.resepid, parseImages, lordgabon))
      }
    })
  }
}

export function tambahResepGagal(){
  return {type: 'tambahResepGagal'}
}

export function uploadFotoResep(resepid ,images, index){
  let filteredImages = images.filter(x => x !== '')
  return dispatch => {
    filteredImages.map(function(x, i){
      const data = new FormData()
      data.append('file', x)
      data.append('index', index[i])
      return request
      .put(`${TARGET}${resepid}`)
      .send(data)
      .end((err, res)=>{
        if (err) {
          console.error(err);
        }else{
          dispatch(tambahResepSukses(res.body))
        }
      })
    })
  }
}

export function tambahResepSukses(data){
  return {type: 'tambahResepSukses', data}
}
