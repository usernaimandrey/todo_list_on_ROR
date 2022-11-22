# frozen_string_literal: true

module Api
  class ApplicationController < ApplicationController
    skip_before_action :verify_authenticity_token
  end
end
