class UsersController < ApplicationController
  include SessionsHelper

    def index
    end

    def new
      @user = User.new
    end

    def create
      @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id
        redirect_to user_path(@user)
      else
        redirect_to new_user_path
      end
    end

    def show
      @user = User.find_by(id: session[:user_id])
      redirect_to root_path if !current_user
    end

    private

    def user_params
      params.require(:user).permit(:name, :password, :uid, :provider, :oauth_token)
    end
end