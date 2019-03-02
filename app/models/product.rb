class Product < ActiveRecord::Base
	has_many :product_variations, inverse_of: :product
	belongs_to :product_category
	belongs_to :product_catalogue, optional: true

	accepts_nested_attributes_for :product_variations, allow_destroy: true
	
	def self.latest
		order(id: :desc).limit(10)
	end

end