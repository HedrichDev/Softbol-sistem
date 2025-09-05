import React, { useState, useEffect } from 'react';
import { X, BarChart3, Target, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';

const StatsForm = ({ player, onClose }) => {
  const { players, updatePlayer } = useData();
  const [selectedPlayer, setSelectedPlayer] = useState(player?.id || '');
  const [activeTab, setActiveTab] = useState('batting');
  const [battingStats, setBattingStats] = useState({
    atBats: 0,
    hits: 0,
    doubles: 0,
    triples: 0,
    homeRuns: 0,
    walks: 0,
    strikeouts: 0,
    runsScored: 0,
    rbi: 0,
    sacrifices: 0
  });
  const [pitchingStats, setPitchingStats] = useState({
    wins: 0,
    losses: 0,
    strikeoutsPitching: 0,
    walksPitching: 0,
    runsAllowed: 0,
    hitsAllowed: 0,
    earnedRuns: 0
  });

  useEffect(() => {
    if (player) {
      setBattingStats({
        atBats: player.stats?.atBats || 0,
        hits: player.stats?.hits || 0,
        doubles: player.stats?.doubles || 0,
        triples: player.stats?.triples || 0,
        homeRuns: player.stats?.homeRuns || 0,
        walks: player.stats?.walks || 0,
        strikeouts: player.stats?.strikeouts || 0,
        runsScored: player.stats?.runsScored || 0,
        rbi: player.stats?.rbi || 0,
        sacrifices: player.stats?.sacrifices || 0
      });
      setPitchingStats({
        wins: player.stats?.wins || 0,
        losses: player.stats?.losses || 0,
        strikeoutsPitching: player.stats?.strikeoutsPitching || 0,
        walksPitching: player.stats?.walksPitching || 0,
        runsAllowed: player.stats?.runsAllowed || 0,
        hitsAllowed: player.stats?.hitsAllowed || 0,
        earnedRuns: player.stats?.earnedRuns || 0
      });
    }
  }, [player]);

  const handlePlayerChange = (playerId) => {
    const selectedPlayerData = players.find(p => p.id === playerId);
    if (selectedPlayerData) {
      setSelectedPlayer(playerId);
      setBattingStats({
        atBats: selectedPlayerData.stats?.atBats || 0,
        hits: selectedPlayerData.stats?.hits || 0,
        doubles: selectedPlayerData.stats?.doubles || 0,
        triples: selectedPlayerData.stats?.triples || 0,
        homeRuns: selectedPlayerData.stats?.homeRuns || 0,
        walks: selectedPlayerData.stats?.walks || 0,
        strikeouts: selectedPlayerData.stats?.strikeouts || 0,
        runsScored: selectedPlayerData.stats?.runsScored || 0,
        rbi: selectedPlayerData.stats?.rbi || 0,
        sacrifices: selectedPlayerData.stats?.sacrifices || 0
      });
      setPitchingStats({
        wins: selectedPlayerData.stats?.wins || 0,
        losses: selectedPlayerData.stats?.losses || 0,
        strikeoutsPitching: selectedPlayerData.stats?.strikeoutsPitching || 0,
        walksPitching: selectedPlayerData.stats?.walksPitching || 0,
        runsAllowed: selectedPlayerData.stats?.runsAllowed || 0,
        hitsAllowed: selectedPlayerData.stats?.hitsAllowed || 0,
        earnedRuns: selectedPlayerData.stats?.earnedRuns || 0
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedPlayer) {
      alert('Por favor selecciona un jugador');
      return;
    }

    const playerToUpdate = players.find(p => p.id === selectedPlayer);
    if (!playerToUpdate) return;

    // Calculate AVG
    const avg = battingStats.atBats > 0 ? battingStats.hits / battingStats.atBats : 0;

    const updatedStats = {
      ...battingStats,
      ...pitchingStats,
      avg
    };

    updatePlayer(selectedPlayer, {
      ...playerToUpdate,
      stats: updatedStats
    });

    onClose();
  };

  const handleBattingChange = (field, value) => {
    setBattingStats(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }));
  };

  const handlePitchingChange = (field, value) => {
    setPitchingStats(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }));
  };

  const currentPlayer = players.find(p => p.id === selectedPlayer);
  const currentAvg = battingStats.atBats > 0 ? (battingStats.hits / battingStats.atBats).toFixed(3) : '0.000';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Registrar Estadísticas
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Player Selection */}
            {!player && (
              <div className="mb-6">
                <label htmlFor="player-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar jugador *
                </label>
                <select
                  id="player-select"
                  value={selectedPlayer}
                  onChange={(e) => handlePlayerChange(e.target.value)}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">Seleccionar jugador</option>
                  {players.map(p => (
                    <option key={p.id} value={p.id}>
                      #{p.number} - {p.name} ({p.team})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Player Info */}
            {currentPlayer && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      #{currentPlayer.number}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{currentPlayer.name}</h4>
                    <p className="text-sm text-gray-500">{currentPlayer.team} - {currentPlayer.position}</p>
                    <p className="text-sm font-medium text-primary-600">AVG Actual: {currentAvg}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    type="button"
                    onClick={() => setActiveTab('batting')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'batting'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span>Bateo</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('pitching')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'pitching'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Pitcheo</span>
                    </div>
                  </button>
                </nav>
              </div>
            </div>

            {/* Batting Stats */}
            {activeTab === 'batting' && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Estadísticas de Bateo</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      VB (Veces al bate)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={battingStats.atBats}
                      onChange={(e) => handleBattingChange('atBats', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      HC (Hits conectados)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={battingStats.hits}
                      onChange={(e) => handleBattingChange('hits', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      2B (Dobles)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={battingStats.doubles}
                      onChange={(e) => handleBattingChange('doubles', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      3B (Triples)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={battingStats.triples}
                      onChange={(e) => handleBattingChange('triples', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      HR (Home runs)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={battingStats.homeRuns}
                      onChange={(e) => handleBattingChange('homeRuns', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      BB (Bases por bolas)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={battingStats.walks}
                      onChange={(e) => handleBattingChange('walks', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      K (Ponches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={battingStats.strikeouts}
                      onChange={(e) => handleBattingChange('strikeouts', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CA (Carreras anotadas)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={battingStats.runsScored}
                      onChange={(e) => handleBattingChange('runsScored', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CI (Carreras impulsadas)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={battingStats.rbi}
                      onChange={(e) => handleBattingChange('rbi', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SF (Sacrificios)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={battingStats.sacrifices}
                      onChange={(e) => handleBattingChange('sacrifices', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                {/* AVG Preview */}
                <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-700">
                    <strong>AVG Calculado:</strong> {currentAvg}
                  </p>
                </div>
              </div>
            )}

            {/* Pitching Stats */}
            {activeTab === 'pitching' && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Estadísticas de Pitcheo</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PJG (Juegos ganados)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={pitchingStats.wins}
                      onChange={(e) => handlePitchingChange('wins', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PJP (Juegos perdidos)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={pitchingStats.losses}
                      onChange={(e) => handlePitchingChange('losses', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      KP (Ponches propinados)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={pitchingStats.strikeoutsPitching}
                      onChange={(e) => handlePitchingChange('strikeoutsPitching', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      BBP (Bases por bolas propinadas)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={pitchingStats.walksPitching}
                      onChange={(e) => handlePitchingChange('walksPitching', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CP (Carreras permitidas)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={pitchingStats.runsAllowed}
                      onChange={(e) => handlePitchingChange('runsAllowed', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IL (Hits permitidos)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={pitchingStats.hitsAllowed}
                      onChange={(e) => handlePitchingChange('hitsAllowed', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      HP (Carreras limpias)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={pitchingStats.earnedRuns}
                      onChange={(e) => handlePitchingChange('earnedRuns', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={!selectedPlayer}
              >
                Guardar Estadísticas
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StatsForm;