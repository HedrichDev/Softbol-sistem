import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, User, Camera } from 'lucide-react';
import { useData } from '../context/DataContext';
import PlayerForm from './PlayerForm';

const PlayersManager = () => {
  const { players, teams, deletePlayer } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.number.toString().includes(searchTerm);
    const matchesTeam = selectedTeam === '' || player.team === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setShowForm(true);
  };

  const handleDelete = (playerId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
      deletePlayer(playerId);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPlayer(null);
  };

  const getPlayerAverage = (player) => {
    if (!player.stats || player.stats.atBats === 0) return '0.000';
    return (player.stats.hits / player.stats.atBats).toFixed(3);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Jugadores</h1>
          <p className="mt-2 text-sm text-gray-600">
            Administra los peloteros de la Liga Risaraldense
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 btn-primary flex items-center gap-x-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Jugador
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Buscar jugador
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="search"
                placeholder="Nombre o número..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
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
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map(player => (
          <div key={player.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {player.photo ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">#{player.number}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                  <p className="text-sm text-gray-500">{player.team}</p>
                  <p className="text-xs text-gray-400">{player.position}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleEdit(player)}
                  className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary-600">
                    {getPlayerAverage(player)}
                  </p>
                  <p className="text-xs text-gray-500">AVG</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {player.stats?.hits || 0}
                  </p>
                  <p className="text-xs text-gray-500">HITS</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {player.stats?.homeRuns || 0}
                  </p>
                  <p className="text-xs text-gray-500">HR</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay jugadores</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedTeam 
              ? 'No se encontraron jugadores con los filtros aplicados'
              : 'Comienza agregando tu primer jugador'
            }
          </p>
        </div>
      )}

      {/* Player Form Modal */}
      {showForm && (
        <PlayerForm
          player={editingPlayer}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default PlayersManager;