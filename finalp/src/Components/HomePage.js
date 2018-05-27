import React, {Component} from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import SearchFormHome from './SearchFormHome'
import SearchFormNavbar from './SearchFormNavbar'
import DataHolder from './DataHolder'

export default class HomePage extends Component {
  constructor(props){
    super(props)

    this.state = {
      showme: false
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let scroll = document.documentElement.scrollTop;
    if (scroll > 383) {
      this.setState({
        showme: true
      })
    }else{
      this.setState({
        showme: false
      })
    }
  }
  render(){
    return(
      <div className='wrapper'>
        <Navbar />
          {
            this.state.showme
             ? <SearchFormNavbar />
             : ''
          }
        <SearchFormHome />
        <div className='kotak'></div>
        <div className='boxtest'></div>
        <Link to='/tulisresep' className='tulisresepbutton'>Tulis Resep <span className='glyphicon glyphicon-edit'></span></Link>
        <DataHolder />
    </div>
    )
  }
}
