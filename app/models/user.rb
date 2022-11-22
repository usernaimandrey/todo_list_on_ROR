class User < ApplicationRecord
  before_save { self.email == email.downcase }

  validates :email, presence: true
  validates :email, uniqueness: { case_sensitive: false }

  has_secure_password
end
