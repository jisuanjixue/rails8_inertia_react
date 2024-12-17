require 'active_support/concern'

module StrongParams
  extend ActiveSupport::Concern

  class_methods do
    def strong_params(name, options = {}, &block)
      param_method_name = :"#{name}_params"

      define_method param_method_name do
        if block_given?
          return params.require(name).instance_exec(&block)
        end

        if options[:permit!].present?
          return params.require(name).permit!
        end

        if options[:permit].blank?
          return params.fetch(name, {})
        end

        params.require(name).permit(Array(options[:permit]))
      end
    end

  end
end
