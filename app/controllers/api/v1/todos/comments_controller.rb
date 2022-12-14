# frozen_string_literal: true

module Api
  module V1
    class Todos::CommentsController < Api::ApplicationController
      before_action :authenticate_request!

      def create
        @todo = Todo.find_by(id: params[:todo_id])
        @comment = @todo.comments.build(comment_params)
        @comment.user = current_user

        if @comment.save
          render json: @comment
        else
          render json: { status: :unprocessable_entity }
        end
      end

      private

      def comment_params
        params.require(:comment).permit(:text)
      end
    end
  end
end
