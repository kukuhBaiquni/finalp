import React, {Component} from 'react'
import LangkahFoto from './LangkahFoto'

var listlangkah = []
var checker = 0
export default class LangkahPartials extends Component {
  constructor(props){
    super(props)

    this.state = {
      handleEditValue: '',
      langkahChangeHandler: '',
      langkahChangeHandlerEdit: '',
      editlangkah: false,
      positionhandler: '5px',
      buttonhandler: '4px',
      position: 'absolute'
    }

    this.langkaheditclick = this.langkaheditclick.bind(this)
    this.langkahdelete = this.langkahdelete.bind(this)
  }

  langkahSubmit(e){
    e.preventDefault()
    function cidug(x){
      return x.charAt(0).toUpperCase() + x.slice(1)
    }
    listlangkah.push(cidug(this.state.langkahChangeHandler))
    this.setState({
      langkahChangeHandler: ''
    })
  }

  langkahEditSubmit(e){
    e.preventDefault()
    function cidug(x){
      return x.charAt(0).toUpperCase() + x.slice(1)
    }
    this.setState({
      editlangkah: false
    })
    listlangkah[checker] = cidug(this.state.langkahChangeHandlerEdit)
  }

  langkahChangeHandler(e){
    this.setState({
      langkahChangeHandler: e.target.value
    })
  }

  langkahChangeHandlerEdit(e){
    this.setState({
      langkahChangeHandlerEdit: e.target.value
    })
  }

  langkaheditclick(i){
    checker = i
    this.setState({
      editlangkah: true,
      positionhandler: 192+(120*i)+'px',
      buttonhandler: 192+(120*i)+'px',
      handleEditValue: listlangkah[checker]
    })
  }

  langkahdelete(i){
    listlangkah.splice(i, 1)
    this.setState(function(prevState){
      return {nothing: !prevState.nothing}
    })
  }

  render(){

    var buttondewa = {
      marginTop: this.state.buttonhandler,
      opacity: '0.85',
      width: '40px',
      height: '115px',
      fontSize: '20px',
      fontFamily: 'enigmaticregular',
      color: 'white',
      lineHeight: '115px',
      textAlign: 'center',
      background: '#4d2e9b',
      marginLeft: '501px',
      border: '1px solid white',
      borderRadius: '5px',
      position: 'absolute',
    }

    var editor = {
      position: 'absolute',
      width: '475px',
      height: '115px',
      fontSize: '17px',
      marginLeft: '23px',
      fontFamily: 'sansation_lightlight',
      border: '1px solid white',
      borderRadius: '5px',
      marginTop: this.state.positionhandler
    }

    var list2 = listlangkah.map((f,i) =>
    <div key={i}>
      <div>
        <div className='lala'>{listlangkah[i]}</div>
        <abbr title={'Langkah ' + (i+1)}><div className='gobot' >{i+1}</div></abbr>
        {
          !this.state.editlangkah &&
          <div>
            <abbr title='Edit langkah'><div className='editlangkah' onClick={()=> this.langkaheditclick(i)}><span className='glyphicon glyphicon-pencil'></span></div></abbr>
            <abbr title='Hapus langkah'><div className='hapuslangkah' onClick={()=> this.langkahdelete(i)}><span className='glyphicon glyphicon-trash'></span></div></abbr>
          </div>
        }
        <LangkahFoto />
      </div>
    </div>
  )
    return(
      <div>
      <form id='prosesform' onSubmit={this.langkahSubmit.bind(this)}>
        <div className="form-group">
          <p className='labelg'>Proses Pembuatan</p>
          <div>
            <textarea maxLength='125' onChange={this.langkahChangeHandler.bind(this)} placeholder='Tambah Langkah' autoComplete='off' value={this.state.langkahChangeHandler} id='formwidth3' className="form-control" />
            <abbr title='Simpan langkah'><div onClick={this.langkahSubmit.bind(this)} className='simpanlangkah'><span className='glyphicon glyphicon-ok'></span></div></abbr>
          </div>
          <div className='formdivider2'>
            <ul>
              {list2}
            </ul>
            <div className='openspace'>
                <button className='bagikan'>Bagikan <span className='glyphicon glyphicon-share'></span></button>
              </div>
          </div>
        </div>
      </form>
      {
        this.state.editlangkah &&
        <div>
          <textarea style={editor} defaultValue={listlangkah[checker]} maxLength='125' onChange={this.langkahChangeHandlerEdit.bind(this)} placeholder='Edit Langkah' autoFocus autoComplete='off' />
          <abbr style={buttondewa} title='Simpan'><div onClick={this.langkahEditSubmit.bind(this)} className='simpaneditlangkah'><span className='glyphicon glyphicon-ok'></span></div></abbr>
        </div>
      }
  </div>
    )
  }
}
