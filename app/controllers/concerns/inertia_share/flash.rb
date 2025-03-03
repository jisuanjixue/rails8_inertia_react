module InertiaShare
  module Flash
    extend ActiveSupport::Concern

    included do
      inertia_share flash: -> { flash.to_hash }
    end
  end
end
