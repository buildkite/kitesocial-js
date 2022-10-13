# frozen_string_literal: true

class ReactionsController < ApplicationController
  skip_before_action :verify_authenticity_token
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
    current_user.reactions.where(chirp: @chirp).destroy_all

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
