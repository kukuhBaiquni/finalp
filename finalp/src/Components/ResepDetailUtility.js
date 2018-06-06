import React, {Component} from 'react'
import {Redirect} from 'react-router'

export default class ResepDetailUtility extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false,
      liked: false
    }
  }

  componentDidMount(){
    if (this.props.user.length === 1) {
      if (this.props.data.likedby.includes(this.props.user[0].userid)) {
        this.setState({
          liked: true
        })
      }
    }
  }

  unliking(){
    let userid = this.props.user[0].userid
    let resepid = this.props.data.resepid
    this.props.actions.unliking(userid, resepid)
    this.setState({
      liked: false
    })
  }

  liking(){
    if (this.props.user.length === 1) {
      let userid = this.props.user[0].userid
      let resepid = this.props.data.resepid
      this.props.actions.liking(userid, resepid)
      this.setState({
        liked: true
      })
    }else{
      let yon = window.confirm('Anda harus Login untuk menyukai kiriman \nLogin sekarang?')
      if (yon) {
        this.setState({
          redirect: true
        })
      }
    }
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to='/register&login' />
    }else{
      return(
        <div className='utility'>
          {
            this.state.liked
            ?
            <abbr title='Batal suka'><div onClick={this.unliking.bind(this)} className='liked'>Disukai</div></abbr>
            :
            <div onClick={this.liking.bind(this)} className='likebutton'><span className='glyphicon glyphicon-heart'></span></div>
          }
            <div className='commentbutton'><span className='glyphicon glyphicon-comment'></span></div>
          <div className='savebutton'><span className='glyphicon glyphicon-bookmark'></span></div>
        </div>
      )
    }
  }
}
