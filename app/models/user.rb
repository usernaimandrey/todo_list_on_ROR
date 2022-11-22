# frozen_string_literal: true

class User < ApplicationRecord
  before_save { email == email.downcase }

  validates :email, presence: true
  validates :email, uniqueness: { case_sensitive: false }

  has_secure_password
end
