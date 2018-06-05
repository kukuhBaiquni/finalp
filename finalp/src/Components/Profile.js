import React, {Component} from 'react'
import Navbar from './Navbar'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import {Redirect} from 'react-router'

class Profile extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false
    }
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.props.actions.loadUser(token)
    }else{
      this.setState({
        redirect: true
      })
    }
  }

  render(){
    var path = 'http://localhost:3000/images/'
    const {user} = this.props
    if (this.state.redirect) {
      return <Redirect to='/' />
    }else{
      return(
        <div>
          <Navbar />
          <div className='propage'>
            <div className='thebox'></div>
            <img className='fotobox' src={path + user.fotoprofil + '.jpg'} alt={user.userid}/>
            <div className='anotherbox'>
            </div>
            <div className='profilename'><strong>{user.namadepan} {user.namabelakang}</strong></div>
            <abbr title='Ganti foto'><div className='changepp'><span className='glyphicon glyphicon-camera'></span></div></abbr>
            <div className='buttonwrapper'>
              <abbr title='Resep Saya'><div className='testbutton1'><span className='glyphicon glyphicon-list'></span></div></abbr>
              <abbr title='Aktifitas Saya'><div className='testbutton2'><span className='glyphicon glyphicon-time'></span></div></abbr>
              <abbr title='Resep yang disimpan'><div className='testbutton3'><span className='glyphicon glyphicon-folder-open'></span></div></abbr>
            </div>
            <div className='wadahpro'>
              <hr/>
              <div className='protitle'>
                <p>List Cidug</p>
              </div>
              <hr/>
              <div className='prolist'>
              </div>
            </div>
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
