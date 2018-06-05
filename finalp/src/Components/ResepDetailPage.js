import React, {Component} from 'react'
import Navbar from './Navbar'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import ResepDetailBahan from './ResepDetailBahan'

class ResepDetailPage extends Component {
  componentDidMount(){
    var parseId = this.props.location.pathname.replace('/resep/', '')
    this.props.actions.resepDetail(parseId)
  }

  render(){
    let path = 'http://localhost:3000/images/'
    var image = this.props.data.map(x => {
      return (<img className='fotoresepdetail' key={x.resepid} alt={x.resepid} src={path + x.foto} />)
    })

    var title = this.props.data.map(x => {
      return (<span key={x.resepid}><strong>{x.namaresep}</strong></span>)
    })

    var penulis = this.props.data.map(x => {
      return (<p key={x.resepid}>{x.namapenulis}</p>)
    })

    var kategori = this.props.data.map(x => {
      return (<p style={{fontSize: '20px'}} key={x.resepid}>Kategori : <i>{x.kategori}</i></p>)
    })

    var pass = this.props.data.map(x => {
      return (<ResepDetailBahan key={x.resepid} data={x}/>)
    })
    return(
      <div>
        <Navbar/>
        <div className='pdbg'>
          <div className='visiblebg'>
            {image}
          </div>
          <div className='resepdetailspacer'>
              {title}
              {kategori}
              <hr />
          </div>
          <div className='resepdetails'>
            <span>Penulis : </span>{penulis}
              <div className='anotherhr'></div>
              {pass}
          </div>
          <hr />
          <div className='utility'></div>
        </div>
        <div className='footer'></div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    data: state.data
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResepDetailPage)
