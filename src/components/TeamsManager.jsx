import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Trophy } from 'lucide-react';
import { useData } from '../context/DataContext';
import TeamForm from './TeamForm';

const TeamsManager = () => {
  const { teams, players, deleteTeam } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  const handleEdit = (team) => {
    setEditingTeam(team);
    setShowForm(true);
  };

  const handleDelete = (teamId) => {
    const teamPlayers = players.filter(player => player.team === teams.find(t => t.id === teamId)?.name);
    
    if (teamPlayers.length > 0) {
      alert('No se puede eliminar un equipo que tiene jugadores asignados. Primero reasigna o elimina los jugadores.');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este equipo?')) {
      deleteTeam(teamId);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTeam(null);
  };

  const getTeamPlayerCount = (teamName) => {
    return players.filter(player => player.team === teamName).length;
  };

  const getTeamStats = (teamName) => {
    const teamPlayers = players.filter(player => player.team === teamName);
    if (teamPlayers.length === 0) return { avg: 0, totalHits: 0, totalAtBats: 0 };

    const totalHits = teamPlayers.reduce((sum, player) => sum + (player.stats?.hits || 0), 0);
    const totalAtBats = teamPlayers.reduce((sum, player) => sum + (player.stats?.atBats || 0), 0);
    const avg = totalAtBats > 0 ? totalHits / totalAtBats : 0;

    return { avg, totalHits, totalAtBats };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Equipos</h1>
          <p className="mt-2 text-sm text-gray-600">
            Administra los equipos de la Liga Risaraldense
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 btn-primary flex items-center gap-x-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Equipo
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map(team => {
          const playerCount = getTeamPlayerCount(team.name);
          const teamStats = getTeamStats(team.name);
          
          return (
            <div key={team.id} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {team.logo ? (
                    <img
                      src={team.logo}
                      alt={`${team.name} logo`}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-700">
                        {team.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                    <p className="text-sm text-gray-500">{team.city}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(team)}
                    className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(team.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Team Description */}
              {team.description && (
                <p className="text-sm text-gray-600 mb-4">{team.description}</p>
              )}

              {/* Team Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-2xl font-bold text-blue-600">{playerCount}</span>
                  </div>
                  <p className="text-xs text-gray-500">Jugadores</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Trophy className="h-4 w-4 text-green-500" />
                    <span className="text-2xl font-bold text-green-600">
                      {teamStats.avg.toFixed(3)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">AVG Equipo</p>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Hits totales:</span>
                  <span className="font-medium">{teamStats.totalHits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Turnos al bate:</span>
                  <span className="font-medium">{teamStats.totalAtBats}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {teams.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay equipos</h3>
          <p className="mt-1 text-sm text-gray-500">
            Comienza agregando tu primer equipo
          </p>
        </div>
      )}

      {/* Team Form Modal */}
      {showForm && (
        <TeamForm
          team={editingTeam}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default TeamsManager;