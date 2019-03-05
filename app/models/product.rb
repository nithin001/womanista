class Product < ActiveRecord::Base
	has_many :product_variations, inverse_of: :product
	belongs_to :product_category
	belongs_to :product_catalogue, optional: true

	accepts_nested_attributes_for :product_variations, allow_destroy: true
	
	def self.latest
		order(id: :desc).limit(10)
	end

	def self.featured
		Product.find_by_sql("SELECT rank_filter.* FROM (
	        SELECT products.*, 
	        rank() OVER (
	            PARTITION BY product_category_id
	            ORDER BY id DESC
	        )
	        FROM products
	    ) rank_filter WHERE RANK <= 5")
	end
end