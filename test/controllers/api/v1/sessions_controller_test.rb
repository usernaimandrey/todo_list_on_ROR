# frozen_string_literal: true

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  test '#create' do
    user = users(:one)
    attrs = {
      email: user.email,
      password: 'password'
    }

    post api_v1_session_path, params: { values: attrs }

    assert_response :success
    assert { signed_in? }
  end

  test '#destroy' do
    sign_in_as(:one)

    assert { signed_in? }

    delete api_v1_session_path

    assert_response :success
  end
end
