import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {SERVER_URL} from '../config'

export default class ActualContent extends Component {
  constructor(props){
    super(props)

    this.state = {
      position: '30px'
    }
  }
  render(){
    let path = SERVER_URL + 'images/'
    let preview = path + this.props.data.foto

    var spacer = {
      height: '42px'
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
              <p style={{color: '#4d2e9b'}}><span style={{color: '#c5a3ff'}} className='glyphicon glyphicon-time'></span> {this.props.data.created}</p>
            </div>
            <div style={spacer}></div>

          </div>
          <div className='dllwrap'>
            <div className='likedll'>
              <abbr title='suka'>
                <span className='glyphicon glyphicon-heart'></span>
              </abbr>
            </div>

            <div className='komendll'>
              <abbr title='komentar'>
                <span className='glyphicon glyphicon-comment'></span>
              </abbr>
            </div>
            <div className='datautil'>{this.props.data.like} Suka & {this.props.data.comment} Komentar</div>
            <span className='lihatdetail'>Lihat Detail</span>
            <Link to={'/resep/' + this.props.data.resepid} className='lihatresep'><span className='glyphicon glyphicon-zoom-in'></span></Link>
          </div>
        </div>
        <div className='sekat'></div>
      </div>
    )
  }
}
