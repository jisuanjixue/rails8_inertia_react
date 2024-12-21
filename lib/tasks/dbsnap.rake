# bin/rails db:snap:list
# bin/rails db:snap:create
# bin/rails db:snap:restore
namespace :db do
  namespace :snap do
    task setup: :environment do
      @snapshot_dir = Rails.root.join('storage/snapshots')
      @db_path = ActiveRecord::Base.connection_db_config.database
      @db_name = @db_path.rpartition('/').last.remove('.sqlite3')
    end

    task setup_snaps: :setup do
      @snaps = Pathname(@snapshot_dir)
               .children
               .select do |path|
        path.extname == '.backup' &&
          path.basename.to_s.include?(@db_name)
      end
        .sort
        .reverse
    end

    desc ''
    task list: :setup_snaps do
      puts @snaps
    end

    desc ''
    task create: :setup do
      timestamp = DateTime.now.to_formatted_s(:number)
      snap_name = "#{@db_name}-#{timestamp}.backup"
      snap_path = Pathname(@snapshot_dir).join(snap_name)

      FileUtils.copy_file(@db_path, snap_path)
    end

    desc ''
    task restore: :setup_snaps do
      latest_snapshot = @snaps.first

      FileUtils.remove_file(@db_path)
      FileUtils.copy_file(latest_snapshot, @db_path)
    end
  end
end
