class Api::ProductsController < ApplicationController
	def index
		products = Product.includes(:product_variations).all
		render json: products, :include => [:product_variations]
	end
end