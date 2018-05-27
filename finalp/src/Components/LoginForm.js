import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      emailvalid: false,
      passwordvalid: false,
      redirect: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  emailValue(e){
    this.setState({
      email: e.target.value
    })

    if(this.state.emailvalid.length !== 0){
      this.setState({
        emailvalid: false
      })
    }else{
      this.setState({
        emailvalid: true
      })
    }
  }

  passwordValue(e){
    this.setState({
      password: e.target.value
    })

    if(this.state.passwordvalid.length !== 0){
      this.setState({
        passwordvalid: false
      })
    }else{
      this.setState({
        passwordvalid: true
      })
    }
  }

  onSubmit(e){
    e.preventDefault();

    if(this.state.email && this.state.password){
      var email = this.state.email.trim();
      var password = this.state.password.trim();

      this.setState({
        redirect: true
      })
      this.props.loginAttempt(email, password)

    }else{
      this.setState({
        emailvalid: true,
        passwordvalid: true
      })
    }
  }

  render(){
    if(this.state.redirect) {
      return <Redirect to='/profile' />
    }else{
      return(
        <div className='logform'>
          <button className='regb' disabled>Silahkan Login</button>
          <br/><br/><br/>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className='labelf'>Email {this.state.emailvalid ? <b className='alert'>tidak boleh kosong</b> : ''}</label>
              <input type="email" className="form-control" onChange={this.emailValue.bind(this)} placeholder="Email" />
            </div>
            <div className="form-group">
              <label className='labelf'>Password {this.state.passwordvalid ? <b className='alert'>tidak boleh kosong</b> : ''}</label>
              <input type="password" className="form-control" onChange={this.passwordValue.bind(this)} placeholder="Password" />
            </div>
            <button className='dft'>Masuk</button>
          </form>
        </div>
      )
    }
  }
}
