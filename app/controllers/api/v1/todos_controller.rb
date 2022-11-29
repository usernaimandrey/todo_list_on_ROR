# frozen_string_literal: true

module Api
  module V1
    class TodosController < Api::ApplicationController
      before_action :authenticate_request!

      def index
        @todos = current_user.todos.includes(:comments).all
        respond_to do |format|
          format.json
        end
      end

      def create
        @todo = Todo.new(todo_params)
        @todo.user = current_user

        if @todo.save
          render json: @todo, only: %i[id text state]
        else
          render json: { status: :unprocessable_entity }
        end
      end

      def update
        @todo = current_user.todos.find_by(id: params[:id])
        if @todo.update(todo_params)
          render json: @todo, only: %i[id text state]
        else
          render json: { status: :unprocessable_entity }
        end
      end

      def destroy
        @todo = current_user.todos.find_by(id: params[:id])
        @todo.destroy
        raise @todo.errors[:base].to_s unless @todo.errors[:base].empty?

        render json: { success: true, id: @todo.id }
      end

      private

      def todo_params
        params.require(:todo).permit(:text, :state)
      end
    end
  end
end
