import React, {Component} from 'react'
import ProfilNav from './ProfilNav'
import ProfileCard from './ProfileCard'
import TableProfile from './TableProfile'

export default class Profile extends Component {
  render(){
    return(
      <div className='bg'>
        <div className='sider'></div>
        <div className='sidel'></div>
        <ProfilNav />
        <div className='darkbar'></div>
        <div className='landingpro'>
          <div className='spacer2'></div>
          <div className='statistic'>
            <ProfileCard />
            <p className='pn'>Ucil Tuyul</p>
          </div>
          <div className='divider'>
          <TableProfile/>
          </div>
        </div>
      </div>
    )
  }
}
