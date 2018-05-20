import React, {Component} from 'react'

export default class Navbar extends Component {
  render(){
    return(
      <div>
        <p className='brand'>Supermia</p>
        <p className='topnavlist1'><span className='glyphicon glyphicon-folder-open'></span> Lihat Koleksi</p>
        <p className='topnavlist2'><span className='glyphicon glyphicon-book'></span> Panduan</p>
        <p className='topnavlist3'><span className='glyphicon glyphicon-comment'></span> Kirim Saran</p>
    </div>
    )
  }
}
