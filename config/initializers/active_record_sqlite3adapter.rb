module RailsExt
  module SQLite3Adapter
    # Perform any necessary initialization upon the newly-established
    # @raw_connection -- this is the place to modify the adapter's
    # connection settings, run queries to configure any application-global
    # "session" variables, etc.
    #
    # Implementations may assume this method will only be called while
    # holding @lock (or from #initialize).
    #
    # extends https://github.com/rails/rails/blob/main/activerecord/lib/active_record/connection_adapters/sqlite3_adapter.rb#L691
    def configure_connection
      if @config[:timeout] && @config[:retries]
        raise ArgumentError, 'Cannot specify both timeout and retries arguments'
      elsif @config[:retries]
        # see: https://www.sqlite.org/c3ref/busy_handler.html
        @raw_connection.busy_handler do |count|
          count <= @config[:retries]
        end
      end

      super

      @config[:pragmas].each do |key, value|
        raw_execute("PRAGMA #{key} = #{value}", 'SCHEMA')
      end

      @raw_connection.enable_load_extension(true)
      @config[:extensions].each do |extension_name|
        require extension_name
        extension_classname = extension_name.camelize
        extension_class = extension_classname.constantize
        extension_class.load(@raw_connection)
      rescue LoadError
        Rails.logger.error("Failed to find the SQLite extension gem: #{extension_name}. Skipping...")
      rescue NameError
        Rails.logger.error("Failed to find the SQLite extension class: #{extension_classname}. Skipping...")
      end
      @raw_connection.enable_load_extension(false)
    end
  end
end
