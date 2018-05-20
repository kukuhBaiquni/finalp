import React, {Component} from 'react'

export default class ProfilNav extends Component {
  render(){
    return(
      <div>
        <p className='brand'>Supermia</p>
        <p className='topnavlist1'><span className='glyphicon glyphicon-log-out'></span> Keluar</p>
        <p className='topnavlist2'><span className='glyphicon glyphicon-home'></span> Beranda</p>
        <p className='topnavlist4'><span className='glyphicon glyphicon-user'></span> Profil</p>
    </div>
    )
  }
}
