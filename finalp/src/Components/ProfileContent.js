import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class ProfileContent extends Component {

  delete(i){
    let desired = this.props.data[i].resepid
    let yon = window.confirm('Anda yakin ingin menghapus?')
    if (yon) {
      this.props.actions.deleteResep(desired)
      this.props.actions.deletefilter(desired)
    }
  }

  render(){
    var path = 'http://localhost:3000/images/'
    return(
      <div className='wadahpro'>
        <hr/>
        <div className='protitle'>
          <p>Resep Saya</p>
          <p className='subhead'>Total Resep yang ditulis : {this.props.data.length}</p>
        </div>
        <hr/>
        {
          this.props.data.map((x, i) =>{
            return(
              <div key={i}>
                <div className='fillcontent'>
                  <Link to={'/resep/' + this.props.data[i].resepid}>
                    <abbr title='Lihat detail'>
                      <p style={{color: 'white'}}>{x.namaresep}</p>
                    </abbr>
                  </Link>
                </div>
                <abbr title='Hapus'><div onClick={()=> this.delete(i)} className='option2'><span className='glyphicon glyphicon-trash'></span></div></abbr>
                <div className='prolist'>
                  <img className='litleimg' src={path + x.foto} alt='123' />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
