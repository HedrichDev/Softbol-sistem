import React from 'react';
import { Trophy, Users, Calendar, TrendingUp, Award, Target } from 'lucide-react';
import { useData } from '../context/DataContext';

const Dashboard = () => {
  const { players, teams, getTopPlayers, getTeamStats } = useData();

  const topBatters = getTopPlayers('batting', 5);
  const topPitchers = getTopPlayers('pitching', 3);
  const teamStats = getTeamStats();

  const stats = [
    {
      name: 'Total Jugadores',
      value: players.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Equipos Activos',
      value: teams.length,
      icon: Trophy,
      color: 'bg-green-500',
      change: '+2',
      changeType: 'positive'
    },
    {
      name: 'Partidos Jugados',
      value: '24',
      icon: Calendar,
      color: 'bg-purple-500',
      change: '+8',
      changeType: 'positive'
    },
    {
      name: 'Promedio Liga',
      value: '0.285',
      icon: Target,
      color: 'bg-orange-500',
      change: '+0.015',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Dashboard - Liga Risaraldense
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Resumen general de estadísticas y rendimiento de la temporada actual
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="stat-card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                        <span className="ml-1">{stat.change}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Bateadores */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Top 5 Bateadores</h3>
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            {topBatters.length > 0 ? (
              topBatters.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {player.stats.avg.toFixed(3)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {player.stats.hits}/{player.stats.atBats} AB
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay datos de bateadores disponibles
              </p>
            )}
          </div>
        </div>

        {/* Top Pitchers */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Top 3 Pitchers</h3>
            <Trophy className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            {topPitchers.length > 0 ? (
              topPitchers.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {player.stats.wins}-{player.stats.losses}
                    </p>
                    <p className="text-xs text-gray-500">
                      {player.stats.strikeouts} K
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay datos de pitchers disponibles
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Clasificación de Equipos */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Clasificación de Equipos</h3>
          <Trophy className="h-5 w-5 text-green-500" />
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Pos</th>
                <th className="table-header">Equipo</th>
                <th className="table-header">JJ</th>
                <th className="table-header">JG</th>
                <th className="table-header">JP</th>
                <th className="table-header">AVG</th>
                <th className="table-header">CA</th>
                <th className="table-header">CC</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamStats.length > 0 ? (
                teamStats.map((team, index) => (
                  <tr key={team.id} className="hover:bg-gray-50">
                    <td className="table-cell font-medium">{index + 1}</td>
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-primary-700">
                            {team.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        {team.name}
                      </div>
                    </td>
                    <td className="table-cell">{team.gamesPlayed}</td>
                    <td className="table-cell text-green-600 font-medium">{team.wins}</td>
                    <td className="table-cell text-red-600 font-medium">{team.losses}</td>
                    <td className="table-cell font-semibold">{team.winPercentage.toFixed(3)}</td>
                    <td className="table-cell">{team.runsScored}</td>
                    <td className="table-cell">{team.runsAllowed}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="table-cell text-center text-gray-500">
                    No hay datos de equipos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;