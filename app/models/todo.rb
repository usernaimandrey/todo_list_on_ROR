class Todo < ApplicationRecord
  has_many :comments, dependent: :destroy
end
