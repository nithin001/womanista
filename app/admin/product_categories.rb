ActiveAdmin.register ProductCategory do
	permit_params :name
	
	form do |f|
	    f.semantic_errors :base
	    f.inputs do
	      f.input :name
	    end
	    f.actions
	  end
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

end
