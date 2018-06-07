import React, {Component} from 'react'
import FlashMessage from 'react-flash-message'

export default class CommentSection extends Component {
  constructor(props){
    super(props)
    this.state = {
      alertcomment: false
    }
  }

  alertprepare(){
    this.setState({
      alertcomment: false
    })
  }

  pseudoSubmit(){
    let userid = this.props.user[0].userid
    let username = this.props.user[0].namadepan.concat(' ' + this.props.user[0].namabelakang)
    let userfoto = this.props.user[0].fotoprofil
    let content = this.input.value
    let resepid = this.props.data.resepid
    this.setState({
      alertcomment: true
    })
    this.props.actions.submitComment(userid, username, userfoto, content, resepid)
    this.input.value = ''
  }

  render(){
    let path = 'http://localhost:3000/images/'
    return(
      <div>
        <div className='spacercomment'></div>
        <div className='commentmain'>
          <div className='tuliskomen'>Tulis komentar&nbsp;<span className='glyphicon glyphicon-comment'></span></div>
          {
            this.props.user.map((x, i) => {
              return (<img key={i} className='fotouser' src={path + x.fotoprofil} alt={x.userid}/>)
            })
          }
          {
            this.state.alertcomment
            ?
            <FlashMessage persistOnHover={false} duration={2000}><div className='flash'>Komentar berhasil dikirim</div></FlashMessage>
            : ''
          }
          <textarea onBlur={this.alertprepare.bind(this)} ref={input => this.input = input} maxLength='350' className='custominput' placeholder='Tulis komentar'/>
          <abbr title='Kirim komentar'><div onClick={this.pseudoSubmit.bind(this)} className='kirim'>Kirim</div></abbr>
        </div>
      </div>
    )
  }
}
