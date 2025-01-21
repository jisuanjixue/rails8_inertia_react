source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails', '~> 8.0'
# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem 'propshaft'
# Use sqlite3 as the database for Active Record
gem 'sqlite3', '>= 2.1'
# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '>= 5.0'
# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
# gem "importmap-rails"
# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
# gem "turbo-rails"
# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
# gem "stimulus-rails"
# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem 'jbuilder'

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
gem 'bcrypt', '~> 3.1.7'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[windows jruby]

# Use the database-backed adapters for Rails.cache, Active Job, and Action Cable
gem 'solid_cable'
gem 'solid_cache'
gem 'solid_queue'

gem 'ransack', '~> 4.1'

gem 'pagy', '~> 9.3'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Deploy this application anywhere as a Docker container [https://kamal-deploy.org]
gem 'kamal', require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem 'thruster', require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem 'image_processing', '~> 1.2'
gem 'mini_magick', '~> 4.11'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri windows], require: 'debug/prelude'

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem 'brakeman', require: false
  # Autoload dotenv in Rails. (https://github.com/bkeepers/dotenv)
  gem 'dotenv-rails'
end

group :development do
  gem 'annotaterb'
  gem 'bullet'
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem 'web-console'

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  gem 'rack-mini-profiler'

  # For call-stack profiling flamegraphs
  gem 'stackprof'

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"

  # Use listen to watch files for changes [https://github.com/guard/listen]
  gem 'listen', '~> 3.5'
  gem 'overmind', require: false
  gem 'ruby-lsp', require: false

  gem 'authentication-zero', require: false
  gem 'debugbar', '~> 0.3.3'
  gem 'erb_lint', require: false
  gem 'ruby-lsp-rails', require: false
  gem 'standardrb', '~> 1.0', require: false
end

gem 'inertia_rails-contrib', '~> 0.3.0'

gem 'vite_rails', '~> 3.0'

gem 'cancancan', '~> 3.6'

gem 'typelizer', '~> 0.1.5'

gem 'alba', '~> 3.5'

# Use OmniAuth to support multi-provider authentication [https://github.com/omniauth/omniauth]
gem 'omniauth'
gem 'omniauth-github'

# Provides a mitigation against CVE-2015-9284 [https://github.com/cookpad/omniauth-rails_csrf_protection]
gem 'omniauth-rails_csrf_protection'

gem 'jwt', '~> 2.9'

gem 'apicraft-rails', '~> 1.0'

gem "meilisearch-rails", "~> 0.14.1"

gem "solid_errors", "~> 0.6.1"
