import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import './RegisterModal.css';
import Navbar from './Navbar'
import Dropzone from 'react-dropzone'
import {Link} from 'react-router-dom';

var images = [];
var listbahan = []
var thumbnailfoto = []
var listlangkah = []
var checker = 0
var checker2 = 0
export default class TulisResepForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      namaresep: '',
      bahan: '',
      detail: '',
      open: false,
      adding: false,
      handler1: '260px',
      handler2: '245px',
      handler3: '285px',
      tambahlangkah: false,
      editing: false,
      nothing: true,
      handleEditValue: '',
      handleEditValue2: '',
      bahanChangeHandler: '',
      langkahChangeHandler: '',
      langkahChangeHandlerEdit: '',
      editlangkah: false,
      files: []
    }
    this.editClick = this.editClick.bind(this)
    this.onDeleteBahan = this.onDeleteBahan.bind(this)
    this.resepSubmit = this.resepSubmit.bind(this)
    this.langkaheditclick = this.langkaheditclick.bind(this)
    this.langkahdelete = this.langkahdelete.bind(this)
  }

  handleNamaResep(e){
    this.setState({
      namaresep: e.target.value
    })
  }

  handleBahan(e){
    this.setState({
      bahan: e.target.value
    })
  }

  handleDetail(e){
    this.setState({
      detail: e.target.value
    })
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  uploadFoto(files) {
    this.setState({
      files: files
    })
    images.push(files[0])
  }

  uploadFoto2(files) {
    this.setState({
      files: files
    })
    if (thumbnailfoto.length > 0) {
      thumbnailfoto = []
    }
    thumbnailfoto.push(files[0])
  }

  toggler(){
    this.setState({
      adding : true
    })
  }

  onCancel(e){
    if (e.keyCode === 27) {
      this.setState({
        adding: false
      })
    }
  }

  bahanSubmit(e){
    e.preventDefault()
    this.setState({
      handler1 : parseInt(this.state.handler1, 10)-0+'px',
      handler2 : parseInt(this.state.handler2, 10)-0+'px',
      handler3 : parseInt(this.state.handler3, 10)-0+'px'
    })
    function cidug(x){
      return x.charAt(0).toUpperCase() + x.slice(1)
    }
    listbahan.push(cidug(this.input.value))
    console.log(listbahan);
    this.input.value = ''
  }


  handleEditChange(e){
    this.setState({
      handleEditValue: e.target.value
    })
  }

  editClick(i){
    this.setState({
      editing: true,
      handleEditValue: listbahan[checker]
    })
    checker = i
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
      handler1 : parseInt(this.state.handler1, 10)+0+'px',
      handler2 : parseInt(this.state.handler2, 10)+0+'px',
      handler3 : parseInt(this.state.handler3, 10)+0+'px'
    })
  }


  hapusThumbnailFoto(){
    let yon = window.confirm('apakah anda yakin ingin menghapus?')
    if (yon) {
      this.setState(function(prevState){
        return {nothing: !prevState.nothing}
      })
      thumbnailfoto = []
    }
  }

  tambahlangkah(){
    this.setState({
      tambahlangkah: true
    })
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
    console.log(listlangkah);
  }

  langkahcancel(e){
    this.setState({
      tambahlangkah: false
    })
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
    this.setState({
      editlangkah: true,
      handleEditValue2: listlangkah[checker2]
    })
    checker2 = i
  }

  langkahdelete(i){
    listlangkah.splice(i, 1)
    this.setState(function(prevState){
      return {nothing: !prevState.nothing}
    })
  }

  resepSubmit(e){
    e.preventDefault()
    var namaresep = this.state.namaresep;
    var bahan = this.state.bahan;
    var detail = this.state.detail;
    var penulis = localStorage.getItem('token')
    if (namaresep && bahan && detail && penulis && images.length !== 0) {
      this.props.tambahResep(namaresep, bahan, detail, penulis, images)
      images = [];
      this.setState({
        namaresep: '',
        bahan: '',
        detail: '',
        open: true,
        files: []
      })
    }
  }

  render(){
    var styleTambahBahan = {
      cursor: 'pointer',
      padding:' 18px 3px',
      width: '400px',
      height: '60px',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'enigmaticregular',
      backgroundImage: 'linear-gradient(to right, #1b007c, #4d2e9b, #7757bb, #9f81db, #c7adfb)',
      lineHeight: '20px',
      fontSize: '20px',
      marginLeft: '560px',
      border: '1px solid white',
      borderRadius: '4px',
      marginTop: this.state.handler1
    }

    var styleListBahan = {
      width: '400px',
      marginTop: this.state.handler2,
      marginLeft: '560px',
      position: 'absolute'
    }

    var styleNote = {
      position: 'absolute',
      color: '#4d2e9b',
      fontSize: '13px',
      marginLeft: '565px',
      marginTop: this.state.handler3
    }

    const { open } = this.state;
    var list2 = listlangkah.map((f,i) =>
    <div key={i}>
      <div>
        {
          this.state.editlangkah
          ?
          <textarea value={listlangkah[checker2]} maxLength='125' onChange={this.langkahChangeHandlerEdit.bind(this)} placeholder='Edit Langkah' autoFocus autoComplete='off' value={this.state.langkahChangeHandler} className="form-control cidug" />
          :
          <div className='lala'>{listlangkah[i]}</div>
        }
        {
          !this.state.editlangkah &&
          <div>
            <abbr title='Edit langkah'><div className='editlangkah' onClick={()=> this.langkaheditclick(i)}><span className='glyphicon glyphicon-pencil'></span></div></abbr>
            <abbr title='Hapus langkah'><div className='hapuslangkah' onClick={()=> this.langkahdelete(i)}><span className='glyphicon glyphicon-trash'></span></div></abbr>
          </div>
        }
      </div>
    </div>
  )

  var list = listbahan.map((f,i) =>
  <div key={i}>
    <div>
      <div className='lili'>{listbahan[i]}</div>
      {
        !this.state.editing &&
        <div>
          <abbr title='Edit bahan'><div className='editbahan' onClick={()=> this.editClick(i)}><span className='glyphicon glyphicon-pencil'></span></div></abbr>
          <abbr title='Hapus bahan'><div className='deletebahan' onClick={()=> this.onDeleteBahan(i)}><span className='glyphicon glyphicon-trash'></span></div></abbr>
        </div>
      }
    </div>
  </div>
)

return(
  <div>
    <div className='thumbfoto'>
      <section className='rectangle'>
        <Dropzone className='dropzone' onDrop={this.uploadFoto2.bind(this)} accept="image/*" multiple={ false }>
          {
            thumbnailfoto.length === 0 &&
            <div>
              <span id='camera' className='glyphicon glyphicon-camera'></span>
              <p className='klikupload'>Klik untuk upload foto</p>
              <i className='advice'>"untuk hasil terbaik gunakan foto dengan posisi landscape"</i>
            </div>
          }
          {
            thumbnailfoto.length !== 0 &&
            <abbr className='Ganti foto'><div className='gantifoto'>Ganti foto <span className='glyphicon glyphicon-camera'></span></div></abbr>
          }
        </Dropzone>
        {
          thumbnailfoto.length !== 0 &&
          <div className='buangfoto' onClick={this.hapusThumbnailFoto.bind(this)}>Hapus <span className='glyphicon glyphicon-trash'></span></div>
        }
      </section>
      <div className='imgpos'>
        {
          thumbnailfoto.map((f,i) => <img key={i} src={ f.preview } alt="preview" className='thumbnailpreview'/>)
        }
      </div>
    </div>
    <div className='penjalin'>




      <form onSubmit={this.resepSubmit} className='resepformholder'>
        <div className="form-group">
          <p className='labelg'>Nama Resep</p>
          <input autoComplete='off' onChange={this.handleNamaResep.bind(this)} value={this.state.namaresep} type="text" id='formwidth1' className="form-control" formwidthplaceholder="Nama Resep" />
        </div>
      </form>



      <div className="form-group" id='bahanbahanform'>
        <p className='labelg'>Bahan-bahan</p>
      </div>
      <div className='formdivider'>
        <ul>
          {list}
        </ul>
      </div>
      <div className='dummykotak'></div>



      <form id='prosesform' onSubmit={this.langkahSubmit.bind(this)}>
        <div className="form-group">
          <p className='labelg'>Proses Pembuatan</p>
          {
            this.state.tambahlangkah
            ?
            <div>
              <textarea maxLength='125' onChange={this.langkahChangeHandler.bind(this)} placeholder='Tambah Langkah' autoFocus autoComplete='off' value={this.state.langkahChangeHandler} id='formwidth3' className="form-control" />
              <abbr title='Simpan langkah'><div onClick={this.langkahSubmit.bind(this)} className='simpanlangkah'><span className='glyphicon glyphicon-ok'></span></div></abbr>
              <abbr title='Batal'><div onClick={this.langkahcancel.bind(this)} className='langkahbatal'><span className='glyphicon glyphicon-remove'></span></div></abbr>
            </div>
            :
            <div onClick={this.tambahlangkah.bind(this)} className='tambahlangkah'>Tambah Langkah +</div>
          }
          <div className='formdivider2'>
            <ul>
              {list2}
            </ul>
          </div>
        </div>
      </form>



      <section className='rectangle'>
        <Dropzone className='dropzone' onDrop={this.uploadFoto.bind(this)} accept="image/*" multiple={ false }>
          <p className='poto'>Tambahkan foto +</p>
        </Dropzone>
      </section>
      <div className='imgpos'>
        {
          images.map((f,i) => <img key={i} src={ f.preview } alt="preview" className='previewimg'/>)
        }
      </div>
      <button className='bagikan'>Bagikan <span className='glyphicon glyphicon-share'></span></button>
    </div>
    {
      this.state.editing &&
      <div style={styleTambahBahan}>
        <input id='ampasin' onChange={this.handleEditChange.bind(this)} defaultValue={listbahan[checker]} maxLength='48' onKeyDown={this.pseudoSubmit.bind(this)} autoFocus autoComplete='off' type="text" className="form-control" placeholder="Edit Bahan" />
      </div>
    }
    {
      this.state.adding
      ? <form onSubmit={this.bahanSubmit.bind(this)}>
      <div className="form-group">
        <input maxLength='48' ref={input => this.input = input} onKeyUp={this.onCancel.bind(this)} autoFocus autoComplete='off' type="text" style={styleListBahan} className="form-control" placeholder="Tambah Bahan" />
        <p style={styleNote}>Tips: Tekan 'Enter' untuk menambah atau tekan 'ESC' untuk batal </p>
      </div>
    </form>
    : <div onClick={this.toggler.bind(this)} style={styleTambahBahan} >Tambah Bahan +</div>
}
<Navbar />
<div className="example">
  <Modal
    open={open}
    onClose={this.onCloseModal}
    center
    classNames={{
      transitionEnter: 'transition-enter',
      transitionEnterActive: 'transition-enter-active',
      transitionExit: 'transition-exit-active',
      transitionExitActive: 'transition-exit-active',
    }}
    animationDuration={250}
    >
    <div className='modalholder'>
      <p>Resep anda berhasil dibagikan!</p>
      <Link to='/'><button>Lihat Resep</button></Link>
      <hr/>
    </div>
  </Modal>
</div>
</div>
)
}
}
