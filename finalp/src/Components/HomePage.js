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
      showme: false
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentWillMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
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
    const {data, actions, utility} = this.props
    return(
      <div className='wrapper'>
        <Navbar actions={actions} />
        {
          this.state.showme &&
          <SearchFormNavbar
            searchmode={utility}
            actions={actions}
          />
        }
        <SearchFormHome
          searchmode={utility}
          data={data}
          actions={actions}
        />
        <div className='kotak'></div>
        <DataContent data={this.props.data}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    data: state.data,
    utility: state.utility
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
