class Reaction < ApplicationRecord
  # disable STI
  self.inheritance_column = nil

  belongs_to :reacter, class_name: "User"
  belongs_to :chirp, class_name: "Chirp"

  enum type: {
    like: 0,
    lol: 1,
    vom: 2
  }
end
