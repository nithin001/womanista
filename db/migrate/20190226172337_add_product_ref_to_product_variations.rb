class AddProductRefToProductVariations < ActiveRecord::Migration[5.2]
  def change
    add_reference :product_variations, :product, foreign_key: true
  end
end
