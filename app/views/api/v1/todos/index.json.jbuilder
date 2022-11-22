# frozen_string_literal: true

json.array! @todos, partial: 'api/v1/todos/todo', as: :todo
