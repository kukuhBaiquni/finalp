import React, {Component} from 'react'

var listbahan = []
var checker = 0

export default class BahanPartials extends Component {
  constructor(props){
    super(props)

    this.state = {
      handler2: -155+(-53*listbahan.length+1)+'px',
      handler3: -115+(-53*listbahan.length+1)+'px',
      handler4: '0px',
      editing: false,
      nothing: true,
      handleEditValue: '',
      bahanChangeHandler: '',
    }

    this.editClick = this.editClick.bind(this)
    this.onDeleteBahan = this.onDeleteBahan.bind(this)
  }
  toggler(){
    this.setState({
      adding : true
    })
  }

  bahanSubmit(e){
    e.preventDefault()
    function cidug(x){
      return x.charAt(0).toUpperCase() + x.slice(1)
    }
    listbahan.push(cidug(this.input.value))
    this.setState({
      handler2 : -155+(-53*listbahan.length+1)+'px',
      handler3 : -115+(-53*listbahan.length+1)+'px'
    })
    this.input.value = ''
  }

  handleEditChange(e){
    this.setState({
      handleEditValue: e.target.value
    })
  }

  editClick(i){
    checker = i
    this.setState({
      handler4 : ((11-(53*(listbahan.length - i)))+106)+'px',
      editing: true,
      handleEditValue: listbahan[i]
    })
  }

  pseudoSubmit(e){
    if (e.keyCode === 13) {
      e.preventDefault()
      this.setState({
        editing: false
      })
      function cidug(x){
        return x.charAt(0).toUpperCase() + x.slice(1)
      }
      listbahan[checker] = cidug(this.state.handleEditValue)
    }
  }

  onDeleteBahan(i){
    listbahan.splice(i, 1)
    this.setState({
      handler2 : ((-154-(listbahan.length*53)))+'px',
      handler3 : parseInt(this.state.handler3, 10)+53+'px'
    })
  }
  render(){
    var editor ={
      width: '430px',
      height: '48px',
      fontSize: '17px',
      marginLeft: '-4px',
      marginTop: this.state.handler4
    }

    var styleListBahan = {
      width: '400px',
      marginTop: this.state.handler2,
      marginLeft: '24px',
      position: 'absolute'
    }

    var styleNote = {
      position: 'absolute',
      color: '#4d2e9b',
      fontSize: '13px',
      marginLeft: '27px',
      marginTop: this.state.handler3
    }

    var list = listbahan.map((f,i) =>
    <div key={i}>
      <div>
        <div className='lili'>{listbahan[i]}</div>
        <div>
          {
            !this.state.editing &&
            <div>
              <abbr title='Edit bahan'><div className='editbahan' onClick={()=> this.editClick(i)}><span className='glyphicon glyphicon-pencil'></span></div></abbr>
              <abbr title='Hapus bahan'><div className='deletebahan' onClick={()=> this.onDeleteBahan(i)}><span className='glyphicon glyphicon-trash'></span></div></abbr>
            </div>
          }
        </div>
      </div>
    </div>
  )
  return(
    <div>
      <div className="form-group" id='bahanbahanform'>
        <p className='labelg'>Bahan-bahan</p>
      </div>
      <div className='formdivider'>
        <ul>
          {list}
        </ul>
      </div>
      <div className='dummykotak'></div>
        {
          this.state.editing &&
          <div className='mimic'>
            <input style={editor} onChange={this.handleEditChange.bind(this)} value={this.state.handleEditValue} maxLength='48' onKeyDown={this.pseudoSubmit.bind(this)} autoFocus autoComplete='off' type="text" className="form-control" placeholder="Edit Bahan" />
          </div>
        }

        <form onSubmit={this.bahanSubmit.bind(this)}>
          <div className="form-group">
            <input maxLength='48' ref={input => this.input = input} autoComplete='off' type="text" style={styleListBahan} className="form-control" placeholder="Tambah Bahan" />
            <p style={styleNote}>Tips: Tekan 'Enter' untuk menambah</p>
          </div>
        </form>
  </div>
)
}
}
