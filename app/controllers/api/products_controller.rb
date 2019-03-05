class Api::ProductsController < ApplicationController
	def index
		render json: get_products, :include => [:product_variations]
	end

	def show
		product = Product.find(params[:id])
		render json: product, :include => [:product_variations]
	end

	private

	def get_products
		if latest?
			Product.includes(:product_variations).latest
		elsif featured?
			Product.includes(:product_variations).featured
		else
			Product.includes(:product_variations).all 
		end
	end

	def latest?
		params[:filter].present? && params[:filter]=='latest'
	end

	def featured?
		params[:filter].present? && params[:filter]=='featured'
	end
end