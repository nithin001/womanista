class CreateProductCatalogues < ActiveRecord::Migration[5.2]
  def change
    create_table :product_catalogues do |t|
    	t.string :name
    end
  end
end
