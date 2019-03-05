import React from "react"
import PropTypes from "prop-types"
require('es6-promise').polyfill();
import fetch from "isomorphic-fetch";
import Rating from "react-rating";

const sizes = ['XS','S', 'M', 'L', 'XL', 'XXL'];

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {available: false};
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.id}`)
    .then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(product => {
        this.setState({...product, available: true})
    });
  }

  componentDidUpdate() {
    $('.product-thumbs-track > .pt').on('click', function(){
    $('.product-thumbs-track .pt').removeClass('active');
    $(this).addClass('active');
    var imgurl = $(this).data('imgbigurl');
    var bigImg = $('.product-big-img').attr('src');
    if(imgurl != bigImg) {
        $('.product-big-img').attr({src: imgurl});
        $('.zoomImg').attr({src: imgurl});
      }
    });
    $('.product-pic-zoom').zoom();
  }

  render () {
    console.log()

    if(!this.state.available) {
      return null;
    }
    const product = this.state;
    console.log(Array.from(product.product_variations.map(variation=>variation.color)));
    return (
      <section className="product-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-pic-zoom">
                <img className="product-big-img" src={product.image_one} alt="" />
              </div>
              {product.image_two && (<div className="product-thumbs" tabindex="1">
                <div className="product-thumbs-track">
                  <div className="pt active" data-imgbigurl={product.image_one}><img src={product.image_one} alt="" /></div>
                  <div className="pt" data-imgbigurl={product.image_two}><img src={product.image_two} alt="" /></div>
                </div>
              </div>)}
            </div>
            <div className="col-lg-6 product-details">
              <h2 className="p-title">{product.name}</h2>
              <h3 className="p-price">From {product.product_variations[0].price} Rs</h3>
              <div className="p-rating">
                <Rating 
                  readonly 
                  emptySymbol={<i className="far fa-star"></i>} 
                  fullSymbol={<i className="fas fa-star"></i>}
                  start={0}
                  stop={5}
                  step={1}
                  initialRating={product.rating}
                />
              </div>
              <div className="fw-size-choose">
                <p>Available Sizes</p>
                {product.product_variations.map((variation, index) => {
                  return (<div key={index} className="sc-item">
                  <label for="xs-size">{sizes[variation.size-1]}</label>
                </div>)
                })}
              </div>
              <div className="fw-size-choose">
                <p>Available Colors</p>
                {Array.from(new Set(product.product_variations.map(variation=>variation.color))).map((color, index) => {
                  return (<div key={index} className="sc-item">
                  <label for="xs-size" style={{backgroundColor: color, border: '1px solid #d3d3d3'}}/>
                </div>)
                })}
              </div>
              <a href={product.link} target={'_blank'} className="site-btn text-white">View on Amazon</a>
              <div id="accordion" className="accordion-area">
                <div className="panel">
                  <div className="panel-header" id="headingOne">
                    <button className="panel-link active" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">information</button>
                  </div>
                  <div id="collapse1" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="panel-body" dangerouslySetInnerHTML={{__html: product.description}}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Product;
