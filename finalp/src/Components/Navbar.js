import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Animated} from "react-animated-css"
import {Redirect} from 'react-router'

export default class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin: false,
      redirect: false
    }
    this.takeMeOut = this.takeMeOut.bind(this)
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({
        isLogin: true
      })
    }
  }

  confirmation(){
    this.props.actions.logoutconfirmationShow()

  }

  closeconfirmation(){
    this.props.actions.logoutconfirmationHide()
  }

  takeMeOut(){
    this.props.actions.logoutconfirmationHide()
    this.props.actions.userlogout()
    this.setState({
      isLogin: false,
      redirect: true
    })
    localStorage.removeItem('token')
    this.props.actions.searchModeOff()
  }

  render(){
    var visibility = {
      display: this.props.utility.logoutconfirmation ? 'block' : 'none'
    }
    if (this.state.redirect) {
      return <Redirect to='/register&login' />
    }else{
      return(
        <div>
          {
            this.props.utility.logoutconfirmation &&
            <div id="overlay">
              <Animated animationIn="bounceInDown" animationOut='flipOutX' isVisible={this.props.utility.logoutconfirmation}>
              <div className='popup' style={visibility}>
                <div className='notice'>Apakah anda yakin ingin keluar?</div>
                <div onClick={this.takeMeOut.bind(this)} id='text' className='modalbutton'>Keluar &nbsp;<span className='glyphicon glyphicon-log-out'></span></div>
                <div onClick={this.closeconfirmation.bind(this)} id='text' className='modalbutton2'>Batal &nbsp;<span className='glyphicon glyphicon-remove'></span></div>
              </div>
            </Animated>
            </div>
          }
          <Link to='/' className='brand'>Supermia</Link>
          {
            this.state.isLogin &&
            <Link to='/profile' className='topnavlist4'>
              Profil <span className='glyphicon glyphicon-user'></span>
            </Link>
        }
        {
          this.state.isLogin
          ?
            <div onClick={this.confirmation.bind(this)} className='topnavlist2'>
              Logout <span className='glyphicon glyphicon-log-out'></span>
            </div>

          : <Link to='/register&login' className='topnavlist2'>
              Daftar & Login <span className='glyphicon glyphicon-user'></span>
            </Link>
        }
            <Link to='/' className='topnavlist1'>
              Beranda <span className='glyphicon glyphicon-home'></span>
            </Link>
              <p className='topnavlist3'>Bantuan <span className='glyphicon glyphicon-book'></span></p>
                <nav className="navbar navbar-default" id='navb'></nav>
            </div>
      )
    }
  }
}
