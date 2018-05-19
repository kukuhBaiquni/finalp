import React, {Component} from 'react'

export default class ProfilNav extends Component {
  render(){
    return(
      <div>
        <p className='brand'><b>Supermia</b></p>
        <p className='topnavlist'><span className='glyphicon glyphicon-log-out'></span> Keluar</p>
        <p className='topnavlist'><span className='glyphicon glyphicon-home'></span> Beranda</p>
        <p className='topnavlist'><span className='glyphicon glyphicon-user'></span> Profil</p>
    </div>
    )
  }
}
