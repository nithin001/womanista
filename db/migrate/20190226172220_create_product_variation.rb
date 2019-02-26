class CreateProductVariation < ActiveRecord::Migration[5.2]
  def change
    create_table :product_variations do |t|
    	t.string :size
    	t.string :color
    	t.string :price
    end
  end
end
