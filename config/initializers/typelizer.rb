# config/initializers/typelizer.rb
if Rails.env.development?

  # 配置输出目录和其他选项
  Typelizer.configure do |config|
    config.listen = true
    config.output_dir = Rails.root.join("app/frontend/types/serializers")
    config.types_import_path = "@/types"
  end
end
