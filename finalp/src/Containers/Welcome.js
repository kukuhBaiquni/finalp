import React, {Component} from 'react'
import Multiform from './Multiform'

export default class Welcome extends Component {
  render(){
    return(
      <div className='kwel'>
      <p className='bigw'>Resep Baru Setiap Hari</p><hr/>
      <i className='welcoeg'>
      "Supermia menyediakan berbagai resep dari pengguna, yang dapat membantu anda <br/> dalam membuat
      segala jenis masakan berkualitas tinggi. Selain tempat berbagi <br/> resep masakan, Supermia juga
      menyediakan fitur beri nilai untuk memudahkan <br/> anda dalam memilih masakan yang populer dan disukai oleh
      banyak orang. <br/> Untuk informasi lebih lengkap silahkan klik tombol dibawah ini!!"
      </i><br/><br/><br/>
      <button className='buttonw'>Lihat Fitur</button>
      <Multiform/>
      </div>
    )
  }
}
