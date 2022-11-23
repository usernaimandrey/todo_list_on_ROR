# frozen_string_literal: true

class Api::V1::TodosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    sign_in_as(:one)
    @jwt_token = JsonWebToken.encodet({ user_id: @user.id })
  end

  test '#index' do
    assert { signed_in? }
    get api_v1_todos_path, headers: { Authorization: "Bearer #{@jwt_token}" }, as: :json

    assert_response :success
  end

  test '#create' do
    attrs = {
      text: Faker::Lorem.paragraph,
      state: 'active'
    }

    post api_v1_todos_path, headers: { Authorization: "Bearer #{@jwt_token}" }, as: :json, params: { todo: attrs }, as: :json

    todo = @user.todos.find_by(attrs)

    assert { todo }
    assert_response :success
  end
end
