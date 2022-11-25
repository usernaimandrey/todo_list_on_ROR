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

  test '#index with not auth user' do
    delete api_v1_session_path

    get api_v1_todos_path, headers: { Authorization: 'Bearer ' }, as: :json

    assert_response :unauthorized
  end

  test '#create' do
    attrs = {
      text: Faker::Lorem.paragraph,
      state: 'active'
    }

    post api_v1_todos_path, headers: { Authorization: "Bearer #{@jwt_token}" }, params: { todo: attrs }, as: :json

    todo = @user.todos.find_by(attrs)

    assert { todo }
    assert_response :success
  end

  test '#update' do
    todo = todos(:one)

    attrs = {
      state: 'finished'
    }
    patch api_v1_todo_path(todo), headers: { Authorization: "Bearer #{@jwt_token}" }, params: { todo: attrs }, as: :json

    todo.reload

    assert { todo.state == attrs[:state] }
  end

  test '#destroy' do
    todo = todos(:one)

    delete api_v1_todo_path(todo), headers: { Authorization: "Bearer #{@jwt_token}" }

    assert { !@user.todos.find_by(id: todo.id) }
  end
end
