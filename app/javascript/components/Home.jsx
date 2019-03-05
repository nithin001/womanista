import React from "react"
import PropTypes from "prop-types"
require('es6-promise').polyfill();
import fetch from "isomorphic-fetch";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {products: []};
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
      <section className="feature_product_area section_gap">
        <div className="main_box">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="main_title">
                  <h2>Featured Products</h2>
                  <p>These are the latest products we have picked (specially for you, as always).</p>
                </div>
              </div>
            </div>
            <div className="row">
              {this.state.products.map((product, index)=> {
              return (<div className={`col col${index+1}`} key={product.id}>
                <div className="f_p_item">
                  <div className="f_p_img">
                    <img src={product.image_one.replace(/v(\d*)\//g,'e_trim:30:white/')} alt="" className="img-fluid"/>
                    <div className="p_icon">
                      <a href="#">
                        <i className="far fa-heart"></i>
                      </a>
                    </div>
                  </div>
                  <a href="#">
                    <h4>{product.name}</h4>
                  </a>
                </div>
              </div>)})}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
