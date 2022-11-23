# frozen_string_literal: true

class Todo < ApplicationRecord
  validates :text, presence: true

  has_many :comments, dependent: :destroy

  belongs_to :user
end
