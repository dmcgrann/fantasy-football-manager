class TeamSerializer < ActiveModel::Serializer
  attributes :id, :team_name
  belongs_to :league, serializer: LeagueTeamSerializer
end
