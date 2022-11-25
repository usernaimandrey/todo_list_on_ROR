# frozen_string_literal: true

class Api::V1::Todos::CommensControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    sign_in_as(:one)
    @jwt_token = JsonWebToken.encodet({ user_id: @user.id })
  end

  test '#create' do
    todo = todos(:no_comments)
    attrs = {
      text: Faker::Lorem.paragraph
    }

    post api_v1_todo_comments_path(todo), headers: { Authorization: "Bearer #{@jwt_token}" }, params: { comment: attrs }, as: :json

    new_comment = todo.comments.find_by(attrs)

    assert { new_comment }
    assert_response :success
  end

  test '#create with not auth user' do
    todo = todos(:no_comments)
    attrs = {
      text: Faker::Lorem.paragraph
    }

    post api_v1_todo_comments_path(todo), headers: { Authorization: 'Bearer' }, params: { comment: attrs }, as: :json

    new_comment = todo.comments.find_by(attrs)

    assert { !new_comment }
    assert_response :unauthorized
  end
end
