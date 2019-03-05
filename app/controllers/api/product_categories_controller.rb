class Api::ProductCategoriesController < ApplicationController
	def index
		render json: ProductCategory.all
	end
end