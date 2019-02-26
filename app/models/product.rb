class Product < ActiveRecord::Base
	has_many :product_variations, inverse_of: :product
	belongs_to :product_category

	accepts_nested_attributes_for :product_variations, allow_destroy: true
end