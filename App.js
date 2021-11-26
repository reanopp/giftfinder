import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    fetch('https://api.airtable.com/v0/appe8xWJ8gEiotJoI/catalogue?api_key=key0cGZq93IZMbTic')
    .then((resp) => resp.json())
    .then(data => {
      console.log(data);
      this.setState({ products: data.records });
    }).catch(err => {
      // Error
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card-deck">
              {this.state.products.map(product => <ProductCard key={product.fields.ID} {...product.fields} /> )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function productClicked(ID) {
  var elemName = "carditem" + ID;
  console.log(elemName);
  document.getElementById(ID).remove();
}

export default App;

const ProductCard = ({ ID, Name, Categories, SKU, Weight, Tags, Images }) => (

  <div id={ID} className="card" onClick={() => productClicked(ID)}>

    <table className="table-product">
      <tbody>
        <tr>
          <td>
            <div className="card-body">
              <h5 className="card-title">{Name}</h5>
              <p className="card-text">{Categories}</p>
              <p className="card-text">
                <small className="text-muted">SKU: {SKU}</small>
              </p>
              <p className="card-text">
                <small className="text-muted">Tags: <b>{Tags}</b></small>
              </p>
              <p className="card-text">
                <small className="text-muted">Weight: {Weight}</small>
              </p>
            </div>
          </td>
          <td>
            <div className="card-image">
              <img className="card-img-top" src={Images} alt="Product poster" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
  
);
