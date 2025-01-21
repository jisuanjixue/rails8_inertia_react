# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy.
# See the Securing Rails Applications Guide for more information:
# https://guides.rubyonrails.org/security.html#content-security-policy-header

Rails.application.configure do
  config.content_security_policy do |policy|
    policy.default_src :none
    policy.base_uri :self
    policy.connect_src :self
    policy.form_action :self
    policy.font_src :self, :data
    policy.img_src(*%i[self data https].compact)
    policy.media_src :self
    policy.object_src :none
    policy.manifest_src :self
    policy.script_src :self
    policy.style_src :self
    policy.frame_ancestors :none
    # Allow @vite/client to hot reload javascript changes in development
    if Rails.env.development?
      policy.connect_src :self,
        # Allow @vite/client to hot reload changes
        "ws://#{ViteRuby.config.host_with_port}"

      policy.script_src :self,
        # Allow @vite/client to hot reload JavaScript changes
        "http://#{ViteRuby.config.host_with_port}",
        # Allow Inertia.js to display error modal
        :unsafe_inline

      policy.style_src :self,
        # Allow @vite/client to hot reload CSS changes
        :unsafe_inline
    else
      policy.script_src(*[:self].compact)
      policy.style_src :self,
        # Allow @inertiajs/progress to display progress bar
        "'sha256-kCeyw5rRT2DINADvWYmAhXLhQs4dKZrnn2sofIDmprs='"
    end

    # You may need to enable this in production as well depending on your setup.
    #  policy.script_src *policy.script_src, :blob if Rails.env.test?

    # policy.style_src :self, :https
    # Allow @vite/client to hot reload style changes in development
    policy.style_src(*policy.style_src, :unsafe_inline) if Rails.env.development?

    # Specify URI for violation reports
    # policy.report_uri "/csp-violation-report-endpoint"
  end

  # Generate session nonces for permitted importmap, inline scripts, and inline styles.
  config.content_security_policy_nonce_generator = ->(request) { request.session.id.to_s }
  config.content_security_policy_nonce_directives = %w[script-src style-src]

  # Report violations without enforcing the policy.
  # config.content_security_policy_report_only = true
end
