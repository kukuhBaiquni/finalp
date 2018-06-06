import request from 'superagent'
import moment from 'moment'

const TARGET = 'http://localhost:3000/api/finalp/'

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
      }
    })
  }
}

function addUserFailed(){
  return {type: 'addUserFailed'}
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
      }else{
        dispatch(deleteResepSuccess())
      }
    })
  }
}

function deleteResepSuccess(){
  return {type: 'deleteresepsuccess'}
}

function uploadfpDone(){
  return {type: 'uploadfpDone'}
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
        dispatch(loginAttemptSuccess(res.body))
      }
    })
  }
}

function loginAttemptFail(){
  return {type: 'loginAttemptFail'}
}

function loginAttemptSuccess(data){
  return {type: 'loginAttemptSuccess', data}
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

export function perasmanan(){
  return {type: 'perasmanan'}
}

export function kueLebaran(){
  return {type: 'kuelebaran'}
}
