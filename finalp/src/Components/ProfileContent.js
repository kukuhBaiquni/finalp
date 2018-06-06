import React, {Component} from 'react'

export default class ProfileContent extends Component {

  delete(i){
    let desired = this.props.data[i].resepid
    let yon = window.confirm('Anda yakin ingin menghapus?')    
    if (yon) {
      this.props.actions.deleteResep(desired)
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
                  {x.namaresep}
                </div>
                <div onClick={()=> this.delete(i)} className='option2'><span className='glyphicon glyphicon-trash'></span></div>
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
