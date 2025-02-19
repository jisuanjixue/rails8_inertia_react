module Paginatable
  extend ActiveSupport::Concern
  
  included do
    def paginate(collection)
      begin
        pagy, paged_collection = pagy(collection)
      rescue Pagy::OverflowError
        pagy = Pagy.new(count: collection.count, page: params[:page], items: params[:limit])
        paged_collection = collection.offset(pagy.offset).limit(pagy.items)
      end
      [pagy, paged_collection]
    end
  end
end