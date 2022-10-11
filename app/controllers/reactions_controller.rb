# frozen_string_literal: true

class ReactionsController < ApplicationController
  before_action :set_chirp

  def create
    current_user.reactions.create!(chirp: @chirp, type: params[:reaction_type])

    respond_to do |format|
      format.html do
        redirect_back fallback_location: user_path(@user)
      end
      format.json do
        render json: ChirpPresenter.to_hash(@chirp.reload, current_user)
      end
    end
  end

  def destroy
    current_user.reactions.delete(chirp: @chirp)

    respond_to do |format|
      format.html do
        redirect_back fallback_location: user_path(@user)
      end
      format.json do
        render json: ChirpPresenter.to_hash(@chirp.reload, current_user)
      end
    end
  end

  private

  def set_chirp
    @chirp = Chirp.find(params[:chirp_id])
  end
end
