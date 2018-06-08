import React, {Component} from 'react'
import Navbar from './Navbar'
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
      showme: false,
      gl: false,
      jumper: false
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentWillMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    window.scrollTo(0, 0)
    if (token) {
      this.props.actions.loadUser(token)
    }
    this.props.actions.searchModeOff()
    this.props.actions.loadResep()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  jumper(){
    this.setState({
      jumper: false
    })
    window.scrollTo(0, 0)
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
    if (scroll > 600) {
      this.setState({
        jumper: true
      })
    }else{
      this.setState({
        jumper: false
      })
    }

  }
  render(){
    const {data, actions, utility} = this.props
    return(
      <div className='wrapper'>
        <Navbar actions={actions} location={this.props.location.pathname}/>
        {
          this.state.showme &&
          <SearchFormNavbar
            searchmode={utility}
            actions={actions}
            />
        }
        <SearchFormHome
          user={this.props.user}
          searchmode={utility}
          data={data}
          actions={actions}
          />
        {
          this.state.jumper &&
          <abbr title='Loncat keatas'>
            <div onClick={this.jumper.bind(this)} className='jumper'><span className='glyphicon glyphicon-arrow-up'></span></div>
          </abbr>
        }
        <div className='kotak'></div>
        <DataContent data={data} actions={actions} user={this.props.user}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    data: state.data,
    utility: state.utility,
    user: state.user
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
