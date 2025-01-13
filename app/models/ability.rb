# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # 未登录用户

    # 所有用户都能查看文章
    can :read, Post

    if user.persisted? # 已登录用户
      # 只能编辑/更新/删除自己的文章
      can [:edit, :update, :destroy], Post, user_id: user.id

      # 登录用户可以创建文章
      can :create, Post

      # 如果需要上传封面
      can :upload_cover, Post
    end
  end
end
