# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :todo
  belongs_to :user
end
