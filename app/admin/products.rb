ActiveAdmin.register Product do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

 permit_params :name, :description, :link, :image_one, :image_two, :product_category_id,
 product_variations_attributes: [ :size, :color, :price, :id, :_destroy]

 form do |f|
 	f.inputs do
 		f.input :product_category
		f.input :name
		f.input :link
		f.input :description, as: :froala_editor
		f.input :image_one
		f.input :image_two

		f.has_many :product_variations, allow_destroy: true do |product_variation|
		    product_variation.inputs "Product product_variations" do
		    	product_variation.input :size, collection: Size.all
		    	product_variation.input :color, :input_html => { :class => 'some_style', :rows => 2, :style => 'width:10%'}
		    	product_variation.input :price, :input_html => { :class => 'some_style', :rows => 2, :style => 'width:10%'}
		    end
		end
	end
	f.actions
    end
end
