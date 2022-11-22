# frozen_string_literal: true

class JsonWebToken
  class << self
    def encodet(payload)
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end

    def decodet(token)
      ActiveSupport::HashWithIndifferentAccess.new(JWT.decode(token, Rails.application.secrets.secret_key_base)[0])
    rescue StandardError
      nil
    end
  end
end
