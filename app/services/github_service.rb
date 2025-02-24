class GithubService
  include HTTParty
  base_uri "https://api.github.com"

  def self.user_repos(username)
    Rails.cache.fetch("github_repos/#{username}", expires_in: 1.hour) do
      response = get("/users/#{username}/repos",
        headers: {"Accept" => "application/vnd.github.v3+json"})

      return [] unless response.success?

      response.parsed_response.map do |repo|
        {
          name: repo["name"],
          stars: repo["stargazers_count"],
          url: repo["html_url"]
        }
      end
    end
  rescue => e
    Rails.logger.error("GitHub API error: #{e.message}")
    []
  end
end
