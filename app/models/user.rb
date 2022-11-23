# frozen_string_literal: true

class User < ApplicationRecord
  before_save { email == email.downcase }

  validates :email, presence: true
  validates :email, uniqueness: { case_sensitive: false }

  has_many :todos, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_secure_password
end
