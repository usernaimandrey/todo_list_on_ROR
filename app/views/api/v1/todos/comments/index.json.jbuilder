# frozen_string_literal: true

json.array! @comments, partial: 'api/v1/todos/comments/comment', as: :comment
