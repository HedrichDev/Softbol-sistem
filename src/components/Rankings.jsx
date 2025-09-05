import React, { useState } from 'react';
import { Trophy, Award, Target, Zap, Home, Users } from 'lucide-react';
import { useData } from '../context/DataContext';

const Rankings = () => {
  const { getTopPlayers } = useData();
  const [activeCategory, setActiveCategory] = useState('batting');

  const categories = [
    { id: 'batting', name: 'Mejores Bateadores', icon: Target, color: 'text-blue-600' },
    { id: 'pitching', name: 'Mejores Pitchers', icon: Zap, color: 'text-green-600' },
    { id: 'rbi', name: 'Carreras Impulsadas', icon: Users, color: 'text-purple-600' },
    { id: 'doubles', name: 'Dobles', icon: Award, color: 'text-orange-600' },
    { id: 'homeRuns', name: 'Home Runs', icon: Home, color: 'text-red-600' },
    { id: 'strikeouts', name: 'Ponches (Pitchers)', icon: Trophy, color: 'text-indigo-600' }
  ];

  const getRankingData = () => {
    switch (activeCategory) {
      case 'batting':
        return getTopPlayers('batting', 10);
      case 'pitching':
        return getTopPlayers('pitching', 3);
      case 'rbi':
        return getTopPlayers('rbi', 5);
      case 'doubles':
        return getTopPlayers('doubles', 5);
      case 'homeRuns':
        return getTopPlayers('homeRuns', 5);
      case 'strikeouts':
        return getTopPlayers('strikeouts', 5);
      default:
        return [];
    }
  };

  const getStatValue = (player, category) => {
    switch (category) {
      case 'batting':
        return player.stats?.atBats > 0 ? (player.stats.hits / player.stats.atBats).toFixed(3) : '0.000';
      case 'pitching':
        return `${player.stats?.wins || 0}-${player.stats?.losses || 0}`;
      case 'rbi':
        return player.stats?.rbi || 0;
      case 'doubles':
        return player.stats?.doubles || 0;
      case 'homeRuns':
        return player.stats?.homeRuns || 0;
      case 'strikeouts':
        return player.stats?.strikeoutsPitching || 0;
      default:
        return 0;
    }
  };

  const getStatLabel = (category) => {
    switch (category) {
      case 'batting':
        return 'AVG';
      case 'pitching':
        return 'W-L';
      case 'rbi':
        return 'CI';
      case 'doubles':
        return '2B';
      case 'homeRuns':
        return 'HR';
      case 'strikeouts':
        return 'KP';
      default:
        return '';
    }
  };

  const getMedalColor = (position) => {
    switch (position) {
      case 0:
        return 'bg-yellow-500 text-white'; // Gold
      case 1:
        return 'bg-gray-400 text-white'; // Silver
      case 2:
        return 'bg-orange-600 text-white'; // Bronze
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const rankingData = getRankingData();
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Rankings - Liga Risaraldense
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Los mejores jugadores en diferentes categorías estadísticas
        </p>
      </div>

      {/* Category Tabs */}
      <div className="card">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-3 rounded-lg text-center transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <Icon className={`h-6 w-6 mx-auto mb-1 ${
                  activeCategory === category.id ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <span className="text-xs font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rankings Display */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {currentCategory && (
              <>
                <currentCategory.icon className={`h-8 w-8 ${currentCategory.color}`} />
                <h2 className="text-2xl font-bold text-gray-900">{currentCategory.name}</h2>
              </>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {activeCategory === 'batting' && 'Mínimo 12 turnos al bate'}
            {activeCategory === 'pitching' && 'Top 3 por juegos ganados'}
            {['rbi', 'doubles', 'homeRuns', 'strikeouts'].includes(activeCategory) && 'Top 5'}
          </div>
        </div>

        {rankingData.length > 0 ? (
          <div className="space-y-4">
            {rankingData.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                  index < 3 ? 'bg-gradient-to-r from-gray-50 to-white border-l-4 border-primary-500' : 'bg-gray-50'
                } hover:shadow-md`}
              >
                <div className="flex items-center space-x-4">
                  {/* Position Badge */}
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${getMedalColor(index)}`}>
                    {index < 3 ? (
                      <Trophy className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="flex items-center space-x-3">
                    {player.photo ? (
                      <img
                        src={player.photo}
                        alt={player.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-700">
                          #{player.number}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{player.team}</span>
                        <span>•</span>
                        <span>{player.position}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {getStatValue(player, activeCategory)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {getStatLabel(activeCategory)}
                  </div>
                  
                  {/* Additional context for batting */}
                  {activeCategory === 'batting' && (
                    <div className="text-xs text-gray-400 mt-1">
                      {player.stats?.hits}/{player.stats?.atBats} AB
                    </div>
                  )}
                  
                  {/* Additional context for pitching */}
                  {activeCategory === 'pitching' && (
                    <div className="text-xs text-gray-400 mt-1">
                      {player.stats?.strikeoutsPitching || 0} K
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay datos disponibles</h3>
            <p className="mt-1 text-sm text-gray-500">
              No hay suficientes estadísticas para mostrar este ranking
            </p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      {rankingData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Líder</p>
                <p className="text-lg font-bold text-gray-900">
                  {rankingData[0]?.name}
                </p>
                <p className="text-sm text-gray-600">
                  {getStatValue(rankingData[0], activeCategory)} {getStatLabel(activeCategory)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Participantes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rankingData.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Promedio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(() => {
                    if (activeCategory === 'batting') {
                      const totalHits = rankingData.reduce((sum, p) => sum + (p.stats?.hits || 0), 0);
                      const totalAB = rankingData.reduce((sum, p) => sum + (p.stats?.atBats || 0), 0);
                      return totalAB > 0 ? (totalHits / totalAB).toFixed(3) : '0.000';
                    } else if (activeCategory === 'pitching') {
                      const totalWins = rankingData.reduce((sum, p) => sum + (p.stats?.wins || 0), 0);
                      return (totalWins / rankingData.length).toFixed(1);
                    } else {
                      const total = rankingData.reduce((sum, p) => {
                        switch (activeCategory) {
                          case 'rbi': return sum + (p.stats?.rbi || 0);
                          case 'doubles': return sum + (p.stats?.doubles || 0);
                          case 'homeRuns': return sum + (p.stats?.homeRuns || 0);
                          case 'strikeouts': return sum + (p.stats?.strikeoutsPitching || 0);
                          default: return sum;
                        }
                      }, 0);
                      return (total / rankingData.length).toFixed(1);
                    }
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rankings;