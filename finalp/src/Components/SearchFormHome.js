import React, {Component} from 'react'

export default class SearchFormHome extends Component {
  constructor(props){
    super(props)

    this.state = {
      handleSearch: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(e){
    this.setState({
      handleSearch: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    let query = this.state.handleSearch;
    this.props.actions.searchModeOn()
    this.props.actions.searching(query)
    this.setState({
      handleSearch: ''
    })
  }

  endSearch(){
    this.props.actions.searchModeOff()
    this.props.actions.loadResep()
  }
  render(){
    const {data, searchmode} = this.props
    return(
      <div>
        {
          searchmode.searchmode &&
          <div>
            <div className='hasilpencarian'>Hasil Pencarian : {data.length === 0 ? 'Tidak ditemukan' : data.length + ' ditemukan'}</div>
            <abbr title='Reset'><div onClick={this.endSearch.bind(this)} className='resetmode'><span className='glyphicon glyphicon-remove'></span></div></abbr>
          </div>
        }
        <form onSubmit={this.handleSubmit} className='formcari'>
          <div className="col-lg-6">
            <div className="input-group">
              <input value={this.state.handleSearch} onChange={this.handleSearch} id='forml' type="text" className="form-control" placeholder="Cari Resep" />
              <span className="input-group-btn">
                <button className="btn btn-default" id='tom' type="submit"><span className='glyphicon glyphicon-search'></span></button>
              </span>
            </div>
          </div>
        </form>
        <p className='kategorirow'>Cari berdasarkan Kategori :</p>
        <ul className='braket'>
          <p className='kategorilist1'>Menu Sahur</p>
          <p className='kategorilist2'>Menu Buka</p>
          <p className='kategorilist3'>Sarapan</p>
          <p className='kategorilist4'>Cemilan</p>
          <p className='kategorilist5'>Makan Siang</p>
          <p className='kategorilist6'>Makan Malam</p>
          <p className='kategorilist7'>Katering</p>
          <p className='kategorilist8'>Perasmanan</p>
          <p className='kategorilist9'>Kue Lebaran</p>
        </ul>
      </div>
    )
  }
}
