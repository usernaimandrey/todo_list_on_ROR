# frozen_string_literal: true

module Api
  module V1
    class TodosController < Api::ApplicationController
      before_action :authenticate_request!

      def index
        @todos = Todo.includes(:comments).all
        respond_to do |format|
          format.json
        end
      end

      def create
        @todo = Todo.new(todo_params)

        if @todo.save
          render json: @todo
        else
          invalid_resource!(@todo)
        end
      end

      def update
        @todo = Todo.find_by(id: params[:id])
        if @todo.update(todo_params)
          render json: @todo
        else
          invalid_resource!(@todo)
        end
      end

      def destroy
        @todo = Todo.find_by(id: params[:id])
        @todo.destroy
        raise @todo.errors[:base].to_s unless @todo.errors[:base].empty?

        render json: { success: true, id: @todo.id }, status: :no_content
      end

      private

      def todo_params
        params.require(:todo).permit(:text, :state)
      end
    end
  end
end
