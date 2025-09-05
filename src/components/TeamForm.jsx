import React, { useState, useEffect } from 'react';
import { X, Upload, Trophy } from 'lucide-react';
import { useData } from '../context/DataContext';

const TeamForm = ({ team, onClose }) => {
  const { addTeam, updateTeam } = useData();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    description: '',
    logo: '',
    foundedYear: '',
    colors: {
      primary: '#0ea5e9',
      secondary: '#64748b'
    }
  });

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name || '',
        city: team.city || '',
        description: team.description || '',
        logo: team.logo || '',
        foundedYear: team.foundedYear || '',
        colors: team.colors || {
          primary: '#0ea5e9',
          secondary: '#64748b'
        }
      });
    }
  }, [team]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.city.trim()) {
      alert('Por favor completa los campos obligatorios (Nombre y Ciudad)');
      return;
    }

    const teamData = {
      ...formData,
      foundedYear: formData.foundedYear ? parseInt(formData.foundedYear) : null
    };

    if (team) {
      updateTeam(team.id, teamData);
    } else {
      addTeam(teamData);
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

  const handleColorChange = (colorType, value) => {
    setFormData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          logo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {team ? 'Editar Equipo' : 'Agregar Equipo'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Logo Upload */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {formData.logo ? (
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                ) : (
                  <div 
                    className="h-20 w-20 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: formData.colors.primary }}
                  >
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary-600 flex items-center justify-center cursor-pointer hover:bg-primary-700">
                  <Upload className="h-3 w-3 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-2 text-xs text-gray-500">Logo del equipo (opcional)</p>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre del equipo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Ej: Águilas de Pereira"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Ciudad *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Ej: Pereira"
              />
            </div>

            {/* Founded Year */}
            <div>
              <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700">
                Año de fundación
              </label>
              <input
                type="number"
                id="foundedYear"
                name="foundedYear"
                value={formData.foundedYear}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Ej: 2010"
              />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                  Color primario
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="color"
                    id="primaryColor"
                    value={formData.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="h-10 w-16 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={formData.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">
                  Color secundario
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="color"
                    id="secondaryColor"
                    value={formData.colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="h-10 w-16 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={formData.colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Descripción del equipo, historia, logros..."
              />
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
                {team ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamForm;