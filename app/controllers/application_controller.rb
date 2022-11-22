# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include AuthConcern

  rescue_from StandardError, with: :record_not_found

  private

  def record_not_found
    redirect_to root_path
  end
end
