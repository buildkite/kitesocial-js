class CreateReactions < ActiveRecord::Migration[6.0]
  def change
    create_table :reactions do |t|
      t.references :reacter, null: false, foreign_key: { to_table: :users }
      t.references :chirp, null: false, foreign_key: { to_table: :chirps }

      t.integer :type, default: 0
      t.timestamps
    end
  end
end
