# frozen_string_literal: true

require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test '#index' do
    get root_path

    assert_response :success
  end
end
