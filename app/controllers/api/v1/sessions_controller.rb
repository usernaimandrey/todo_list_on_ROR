# frozen_string_literal: true

module Api
  module V1
    class SessionsController < Api::ApplicationController
      def create
        user = User.find_by(email: permited_params[:email])
        if user&.authenticate(permited_params[:password])
          sign_in(user)
          render json: payload(user)
        else
          render json: {
            status: 404,
            error: 'Check login and password'
          }
        end
      end

      def destroy
        return unless signed_in?

        sign_out
        render json: { status: 200 }
      end

      private

      def permited_params
        params.require(:values).permit(:email, :password)
      end
    end
  end
end
