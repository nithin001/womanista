class AddRatingToProduct < ActiveRecord::Migration[5.2]
  def change
  	add_column :products, :rating, :float
  end
end
