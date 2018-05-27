import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin: false
    }
    this.takeMeOut = this.takeMeOut.bind(this)
  }

  componentWillMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({
        isLogin: true
      })
    }
  }

  componentWillUnmount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({
        isLogin: true
      })
    }
  }

  takeMeOut(){
    this.setState({
      isLogin: false
    })
    localStorage.removeItem('token')
  }

  render(){
    return(
      <div>
        <Link to='/' className='brand'>Supermia</Link>
        {
          this.state.isLogin
            ? <Link to='/' className='topnavlist2' onClick={this.takeMeOut}>
              Logout <span className='glyphicon glyphicon-log-out'></span>
              </Link>

            : <Link to='/register&login' className='topnavlist2'>
              Daftar & Login <span className='glyphicon glyphicon-user'></span>
              </Link>
        }
        <p className='topnavlist3'>Bantuan <span className='glyphicon glyphicon-book'></span></p>
        <nav className="navbar navbar-default" id='navb'></nav>
      </div>
    )
  }
}
