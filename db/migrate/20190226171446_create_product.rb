class CreateProduct < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
    	t.string :name
    	t.string :link
    	t.string :description
    	t.string :image_one
		t.string :image_two
    end
  end
end
