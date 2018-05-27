import React, {Component} from 'react'

export default class SearchFormNavbar extends Component {
  render(){
    return(
      <form className='formcarikecil'>
        <div className="col-lg-6">
          <div className="input-group">
            <input id='forml2' type="text" className="form-control" placeholder="Cari Resep" />
            <button className="btn btn-default" id='tom2' type="button">Cari</button>
          </div>
        </div>
      </form>
    )
  }
}
