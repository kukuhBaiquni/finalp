import React, {Component} from 'react'
import Navbar from './Navbar'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import Dropzone from 'react-dropzone'
import {Redirect} from 'react-router'
import FlashMessage from 'react-flash-message'
import ProfileContent from './ProfileContent'

var fotoprofil = ''
class Profile extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false,
      foto: fotoprofil,
      files: [],
      preview: false,
      alertsuccess: false,
      visibility: 'visible'
    }
  }
  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.props.actions.myRecipe(token)
      this.props.actions.loadUser(token)
    }else{
      this.setState({
        redirect: true
      })
    }
  }

  uploadFoto2(files) {
    this.setState({
      files: files,
      foto: files[0],
      preview: true,
      visibility: 'visible',
      alertsuccess: false
    })
    if (fotoprofil.length > 0) {
      fotoprofil = []
    }
    fotoprofil = files[0]
  }

  save(){
    this.setState({
      alertsuccess: true,
      visibility: 'hidden'
    })

    let self = localStorage.getItem('token')
    this.props.actions.uploadfp(fotoprofil, self)
  }

  batal(){
    this.setState({
      preview: false
    })
    fotoprofil = ''
  }

  render(){
    const {user} = this.props
    var nama = user.map((x, i) => x.namadepan + ' ' + x.namabelakang)
    var path = 'http://localhost:3000/images/'
    var vanish = {
      visibility: this.state.visibility
    }
    if (this.state.redirect) {
      return <Redirect to='/' />
    }else{
      return(
        <div>
          <Navbar actions={this.props.actions}/>
          <div className='propage'>
            <div className='thebox'></div>
            {
              this.state.preview
              ?
              <div>
                <img className='fotobox' src={this.state.foto.preview} alt='preview'/>
                <div style={vanish} onClick={this.save.bind(this)} className='simpanfoto'>Simpan</div>
                <div style={vanish} onClick={this.batal.bind(this)} className='batalsimpan'>Batal</div>
              </div>
              :
              user.map((x, i) => {
                return (<img key={i} className='fotobox' src={path + x.fotoprofil} alt={user.userid}/>)
              })
            }
            {
              this.state.alertsuccess &&
              <FlashMessage duration={6000}><div className='savesuccess'>Perubahan berhasil disimpan</div></FlashMessage>
            }
            <div className='anotherbox'>
            </div>
            <div className='profilename'>{nama}</div>

            <Dropzone className='dropzone' onDrop={this.uploadFoto2.bind(this)} accept="image/*" multiple={ false }>
              <abbr title='Ganti foto'><div className='changepp'><span className='glyphicon glyphicon-camera'></span></div></abbr>
            </Dropzone>

            <div className='buttonwrapper'>
              <abbr title='Resep Saya'><div className='testbutton1'><span className='glyphicon glyphicon-list'></span></div></abbr>
              <abbr title='Aktifitas Saya'><div className='testbutton2'><span className='glyphicon glyphicon-time'></span></div></abbr>
              <abbr title='Resep yang disimpan'><div className='testbutton3'><span className='glyphicon glyphicon-folder-open'></span></div></abbr>
            </div>
            <ProfileContent data={this.props.data} user={this.props.user} actions={this.props.actions}/>
            <div className='morespacepls'></div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  return{
    user: state.user,
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
)(Profile)
