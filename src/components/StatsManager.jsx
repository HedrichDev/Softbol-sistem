import React, { useState } from 'react';
import { BarChart3, Plus, Edit, TrendingUp, Target } from 'lucide-react';
import { useData } from '../context/DataContext';
import StatsForm from './StatsForm';

const StatsManager = () => {
  const { players, teams } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [sortBy, setSortBy] = useState('avg');

  const filteredPlayers = players.filter(player => 
    selectedTeam === '' || player.team === selectedTeam
  );

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    switch (sortBy) {
      case 'avg':
        const avgA = a.stats?.atBats > 0 ? a.stats.hits / a.stats.atBats : 0;
        const avgB = b.stats?.atBats > 0 ? b.stats.hits / b.stats.atBats : 0;
        return avgB - avgA;
      case 'hits':
        return (b.stats?.hits || 0) - (a.stats?.hits || 0);
      case 'homeRuns':
        return (b.stats?.homeRuns || 0) - (a.stats?.homeRuns || 0);
      case 'rbi':
        return (b.stats?.rbi || 0) - (a.stats?.rbi || 0);
      case 'wins':
        return (b.stats?.wins || 0) - (a.stats?.wins || 0);
      default:
        return 0;
    }
  });

  const handleEditStats = (player) => {
    setEditingPlayer(player);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPlayer(null);
  };

  const getPlayerAverage = (player) => {
    if (!player.stats || player.stats.atBats === 0) return '0.000';
    return (player.stats.hits / player.stats.atBats).toFixed(3);
  };

  const getPlayerOPS = (player) => {
    if (!player.stats || player.stats.atBats === 0) return '0.000';
    
    const { hits, doubles, triples, homeRuns, walks, atBats, sacrifices } = player.stats;
    const singles = hits - doubles - triples - homeRuns;
    
    // OBP = (H + BB + HBP) / (AB + BB + HBP + SF)
    const obp = (hits + walks) / (atBats + walks + sacrifices);
    
    // SLG = (Singles + 2*2B + 3*3B + 4*HR) / AB
    const slg = (singles + 2*doubles + 3*triples + 4*homeRuns) / atBats;
    
    return (obp + slg).toFixed(3);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Estadísticas</h1>
          <p className="mt-2 text-sm text-gray-600">
            Administra las estadísticas de los jugadores
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 btn-primary flex items-center gap-x-2"
        >
          <Plus className="h-4 w-4" />
          Registrar Estadísticas
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="team-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por equipo
            </label>
            <select
              id="team-filter"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Todos los equipos</option>
              {teams.map(team => (
                <option key={team.id} value={team.name}>{team.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
              Ordenar por
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="avg">Promedio de bateo (AVG)</option>
              <option value="hits">Hits conectados</option>
              <option value="homeRuns">Home runs</option>
              <option value="rbi">Carreras impulsadas</option>
              <option value="wins">Juegos ganados (Pitchers)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Jugador</th>
                <th className="table-header">Equipo</th>
                <th className="table-header">VB</th>
                <th className="table-header">HC</th>
                <th className="table-header">2B</th>
                <th className="table-header">3B</th>
                <th className="table-header">HR</th>
                <th className="table-header">CI</th>
                <th className="table-header">AVG</th>
                <th className="table-header">OPS</th>
                <th className="table-header">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedPlayers.map((player, index) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-primary-700">
                          #{player.number}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{player.name}</div>
                        <div className="text-sm text-gray-500">{player.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {player.team}
                    </span>
                  </td>
                  <td className="table-cell font-medium">{player.stats?.atBats || 0}</td>
                  <td className="table-cell font-medium text-green-600">{player.stats?.hits || 0}</td>
                  <td className="table-cell">{player.stats?.doubles || 0}</td>
                  <td className="table-cell">{player.stats?.triples || 0}</td>
                  <td className="table-cell font-medium text-orange-600">{player.stats?.homeRuns || 0}</td>
                  <td className="table-cell">{player.stats?.rbi || 0}</td>
                  <td className="table-cell">
                    <span className={`font-bold ${
                      parseFloat(getPlayerAverage(player)) >= 0.300 ? 'text-green-600' :
                      parseFloat(getPlayerAverage(player)) >= 0.250 ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {getPlayerAverage(player)}
                    </span>
                  </td>
                  <td className="table-cell font-medium">{getPlayerOPS(player)}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleEditStats(player)}
                      className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="text-sm">Editar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedPlayers.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay estadísticas</h3>
            <p className="mt-1 text-sm text-gray-500">
              {selectedTeam 
                ? 'No hay jugadores en el equipo seleccionado'
                : 'Comienza registrando estadísticas de los jugadores'
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats Summary */}
      {sortedPlayers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Promedio Liga</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(() => {
                    const totalHits = sortedPlayers.reduce((sum, p) => sum + (p.stats?.hits || 0), 0);
                    const totalAB = sortedPlayers.reduce((sum, p) => sum + (p.stats?.atBats || 0), 0);
                    return totalAB > 0 ? (totalHits / totalAB).toFixed(3) : '0.000';
                  })()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total Hits</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sortedPlayers.reduce((sum, p) => sum + (p.stats?.hits || 0), 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total HR</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sortedPlayers.reduce((sum, p) => sum + (p.stats?.homeRuns || 0), 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total CI</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sortedPlayers.reduce((sum, p) => sum + (p.stats?.rbi || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Form Modal */}
      {showForm && (
        <StatsForm
          player={editingPlayer}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default StatsManager;