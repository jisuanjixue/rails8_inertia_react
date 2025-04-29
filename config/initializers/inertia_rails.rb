InertiaRails.configure do |config|
  # config.ssr_enabled = ViteRuby.config.ssr_build_enabled
  config.version = ViteRuby.digest
  # config.version = lambda { ViteRuby.digest }
  # remove once https://github.com/inertiajs/inertia-rails/pull/196 is merged
  config.encrypt_history = true  # 加密浏览历史记录
  config.ssr_enabled = ENV.fetch("INERTIA_SSR_ENABLED", false)  # 是否启用服务端渲染
  config.ssr_url = ENV.fetch("INERTIA_SSR_URL", "http://localhost:13714")  # SSR 服务地址
end

# remove once https://github.com/inertiajs/inertia-rails/pull/199 is merged
ActionController::Renderers.remove :inertia
ActionController::Renderers.add :inertia do |component, options|
  if component.is_a?(Hash) && options[:props].nil?
    options[:props] = component
    component = true
  end
  InertiaRails::Renderer.new(
    component,
    self,
    request,
    response,
    method(:render),
    props: options[:props],
    view_data: options[:view_data],
    deep_merge: options[:deep_merge],
    encrypt_history: options[:encrypt_history],
    clear_history: options[:clear_history]
  ).render
end
