import React, {Component} from 'react'
import Register from './Register'
import {Link} from 'react-router-dom'

export default class Welcome extends Component {
  render(){
    return(
      <div className='wrapw'>
      <p className='bigw'>Resep Baru Setiap Hari<hr/>
      <div className='welcoeg'>
      <i>
      "Supermia menyediakan berbagai resep dari pengguna, yang dapat membantu anda <br/> dalam membuat
      segala jenis masakan berkualitas tinggi. Selain tempat berbagi <br/> resep masakan, Supermia juga
      menyediakan fitur beri nilai untuk memudahkan <br/> anda dalam memilih masakan yang populer dan disukai oleh
      banyak orang. <br/> Untuk informasi lebih lengkap silahkan klik tombol dibawah ini!!"
      </i>
    </div>
    <br/><br/><br/>
    <Link to='/profile' className='buttonw'>Lihat Fitur</Link>
    <div className='app'>
    </div>
    </p>
      <Register/>
      </div>
    )
  }
}
