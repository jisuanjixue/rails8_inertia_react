class Current < ActiveSupport::CurrentAttributes
  # ActiveSupport::CurrentAttributes，是 Rails 中用来管理当前请求上下文的一个工具类。
#   使用场景：
# 这个类通常用于在请求处理过程中存储和访问当前请求的上下文信息。比如在控制器或模型中可以通过 Current.user 直接访问当前用户，而不需要显式地传递用户对象。

  attribute :session #定义了一个 session 属性，用来存储当前请求的会话信息
  attribute :user_agent, :ip_address #同时定义了两个属性：user_agent 和 ip_address，分别用来存储当前请求的用户代理（浏览器信息）和 IP 地址

  delegate :user, to: :session, allow_nil: true #将 user 方法委托给 session 对象，也就是说调用 Current.user 实际上会调用 Current.session.user allow_nil: true 表示如果 session 为 nil 时不会报错，而是返回 nil
end
