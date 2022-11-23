# frozen_string_literal: true

class Api::V1::AuthControllerTest < ActionDispatch::IntegrationTest
  test '#signup' do
    attrs = {
      email: 'test@mail.ru',
      password: '123456',
      password_confirmation: '123456'
    }

    post api_v1_auth_path, params: { values: attrs }

    user = User.find_by(email: attrs[:email])

    assert { user }
    assert_response :success
    assert { signed_in? }
  end
end
