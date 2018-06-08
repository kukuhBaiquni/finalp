import request from 'superagent'
import moment from 'moment'
import {SERVER_URL} from '../../config'

const TARGET = SERVER_URL + 'api/finalp/'

export function addUser(namadepan, namabelakang, email, password){
  let userid = Date.now()
  let created = moment(userid).format('DD-MM-YYYY')
  return dispatch => {
    return request
    .post(`${TARGET}register`)
    .type('form')
    .send({userid : userid})
    .send({namadepan : namadepan})
    .send({namabelakang : namabelakang})
    .send({email : email})
    .send({password : password})
    .send({created : created})
    .end((err, res)=>{
      if (err) {
        dispatch(addUserFailed())
      }else{
        let token = res.body.token;
        localStorage.setItem('token', token)
        dispatch(loadUser(token))
      }
    })
  }
}

function addUserFailed(){
  return {type: 'addUserFailed'}
}

export function loadAllUser(){
  return dispatch => {
    return request
    .get(`${TARGET}alluser`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(allUser(res.body))
      }
    })
  }
}

function allUser(users){
  return {type: 'alluser', users}
}

export function loadUser(token){
  return dispatch => {
    return request
    .get(`${TARGET}${token}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(loadUserSuccess(res.body))
      }
    })
  }
}

function loadUserSuccess(user){
  return {type: 'loadUserSuccess', user}
}

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

function resepDetailSuccess(data){
  return {type: 'resepDetailSuccess', data}
}

function resepDetailFailed(){
  return {type: 'resepDetailFailed'}
}

export function uploadfp(fp, token){
  return dispatch => {
    const single = new FormData()
    single.append('file', fp)
    single.append('token', token)
    return request
    .post(`${TARGET}uploadfp`)
    .send(single)
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(uploadfpDone())
      }
    })
  }
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
        dispatch(myRecipeSuccess(res.body))
      }
    })
  }
}

function myRecipeSuccess(resep){
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

function uploadfpDone(){
  return {type: 'uploadfpDone'}
}

export function liking(userid, resepid){
  return dispatch => {
    return request
    .post(`${TARGET}liking`)
    .type('form')
    .send({userid: userid})
    .send({resepid: resepid})
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(likingSuccess())
      }
    })
  }
}

function likingSuccess(){
  return {type: 'likingsuccess'}
}

export function unliking(userid, resepid){
  return dispatch => {
    return request
    .post(`${TARGET}unliking`)
    .type('form')
    .send({userid: userid})
    .send({resepid: resepid})
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(likingSuccess())
      }
    })
  }
}

export function submitComment(userid, username, userfoto, content, resepid){
  let created = moment(Date.now()).format('DD-MM-YYYY')
  return dispatch => {
    return request
    .post(`${TARGET}submitcomment`)
    .type('form')
    .send({userid: userid})
    .send({username: username})
    .send({userfoto: userfoto})
    .send({content: content})
    .send({resepid: resepid})
    .send({created: created})
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(loadComment(resepid))
      }
    })
  }
}

export function loadComment(resepid){
  return dispatch => {
    return request
    .get(`${TARGET}loadcomment/${resepid}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(loadCommentSuccess(res.body))
      }
    })
  }
}

function loadCommentSuccess(comment){
  return {type: 'loadcommentsuccess', comment}
}

// function checkToken(data){
//   return dispatch => {
//     return request
//     .post(`${TARGET}checktoken`)
//     .type('form')
//     .send({data})
//     .end((err, res)=>{
//       if (err) {
//         console.log(err);
//       }else{
//         console.log('dd');
//       }
//     })
//   }
// }

export function loadLiked(token){
  return dispatch => {
    return request
    .get(`${TARGET}liked/${token}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(loadlikesuccess(res.body))
      }
    })
  }
}

function loadlikesuccess(liked){
  return {type: 'loadlikesuccess', liked}
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

function loadResepSukses(resep){
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

function tambahResepGagal(){
  return {type: 'tambahResepGagal'}
}

function uploadFotoResep(resepid ,images, index){
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

function tambahResepSukses(data){
  return {type: 'tambahResepSukses', data}
}

export function searching(query){
  return {type: 'searching', query}
}

export function loginAttempt(email, password){
  return dispatch =>{
    return request
    .post(`${TARGET}login`)
    .type('form')
    .send({email: email})
    .send({password: password})
    .end((err, res)=>{
      if (err) {
        dispatch(loginAttemptFail())
      }else{
        let token = res.body.token
        if (token || token !== undefined) {
          localStorage.setItem('token',res.body.token)
        }
        dispatch(loadUser(res.body.token))
      }
    })
  }
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

function loginAttemptFail(){
  return {type: 'loginAttemptFail'}
}

export function searchModeOn(){
  return {type: 'searchmodeon'}
}

export function searchModeOff(){
  return {type: 'searchmodeoff'}
}

export function menuSahur(){
  return {type: 'menusahur'}
}

export function menuBuka(){
  return {type: 'menubuka'}
}

export function sarapan(){
  return {type: 'sarapan'}
}

export function cemilan(){
  return {type: 'cemilan'}
}

export function makanSiang(){
  return {type: 'makansiang'}
}

export function makanMalam(){
  return {type: 'makanmalam'}
}

export function katering(){
  return {type: 'katering'}
}

export function prasmanan(){
  return {type: 'prasmanan'}
}

export function kueLebaran(){
  return {type: 'kuelebaran'}
}
