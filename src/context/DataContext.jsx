import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem('softball-players');
    const savedTeams = localStorage.getItem('softball-teams');

    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    } else {
      // Initialize with sample data
      const samplePlayers = [
        {
          id: '1',
          name: 'Carlos Rodríguez',
          number: 10,
          team: 'Águilas de Pereira',
          position: 'Shortstop',
          photo: null,
          stats: {
            atBats: 45,
            hits: 18,
            doubles: 4,
            triples: 1,
            homeRuns: 2,
            walks: 8,
            strikeouts: 12,
            runsScored: 15,
            rbi: 12,
            sacrifices: 2,
            avg: 0.400,
            wins: 0,
            losses: 0,
            strikeoutsPitching: 0,
            walksPitching: 0,
            runsAllowed: 0,
            hitsAllowed: 0,
            earnedRuns: 0
          }
        },
        {
          id: '2',
          name: 'Miguel Ángel Torres',
          number: 22,
          team: 'Tigres de Dosquebradas',
          position: 'Pitcher',
          photo: null,
          stats: {
            atBats: 35,
            hits: 12,
            doubles: 2,
            triples: 0,
            homeRuns: 1,
            walks: 5,
            strikeouts: 8,
            runsScored: 8,
            rbi: 7,
            sacrifices: 1,
            avg: 0.343,
            wins: 4,
            losses: 1,
            strikeoutsPitching: 32,
            walksPitching: 8,
            runsAllowed: 12,
            hitsAllowed: 28,
            earnedRuns: 8
          }
        },
        {
          id: '3',
          name: 'Andrés Felipe Gómez',
          number: 7,
          team: 'Leones de La Virginia',
          position: 'Primera Base',
          photo: null,
          stats: {
            atBats: 42,
            hits: 15,
            doubles: 3,
            triples: 0,
            homeRuns: 4,
            walks: 6,
            strikeouts: 10,
            runsScored: 12,
            rbi: 18,
            sacrifices: 1,
            avg: 0.357,
            wins: 0,
            losses: 0,
            strikeoutsPitching: 0,
            walksPitching: 0,
            runsAllowed: 0,
            hitsAllowed: 0,
            earnedRuns: 0
          }
        }
      ];
      setPlayers(samplePlayers);
    }

    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    } else {
      // Initialize with sample teams
      const sampleTeams = [
        {
          id: '1',
          name: 'Águilas de Pereira',
          city: 'Pereira',
          description: 'Equipo fundado en 2010, conocido por su excelente defensa y jugadores veteranos.',
          logo: null,
          foundedYear: 2010,
          colors: {
            primary: '#1e40af',
            secondary: '#fbbf24'
          }
        },
        {
          id: '2',
          name: 'Tigres de Dosquebradas',
          city: 'Dosquebradas',
          description: 'Equipo joven con gran potencial ofensivo y pitcheo sólido.',
          logo: null,
          foundedYear: 2015,
          colors: {
            primary: '#f97316',
            secondary: '#1f2937'
          }
        },
        {
          id: '3',
          name: 'Leones de La Virginia',
          city: 'La Virginia',
          description: 'Equipo tradicional de la liga con múltiples campeonatos.',
          logo: null,
          foundedYear: 2008,
          colors: {
            primary: '#dc2626',
            secondary: '#fbbf24'
          }
        }
      ];
      setTeams(sampleTeams);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('softball-players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('softball-teams', JSON.stringify(teams));
  }, [teams]);

  // Player management functions
  const addPlayer = (playerData) => {
    const newPlayer = {
      ...playerData,
      id: Date.now().toString(),
    };
    setPlayers(prev => [...prev, newPlayer]);
  };

  const updatePlayer = (playerId, playerData) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId ? { ...playerData, id: playerId } : player
    ));
  };

  const deletePlayer = (playerId) => {
    setPlayers(prev => prev.filter(player => player.id !== playerId));
  };

  // Team management functions
  const addTeam = (teamData) => {
    const newTeam = {
      ...teamData,
      id: Date.now().toString(),
    };
    setTeams(prev => [...prev, newTeam]);
  };

  const updateTeam = (teamId, teamData) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...teamData, id: teamId } : team
    ));
  };

  const deleteTeam = (teamId) => {
    setTeams(prev => prev.filter(team => team.id !== teamId));
  };

  // Statistics and rankings functions
  const getTopPlayers = (category, limit = 10) => {
    let filteredPlayers = [...players];

    switch (category) {
      case 'batting':
        // Minimum 12 at-bats for batting average
        filteredPlayers = players.filter(player => 
          player.stats && player.stats.atBats >= 12
        ).sort((a, b) => {
          const avgA = a.stats.hits / a.stats.atBats;
          const avgB = b.stats.hits / b.stats.atBats;
          return avgB - avgA;
        });
        break;
      
      case 'pitching':
        filteredPlayers = players.filter(player => 
          player.stats && (player.stats.wins > 0 || player.stats.losses > 0)
        ).sort((a, b) => {
          // Sort by wins first, then by losses (fewer is better)
          if (b.stats.wins !== a.stats.wins) {
            return b.stats.wins - a.stats.wins;
          }
          return a.stats.losses - b.stats.losses;
        });
        break;
      
      case 'rbi':
        filteredPlayers = players.filter(player => 
          player.stats && player.stats.rbi > 0
        ).sort((a, b) => b.stats.rbi - a.stats.rbi);
        break;
      
      case 'doubles':
        filteredPlayers = players.filter(player => 
          player.stats && player.stats.doubles > 0
        ).sort((a, b) => b.stats.doubles - a.stats.doubles);
        break;
      
      case 'homeRuns':
        filteredPlayers = players.filter(player => 
          player.stats && player.stats.homeRuns > 0
        ).sort((a, b) => b.stats.homeRuns - a.stats.homeRuns);
        break;
      
      case 'strikeouts':
        filteredPlayers = players.filter(player => 
          player.stats && player.stats.strikeoutsPitching > 0
        ).sort((a, b) => b.stats.strikeoutsPitching - a.stats.strikeoutsPitching);
        break;
      
      default:
        return [];
    }

    return filteredPlayers.slice(0, limit);
  };

  const getTeamStats = () => {
    return teams.map(team => {
      const teamPlayers = players.filter(player => player.team === team.name);
      
      // Calculate team statistics
      const gamesPlayed = 10; // This would come from actual game data
      const wins = Math.floor(Math.random() * 8) + 2; // Sample data
      const losses = gamesPlayed - wins;
      const winPercentage = wins / gamesPlayed;
      const runsScored = teamPlayers.reduce((sum, player) => sum + (player.stats?.runsScored || 0), 0);
      const runsAllowed = Math.floor(Math.random() * 50) + 20; // Sample data

      return {
        id: team.id,
        name: team.name,
        gamesPlayed,
        wins,
        losses,
        winPercentage,
        runsScored,
        runsAllowed
      };
    }).sort((a, b) => b.winPercentage - a.winPercentage);
  };

  // Backup and restore functions
  const exportData = () => {
    const data = {
      players,
      teams,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      if (data.players && data.teams) {
        setPlayers(data.players);
        setTeams(data.teams);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  const value = {
    // Data
    players,
    teams,
    
    // Player functions
    addPlayer,
    updatePlayer,
    deletePlayer,
    
    // Team functions
    addTeam,
    updateTeam,
    deleteTeam,
    
    // Statistics functions
    getTopPlayers,
    getTeamStats,
    
    // Backup functions
    exportData,
    importData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};