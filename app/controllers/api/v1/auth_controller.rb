# frozen_string_literal: true

module Api
  module V1
    class AuthController < Api::ApplicationController
      def signup
        @user = User.new(auth_params)
        if @user.save
          sign_in(@user)
          render json: payload(@user)
        else
          render json: {
            error: "User with email #{params[:email]} alredy exist."
          }, status: :unprocessable_entity
        end
      end

      def auth_params
        params.require(:values).permit(:email, :password, :password_confirmation)
      end
    end
  end
end
