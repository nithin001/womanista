class ProductController < ApplicationController
  def index
  	@product = Product.where(id: product_id).first
  	redirect_to root_path and return unless @product
  end

  def product_id
  	params[:id].to_i if params[:id]
  end
end
