class Api::ProductsController < ApplicationController
	def index
		products = latest? ?  Product.includes(:product_variations).latest : Product.includes(:product_variations).all 
		render json: products, :include => [:product_variations]
	end

	def show
		product = Product.find(params[:id])
		render json: product, :include => [:product_variations]
	end

	private

	def latest?
		params[:filter].present? && params[:filter]=='latest'
	end
end