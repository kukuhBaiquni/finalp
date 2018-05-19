import React, {Component} from 'react'

export default class Navbar extends Component {
  render(){
    return(
      <div>
        <p className='brand'><b>Supermia</b></p>
        <p className='topnavlist'>Resep Baru</p>
        <p className='topnavlist'><span className='glyphicon glyphicon-book'></span> Koleksi</p>
        <p className='topnavlist'>Tentang Kami</p>
    </div>
    )
  }
}
