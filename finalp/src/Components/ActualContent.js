import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class ActualContent extends Component {
  render(){
    let path = 'http://localhost:3000/images/'
    let preview = path + this.props.data.foto
    console.log(preview);
    console.log('ttt',this.props);
    return(
      <div>
      <div className='dataholder'>
        <img className='imgholder' src={preview} alt={this.props.data.resepid} />
        <div className='contenthome'>
        <p><strong>{this.props.data.namaresep}</strong><sup className='kategorititle'> <abbr title={'kategori: ' + this.props.data.kategori}> {this.props.data.kategori}</abbr></sup></p>
        <div className='identity'>
        <p style={{color: '#c5a3ff'}}>oleh : <strong style={{color: '#4d2e9b'}}>{this.props.data.namapenulis}</strong></p>
        <p style={{color: '#c5a3ff'}}><span style={{color: '#c5a3ff'}} className='glyphicon glyphicon-time'></span> {this.props.data.created}</p>
        </div>
        <hr />
        <div className='likedll'><span className='glyphicon glyphicon-heart'></span>
        &nbsp;<span style={{fontSize: '20px'}}>{this.props.data.like}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className='glyphicon glyphicon-comment'></span>
     </div>
     <Link to='/' className='lihatresep'>Lihat Resep</Link>
       </div>
      </div>
      <div className='sekat'></div>
    </div>
    )
  }
}
