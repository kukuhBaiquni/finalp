import React, {Component} from 'react'
import {Link} from 'react-router-dom'
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

  takeMeOut(){
    let yon = window.confirm('Apakah kamu yakin ingin keluar?')
    if (yon) {
      this.setState({
        isLogin: false,
        redirect: true
      })
      localStorage.removeItem('token')
      this.props.actions.searchModeOff()
    }
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to='/register&login' />
    }else{
      return(
        <div>
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
            <div onClick={this.takeMeOut} className='topnavlist2'>
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
