# frozen_string_literal: true

class Todo < ApplicationRecord
  has_many :comments, dependent: :destroy
end
