import React from "react"
import PropTypes from "prop-types"
require('es6-promise').polyfill();
import fetch from "isomorphic-fetch";

const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }), 
  {},
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {products: [], categories: []};
  }

  componentDidMount() {
    fetch('/api/products?filter=featured')
    .then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(products => {
        this.setState({products})
    });
    fetch('/api/product_categories')
    .then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(categories => {
        this.setState({categories})
    });
  }

  render () {
    if(this.state.products.length === 0 || this.state.categories.length ===0) {
      return null;
    }
    const categories = groupBy(this.state.products, 'product_category_id')
    return (
      <section className="feature_product_area section_gap">
        <div className="main_box">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="main_title">
                  <h2>Featured Products</h2>
                  <p>The latest products we have picked (specially for you, as always).</p>
                  <br />
                </div>
              </div>
            </div>
            {Object.keys(categories).map(category => {
              const categoryName = this.state.categories.filter(cat=> cat.id == category)[0].name
              return <React.Fragment key={category}><div className="row">
                  <div className="col-xl-12">
                    <div className="main_title">
                      <h6>{categoryName}</h6>
                      <hr />
                    </div>
                  </div>
                </div><div className="row">
                {categories[category].map((product, index)=> {
                  return (<div className={`col col${index+1}`} key={product.id}>
                    <div className="f_p_item">
                      <div className="f_p_img">
                        <a href={`/product/${product.id}`} target='_blank'>
                          <img src={product.image_one.replace(/v(\d*)\//g,'e_trim:30:white/')} alt="" className="img-fluid"/>
                        </a>
                      </div>
                    </div>
                  </div>)})}
              </div></React.Fragment>})}
        </div>
        </div>
      </section>
    );
  }
}

export default Home;
