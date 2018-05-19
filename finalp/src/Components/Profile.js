import React, {Component} from 'react'
import ProfilNav from './ProfilNav'
import Headshot from './Headshot'

export default class Profile extends Component {
  render(){
    return(
      <div className='bg'>
        <div className='sider'></div>
        <div className='sidel'></div>
        <ProfilNav />
        <div className='darkbar'></div>
        <div className='landingpro'>
        <Headshot />
        </div>
      </div>
    )
  }
}
