class LeagueSerializer < ActiveModel::Serializer
  attributes :id, :name, :scoring, :draft
  has_many :teams
end
