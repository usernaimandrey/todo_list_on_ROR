# frozen_string_literal: true

json.extract! todo, :id, :text, :state

json.comments todo.comments, :id, :text, :todo_id
