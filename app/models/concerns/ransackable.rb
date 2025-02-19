module Ransackable
  extend ActiveSupport::Concern

  class_methods do
    def ransackable_attributes(auth_object = nil)
      return (column_names + ransackers.keys) if auth_object == :admin

      const_defined?(:RANSACK_ATTRIBUTES) ? self::RANSACK_ATTRIBUTES : []
    end

    def ransackable_associations(auth_object = nil)
      return reflect_on_all_associations.map { |a| a.name.to_s } if auth_object == :admin

      const_defined?(:RANSACK_ASSOCIATIONS) ? self::RANSACK_ASSOCIATIONS : []
    end
  end
end

# 这个Ransackable模块是用来控制Ransack搜索功能的权限和可用字段的。我来解释下具体代码：
# 1. ransackable_attributes方法：
# 当auth_object是:admin时，返回所有数据库字段名(column_names)加上自定义ransacker字段(ransackers.keys)
# 否则检查模型是否定义了RANSACK_ATTRIBUTES常量，有则返回，没有返回空数组
# 2. ransackable_associations方法：
# 当auth_object是:admin时，返回所有关联关系
# 否则检查模型是否定义了RANSACK_ASSOCIATIONS常量，有则返回，没有返回空数组
# 在Post模型中：
# 通过include Ransackable混入这个模块
# 定义了RANSACK_ATTRIBUTES = %w[body content title created_at updated_at].freeze，表示普通用户只能搜索这些字段
# 作用：
# 实现权限控制：管理员可以搜索所有字段和关联，普通用户只能搜索指定字段
# 提高安全性：防止用户通过搜索接口访问敏感数据
# 灵活配置：通过常量控制可搜索字段，便于维护
# 使用场景：
# 在后台管理界面，管理员可以搜索所有字段
# 在前台搜索功能中，普通用户只能搜索指定字段
# 这个设计模式在Rails中很常见，通过concern模块实现可复用的功能，同时保持代码整洁。
