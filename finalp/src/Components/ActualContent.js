import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class ActualContent extends Component {
  constructor(props){
    super(props)

    this.state = {
      position: '30px'
    }
  }
  render(){
    let path = 'http://localhost:3000/images/'
    let preview = path + this.props.data.foto

    var spacer = {
      height: this.props.data.namaresep.length + this.props.data.kategori.length > 35 ? '0px' : '42px'
    }

    var identity = {
      height: this.state.position,
      width: '200px',
      fontFamily: 'sans-serif',
      fontSize: '14px',
      lineHeight: '5px',
    }
    return(
      <div>
        <div className='dataholder'>
          <img className='imgholder' src={preview} alt={this.props.data.resepid} />
          <div className='contenthome'>
            <p>{this.props.data.namaresep}<sup className='kategorititle'> <abbr title={'kategori: ' + this.props.data.kategori}> {this.props.data.kategori}</abbr></sup></p>
            <div style={identity}>
              <p style={{color: '#c5a3ff'}}>oleh : <strong style={{color: '#4d2e9b'}}>{this.props.data.namapenulis}</strong></p>
              <p style={{color: '#c5a3ff'}}><span style={{color: '#c5a3ff'}} className='glyphicon glyphicon-time'></span> {this.props.data.created}</p>
            </div>
            <div style={spacer}></div>
            <hr />
            <div className='likedll'>
              <abbr title='suka'><span className='glyphicon glyphicon-heart'></span>
              &nbsp;<span style={{fontSize: '20px'}}>{this.props.data.like}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </abbr>
            <abbr title='komentar'><span className='glyphicon glyphicon-comment'></span>
            &nbsp; <span style={{fontSize: '20px'}}>{this.props.data.comment}</span>
        </abbr>
      </div>
      <Link to={'/resep/' + this.props.data.resepid} className='lihatresep'>Lihat Resep</Link>
    </div>
  </div>
  <div className='sekat'></div>
</div>
)
}
}
