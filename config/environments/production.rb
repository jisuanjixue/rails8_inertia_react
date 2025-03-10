require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # Code is not reloaded between requests.
  config.enable_reloading = false

  # Eager load code on boot for better performance and memory savings (ignored by Rake tasks).
  config.eager_load = true

  # Full error reports are disabled.
  config.consider_all_requests_local = false

  # Turn on fragment caching in view templates.
  config.action_controller.perform_caching = true

  # Cache assets for far-future expiry since they are all digest stamped.
  config.public_file_server.headers = {"cache-control" => "public, max-age=#{1.year.to_i}"}

  # Enable serving of images, stylesheets, and JavaScripts from an asset server.
  config.asset_host = "https://www.blog_demo.dev"

  # Store uploaded files on the local file system (see config/storage.yml for options).
  config.active_storage.service = :local

  # Assume all access to the app is happening through a SSL-terminating reverse proxy.
  config.assume_ssl = true # 假设所有请求都经过SSL代理

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  config.force_ssl = true

  # Skip http-to-https redirect for the default health check endpoint.
  # config.ssl_options = { redirect: { exclude: ->(request) { request.path == "/up" } } }

  # Log to STDOUT with the current request id as a default log tag.
  config.log_tags = [:request_id] # 日志中添加请求ID
  config.logger = ActiveSupport::TaggedLogging.logger($stdout)

  # Change to "debug" to log everything (including potentially personally-identifiable information!)
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info") # 日志级别

  # Prevent health checks from clogging up the logs.
  config.silence_healthcheck_path = "/up" # 忽略健康检查日志

  # Don't log any deprecations.
  config.active_support.report_deprecations = false

  # Replace the default in-process memory cache store with a durable alternative.
  config.cache_store = :solid_cache_store

  # Replace the default in-process and non-durable queuing backend for Active Job.
  config.active_job.queue_adapter = :solid_queue # 使用Solid Queue作为后台任务队列
  config.solid_queue.connects_to = {database: {writing: :queue, reading: :queue}}

  config.action_mailer.perform_caching = false

  config.session_store :cookie_store, key: "__Secure-#{Rails.application.class.module_parent.name.underscore}-#{Rails.env}"

  # Ignore bad email addresses and do not raise email delivery errors.
  # Set this to true and configure the email server for immediate delivery to raise delivery errors.
  # config.action_mailer.raise_delivery_errors = false

  # Set host to be used by links generated in mailer templates.
  config.action_mailer.default_url_options = {host: "blog_demo.dev"}

  # Specify outgoing SMTP server. Remember to add smtp/* credentials via rails credentials:edit.
  # config.action_mailer.smtp_settings = {
  #   user_name: Rails.application.credentials.dig(:smtp, :user_name),
  #   password: Rails.application.credentials.dig(:smtp, :password),
  #   address: "smtp.example.com",
  #   port: 587,
  #   authentication: :plain
  # }

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation cannot be found).
  config.i18n.fallbacks = true

  # Do not dump schema after migrations.
  config.active_record.dump_schema_after_migration = false # 迁移后不导出schema

  # Only use :id for inspections in production.
  config.active_record.attributes_for_inspect = [:id] # 只显示id字段

  # Enable DNS rebinding protection and other `Host` header attacks.
  # 防止DNS重绑定攻击
  config.hosts = [
    "blog_demo.dev",     # Allow requests from example.com
    /.*\.blog_demo\.dev/ # Allow requests from subdomains like `www.example.com`
  ]
  #
  # Skip DNS rebinding protection for the default health check endpoint.
  config.host_authorization = {exclude: ->(request) { request.path == "/up" }}

  config.active_record.action_on_strict_loading_violation = :log
  # Configure Solid Errors
  config.solid_errors.connects_to = {database: {writing: :errors}}
  config.solid_errors.send_emails = true
  config.solid_errors.email_from = ""
  config.solid_errors.email_to = ""
  config.solid_errors.username = Rails.application.credentials.dig(:solid_errors, :username)
  config.solid_errors.password = Rails.application.credentials.dig(:solid_errors, :password)
end
