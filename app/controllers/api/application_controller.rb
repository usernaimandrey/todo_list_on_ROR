# frozen_string_literal: true

module Api
  class ApplicationController < ApplicationController
    skip_before_action :verify_authenticity_token

    def payload(user)
      return nil unless user

      {
        auth_token: JsonWebToken.encodet({ user_id: user.id }),
        user_id: user.id
      }
    end
  end
end
