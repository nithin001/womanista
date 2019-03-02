import React from "react"
import PropTypes from "prop-types"
require('es6-promise').polyfill();
import fetch from "isomorphic-fetch";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {products: []};
  }

  componentDidUpdate() {
    $('.product-slider').owlCarousel({
      loop: true,
      nav: true,
      dots: false,
      margin : 30,
      autoplay: true,
      navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
      responsive : {
        0 : {
          items: 1,
        },
        480 : {
          items: 2,
        },
        768 : {
          items: 3,
        },
        1200 : {
          items: 4,
        }
      }
    });
  }

  componentDidMount() {
    fetch('/api/products?filter=latest')
    .then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(products => {
        this.setState({products})
    });
  }

  render () {
    if(this.state.products.length === 0) {
      return null;
    }

    return (
      <section className="top-letest-product-section">
        <div className="container">
          <div className="section-title">
            <h2>LATEST PRODUCTS</h2>
          </div>
          <div className="product-slider owl-carousel">
            {this.state.products.map(product=> {
              return (<div className="product-item" key={product.id}>
              <div className="pi-pic">
                <img src={product.image_one.replace(/v(\d*)\//g,'e_trim:30:white/')} alt="" />
              </div>
              <div className="pi-text">
                <p>{product.name}</p>
              </div>
            </div>);
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default Home
