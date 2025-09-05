import React, { useState, useEffect } from 'react';
import { X, Camera, User } from 'lucide-react';
import { useData } from '../context/DataContext';

const PlayerForm = ({ player, onClose }) => {
  const { teams, addPlayer, updatePlayer } = useData();
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    team: '',
    position: '',
    photo: ''
  });

  useEffect(() => {
    if (player) {
      setFormData({
        name: player.name || '',
        number: player.number || '',
        team: player.team || '',
        position: player.position || '',
        photo: player.photo || ''
      });
    }
  }, [player]);

  const positions = [
    'Pitcher', 'Catcher', 'Primera Base', 'Segunda Base', 'Tercera Base',
    'Shortstop', 'Jardinero Izquierdo', 'Jardinero Central', 'Jardinero Derecho',
    'Utility', 'Designado'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.number || !formData.team || !formData.position) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const playerData = {
      ...formData,
      number: parseInt(formData.number),
      stats: player?.stats || {
        // Batting stats
        atBats: 0,
        hits: 0,
        doubles: 0,
        triples: 0,
        homeRuns: 0,
        walks: 0,
        strikeouts: 0,
        runsScored: 0,
        rbi: 0,
        sacrifices: 0,
        avg: 0,
        // Pitching stats
        wins: 0,
        losses: 0,
        strikeoutsPitching: 0,
        walksPitching: 0,
        runsAllowed: 0,
        hitsAllowed: 0,
        earnedRuns: 0
      }
    };

    if (player) {
      updatePlayer(player.id, playerData);
    } else {
      addPlayer(playerData);
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {player ? 'Editar Jugador' : 'Agregar Jugador'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Photo Upload */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary-600 flex items-center justify-center cursor-pointer hover:bg-primary-700">
                  <Camera className="h-3 w-3 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-2 text-xs text-gray-500">Foto del jugador (opcional)</p>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Ej: Juan Carlos Pérez"
              />
            </div>

            {/* Number */}
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Número de camiseta *
              </label>
              <input
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                min="1"
                max="99"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Ej: 10"
              />
            </div>

            {/* Team */}
            <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-700">
                Equipo *
              </label>
              <select
                id="team"
                name="team"
                value={formData.team}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Seleccionar equipo</option>
                {teams.map(team => (
                  <option key={team.id} value={team.name}>{team.name}</option>
                ))}
              </select>
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Posición *
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Seleccionar posición</option>
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
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
              >
                {player ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;