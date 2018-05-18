import React, {Component} from 'react'
import Navbar from './Navbar'
import Welcome from './Welcome'

export default class Background extends Component {
  render(){
    return(
      <div className='bg'>
        <div className='sider'></div>
        <div className='sidel'></div>
        <Navbar />
        <div className='spacer'></div>
        <Welcome />
      </div>
    )
  }
}
