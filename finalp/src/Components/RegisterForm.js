import React, {Component} from 'react'
import FlashMessage from 'react-flash-message'
import {Redirect} from 'react-router'

export default class RegisterForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      userid: '',
      namadepan: '',
      namabelakang: '',
      email: '',
      password: '',
      ulangipassword: '',
      created: '',
      token: '',
      foto: '',
      ulangivalid : false,
      passwordvalid: false,
      namadepanvalid: false,
      namabelakangvalid: false,
      emailvalid: false,
      formvalid: false,
      redirect: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({
        redirect: true
      })
    }
  }

  handleNamaDepan(e){
    this.setState({
      namadepan: e.target.value
    })

    if (e.target.value.length > 0) {
      this.setState({
        namadepanvalid: false
      })
    }else{
      this.setState({
        namadepanvalid: true
      })
    }
  }

  handleNamaBelakang(e){
    this.setState({
      namabelakang: e.target.value
    })

    if (e.target.value.length > 0) {
      this.setState({
        namabelakangvalid: false
      })
    }else{
      this.setState({
        namabelakangvalid: true
      })
    }
  }

  handleEmail(e){
    this.setState({
      email: e.target.value
    })

    if (e.target.value.length !== 0) {
      this.setState({
        emailvalid: false
      })
    }else{
      this.setState({
        emailvalid: true
      })
    }
  }

  handlePassword(e){
    this.setState({
      password: e.target.value
    })

    if (e.target.value.length > 5) {
      this.setState({
        passwordvalid: false
      })
    }else{
      this.setState({
        passwordvalid: true
      })
    }
  }

  handleRetypePassword(e){
    this.setState({
      ulangipassword: e.target.value
    })

    if (this.state.password === e.target.value) {
      this.setState({
        ulangivalid: false
      })
    }else{
      this.setState({
        ulangivalid: true
      })
    }
  }

  namaDepanValid(){
    if(this.state.namadepan.length !== 0){
      this.setState({
        namadepanvalid: false
      })
    }else{
      this.setState({
        namadepanvalid: true
      })
    }
  }

  namaBelakangValid(){
    if(this.state.namabelakang.length !== 0){
      this.setState({
        namabelakangvalid: false
      })
    }else{
      this.setState({
        namabelakangvalid: true
      })
    }
  }

  emailValid(){
    if(this.state.email.length !== 0){
      this.setState({
        emailvalid: false
      })
    }else{
      this.setState({
        emailvalid: true
      })
    }
  }

  passwordValid(){
    if(this.state.email.length > 5){
      this.setState({
        passwordvalid: true
      })
    }else{
      this.setState({
        passwordvalid: false
      })
    }
  }

  ulangiValid(){
    if(this.state.password === this.state.ulangipassword){
      this.setState({
        ulangivalid: false
      })
    }else{
      this.setState({
        ulangivalid: true
      })
    }
  }

  onSubmit(e){
    e.preventDefault();
    if (this.state.password === this.state.ulangipassword && this.state.namadepan && this.state.namabelakang
      && this.state.email && this.state.password && this.state.ulangipassword) {

        var namadepan = this.state.namadepan.trim();
        var namabelakang = this.state.namabelakang.trim();
        var email = this.state.email.trim();
        var password = this.state.password.trim();

        this.setState({
          namadepan: '',
          namabelakang: '',
          email: '',
          password: '',
          ulangipassword: '',
          formvalid: false,
          register: false,
          registersukses: true,
          redirect: true
        })

        this.props.addUser(namadepan, namabelakang, email, password)
      }else{
        this.setState({
          formvalid:true
        })
      }
    }

    render(){
      if (this.state.redirect) {
        return <Redirect to='/authentication' />
      }else{
        return(
        <div className='bgform'>
        <button disabled className='regb'>Register Form</button>
        <br/><br/><br/>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
        <label className='labelf'>Nama Depan {this.state.namadepanvalid ? <b className='alert'>tidak boleh kosong</b> : ''}</label>
        <input type="text" className="form-control" placeholder="Nama Depan" onFocus={this.namaDepanValid.bind(this)} value={this.state.namadepan} onChange={this.handleNamaDepan.bind(this)} />
        </div>
        <div className="form-group">
        <label className='labelf'>Nama Belakang {this.state.namabelakangvalid ? <b className='alert'>tidak boleh kosong</b> : ''}</label>
        <input type="text" className="form-control" placeholder="Nama Belakang" onFocus={this.namaBelakangValid.bind(this)} value={this.state.namabelakang} onChange={this.handleNamaBelakang.bind(this)} />
        </div>
        <div className="form-group">
        <label className='labelf'>Email {this.state.emailvalid ? <b className='alert'>tidak boleh kosong</b> : ''}</label>
        <input type="email" className="form-control" placeholder="Email" onFocus={this.emailValid.bind(this)} value={this.state.email} onChange={this.handleEmail.bind(this)} />
        </div>
        <div className="form-group">
        <label className='labelf'>Password {this.state.passwordvalid ? <b className='alert'>minimal 6 karakter</b> : ''}</label>
        <input type="password" className="form-control" placeholder="Password" onFocus={this.passwordValid.bind(this)} value={this.state.password} onChange={this.handlePassword.bind(this)} />
        </div>
        <div className="form-group">
        <label className='labelf'>Ulangi Password {this.state.ulangivalid ? <b className='alert'>password tidak cocok</b> : ''}</label>
        <input type="password" className="form-control" placeholder="Ulangi Password" onFocus={this.ulangiValid.bind(this)} value={this.state.ulangipassword} onChange={this.handleRetypePassword.bind(this)} />
        </div>
        <button className='dft'>Daftar</button>
        </form>
        {
          this.state.formvalid
          ? <FlashMessage duration={5000}><div id='noteinvalid' className='regsu'>Catatan: Mohon isi form dengan benar!!</div></FlashMessage>
          : ''
        }
        </div>
        )
      }
    }
  }
