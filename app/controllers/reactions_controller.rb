# frozen_string_literal: true

class ReactionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_chirp

  def create
    if Reaction.types.keys.include? params[:reaction_type]
      current_user.reactions.create!(chirp: @chirp, type: params[:reaction_type])
      render json: ChirpPresenter.to_hash(@chirp.reload, current_user)
    else
      render json: { message: "reaction_type query param must be set to one of #{Reaction.types.keys}", status: 400 }, :status => :bad_request
    end
  end

  def destroy
    if Reaction.types.keys.include? params[:reaction_type]
      current_user.reactions.delete(chirp: @chirp)
      render json: ChirpPresenter.to_hash(@chirp.reload, current_user)
    else
      render json: { message: "reaction_type query param must be set to one of #{Reaction.types.keys}", status: 400 }, :status => :bad_request
    end
  end

  private

  def set_chirp
    @chirp = Chirp.find(params[:chirp_id])
  end
end
