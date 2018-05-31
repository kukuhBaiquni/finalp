import React, {Component} from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import SearchFormHome from './SearchFormHome'
import SearchFormNavbar from './SearchFormNavbar'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import DataContent from './DataContent'

class HomePage extends Component {
  constructor(props){
    super(props)

    this.state = {
      showme: false
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentWillMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    this.props.actions.loadResep()
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
        <Link to='/tulisresep' className='tulisresepbutton'>Tulis Resep <span className='glyphicon glyphicon-edit'></span></Link>
        <DataContent data={this.props.data}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    data: state.data
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
