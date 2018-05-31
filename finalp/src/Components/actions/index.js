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

export function tambahResep(namaresep, bahan, detail, penulis, images){
  let resepid = Date.now()
  let created = moment(resepid).format('DD-MM-YYYY')
  return dispatch => {
    return request
    .post(`${TARGET}tambahresep`)
    .type('form')
    .send({namaresep : namaresep})
    .send({penulis : penulis})
    .send({resepid : resepid})
    .send({bahan : bahan})
    .send({detail : detail})
    .send({created : created})
    .end((err, res)=>{
      if (err) {
        dispatch(tambahResepGagal())
      }else{
        dispatch(uploadFotoResep(res.body.data.resepid, images))
      }
    })
  }
}

function tambahResepGagal(){
  return {type: 'tambahResepGagal'}
}

function uploadFotoResep(resepid ,images){
  return dispatch => {
    images.map(file =>{
      const data = new FormData()
      data.append('file', file)
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


function addUserFailed(){
  return {type: 'addUserFailed'}
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

export function runAuth(){
    return {type: 'runauth'}
}

export function stopAuth(){
    return {type: 'stopauth'}
}
