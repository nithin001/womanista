class AddProductCatalogueRefToProduct < ActiveRecord::Migration[5.2]
  def change
    add_reference :products, :product_catalogue, foreign_key: true
  end
end
