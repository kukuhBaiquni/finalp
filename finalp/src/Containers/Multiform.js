import React, {Component} from 'react'
import Login from './Login'

export default class Multiform extends Component {
  constructor(props){
    super(props)
    this.state = {
      register : true || false
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick(){
    this.setState(function(prevState){
      console.log(prevState);
      return {register: !prevState.register}
    })
  }

  render(){
    if (this.state.register) {
      return(
        <div className='bgform'>
        <button className='regb' onClick={this.onClick}>Register Form</button>
        <br/><br/><br/>
        <form>
        <div className="form-group">
        <label className='labelf'>Nama Depan</label>
        <input type="text" className="form-control" placeholder="Nama Depan" />
        </div>
        <div className="form-group">
        <label className='labelf'>Nama Belakang</label>
        <input type="text" className="form-control" placeholder="Nama Belakang" />
        </div>
        <div className="form-group">
        <label className='labelf'>Email</label>
        <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="form-group">
        <label className='labelf'>Password</label>
        <input type="password" className="form-control" placeholder="Password" />
        </div>
        <div className="form-group">
        <label className='labelf'>Retype Password</label>
        <input type="password" className="form-control" placeholder="Retype Password" />
        </div>
        <button className='dft'>Daftar</button>
        </form>
        </div>
      )
    }else{
      return <Login />
    }
  }
}
