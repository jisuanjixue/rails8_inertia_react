namespace :meilisearch do
  desc "Sync all models with Meilisearch"
  task sync: :environment do
    puts "Syncing Posts..."
    Post.reindex!
    puts "Done!"
  end
end
