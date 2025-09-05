import React, { useState, useEffect } from 'react';
import { Trophy, Users, Calendar, BarChart3, Settings, Home, UserPlus, Plus } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PlayersManager from './components/PlayersManager';
import TeamsManager from './components/TeamsManager';
import StatsManager from './components/StatsManager';
import Rankings from './components/Rankings';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { DataProvider } from './context/DataContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'players', name: 'Jugadores', icon: Users },
    { id: 'teams', name: 'Equipos', icon: UserPlus },
    { id: 'stats', name: 'Estadísticas', icon: BarChart3 },
    { id: 'rankings', name: 'Rankings', icon: Trophy },
    { id: 'calendar', name: 'Calendario', icon: Calendar },
    { id: 'settings', name: 'Configuración', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'players':
        return <PlayersManager />;
      case 'teams':
        return <TeamsManager />;
      case 'stats':
        return <StatsManager />;
      case 'rankings':
        return <Rankings />;
      case 'calendar':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Calendario</h3>
              <p className="mt-1 text-sm text-gray-500">
                Módulo de calendario en desarrollo
              </p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <Settings className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Configuración</h3>
              <p className="mt-1 text-sm text-gray-500">
                Panel de configuración en desarrollo
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
        
        <Sidebar 
          navigation={navigation}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="lg:pl-64">
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;