import React, {Component} from 'react'
import TableProfile from './TableProfile'
import Navbar from './Navbar'
import {Redirect} from 'react-router'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
  }

  componentWillMount(){
    let token = localStorage.getItem('token')
    console.log('profile',token);
    if (!token || token === undefined) {
      this.setState({
        redirect: true
      })
    }
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to='/' />
    }else{
      return(
        <div className='bg'>
          <Navbar />
          <div className='sider'></div>
          <div className='sidel'></div>
          <div className='darkbar'></div>
          <div className='landingpro'>
            <div className='spacer2'></div>
            <div className='statistic'>
              <div>
                <div className='card'>
                  <img src='http://ciuhct.org/Media/Default/Online/dummyprofile.png' alt='profilepicture' className='pp' />
                </div>
              </div>
              <p className='pn'>Master Chef</p>
            </div>
            <div className='divider'>
              <TableProfile/>
            </div>
          </div>
        </div>
      )
    }
  }
}
