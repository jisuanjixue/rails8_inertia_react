require "active_support/concern"

module MeilisearchHandler
  extend ActiveSupport::Concern

  included do
    inertia_share global_search_results: -> {
      if params[:q].present?
        search(params[:q])
      else
        []
      end
    }
  end

  private

  def search(query)
    # Post搜索
    post_results = Post.search(query, {
      attributesToSearchOn: ["title"],
      limit: 5
    }).map do |post|
      {
        type: "post",
        id: post.id,
        title: post.title,
        url: "/posts/#{post.id}"
      }
    end

    # Profile搜索
    profile_results = Profile.search(query, {
      attributesToSearchOn: ["full_name", "name", "tech_stacks"],
      limit: 5
    }).map do |profile|
      {
        type: "profile",
        id: profile.id,
        name: profile.full_name || profile.name,
        tech_stacks: profile.tech_stacks,
        url: "/profiles/#{profile.id}"
      }
    end

    # 合并结果并按相关性排序
    (post_results + profile_results).sort_by { |r| r[:type] }
  end
end
