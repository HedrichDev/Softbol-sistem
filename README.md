# 🚀 Sistema de Estadísticas de Softbol 
## 📊 SISTEMA DE LIGA RISARALDENSE 

### 🎯 PROPÓSITO DEL SISTEMA
Sistema de estadísticas para torneos de softball que registra:
- **Rendimiento individual** de jugadores
- **Estadísticas de equipos** y clasificación
- **Calendario de partidos** y programación
- **Rankings** de mejores jugadores en diferentes categorías

### 📋 ESTRUCTURA DE DATOS IDENTIFICADA

#### 1. **ESTADÍSTICAS DE JUGADORES**
- **VB**: Veces al bate
- **HC**: Hits conectados
- **2B**: Dobles
- **3B**: Triples
- **HR**: Home runs
- **BB**: Bases por bolas
- **K**: Ponches
- **CA**: Carreras anotadas
- **CI**: Carreras impulsadas
- **SF**: Sacrificios
- **AVG**: Promedio de bateo
- **PJG**: Juegos ganados como pitcher
- **PJP**: Juegos perdidos como pitcher
- **KP**: Ponches propinados
- **BBP**: Bases por bolas propinadas
- **CP**: Carreras permitidas
- **IL**: Hits permitidos
- **HP**: Carreras earned (limpias)

#### 2. **TABLAS DE CLASIFICACIÓN**
- **JJ**: Juegos jugados
- **JG**: Juegos ganados
- **JP**: Juegos perdidos
- **JE**: Juegos empatados
- **AVG**: Porcentaje de victorias
- **CA**: Carreras anotadas
- **CC**: Carreras permitidas

#### 3. **RANKINGS ESPECIALES**
- Top 10 mejores bateadores
- Top 3 mejores pitchers
- Top 5 en carreras impulsadas
- Top 5 en dobles
- Top 5 en home runs
- Top 5 pitchers con más ponches

### 🔄 FLUJO DE INFORMACIÓN
1. **Registro manual** de estadísticas por partido
2. **Cálculo manual** de promedios y rankings
3. **Actualización manual** de tablas de clasificación
4. **Programación manual** de calendario

### 🚨 PROBLEMAS ACTUALES
- **Procesos manuales** propensos a errores
- **Datos duplicados** en diferentes secciones
- **Falta de automatización** en cálculos
- **Dificultad para actualizar** información en tiempo real
- **Limitaciones** en análisis avanzado

## 🛠️ PROPUESTA DE SISTEMA AUTOMATIZADO

### 📱 MÓDULOS PRINCIPALES

#### 1. **MÓDULO DE REGISTRO DE PARTIDOS**
```python
class Partido:
    fecha: datetime
    equipo_local: str
    equipo_visitante: str
    resultado: str
    estadisticas_jugadores: list
    eventos: list
```

#### 2. **MÓDULO DE ESTADÍSTICAS**
```python
class EstadisticasJugador:
    def calcular_promedio_bateo(self):
        return self.hits / self.veces_al_bate if self.veces_al_bate > 0 else 0
    
    def calcular_ops(self):
        # On-base plus slugging
        return (self.on_base_percentage + self.slugging_percentage)
```

#### 3. **MÓDULO DE CLASIFICACIÓN**
```python
class ClasificacionEquipo:
    def actualizar_clasificacion(self, resultado_partido):
        self.juegos_jugados += 1
        # Lógica de actualización automática
```

#### 4. **MÓDULO DE CALENDARIO**
```python
class ProgramadorCalendario:
    def generar_calendario_automatico(self, equipos, fechas_disponibles):
        # Algoritmo de programación equilibrada
```

### 🗄️ ESTRUCTURA DE BASE DE DATOS

#### TABLAS PRINCIPALES:
- **Equipos** (id, nombre, logo, información)
- **Jugadores** (id, nombre, equipo, posición)
- **Partidos** (id, fecha, local, visitante, resultado)
- **EstadisticasPartido** (partido_id, jugador_id, estadisticas)
- **Clasificacion** (equipo_id, JJ, JG, JP, JE, CA, CC)

### ⚙️ FUNCIONALIDADES AUTOMATIZADAS

#### 1. **CÁLCULOS AUTOMÁTICOS**
- Promedios de bateo
- Porcentajes de victoria
- Rankings en tiempo real
- Estadísticas avanzadas (OPS, WHIP, ERA)

#### 2. **GENERACIÓN DE REPORTES**
- Reportes por jugador
- Reportes por equipo
- Reportes comparativos
- Históricos y tendencias

#### 3. **NOTIFICACIONES AUTOMÁTICAS**
- Recordatorios de partidos
- Actualizaciones de clasificación
- Logros destacados

### 📊 DASHBOARD PROPUESTO

#### PANEL PRINCIPAL:
- **Clasificación actualizada** de equipos
- **Próximos partidos** del calendario
- **Jugadores destacados** de la semana
- **Estadísticas líderes** por categoría

#### PANEL DE ADMINISTRACIÓN:
- **Gestión de equipos** y jugadores
- **Registro rápido** de resultados
- **Configuración** de temporadas
- **Exportación** de datos

### 🔧 TECNOLOGÍAS RECOMENDADAS

#### BACKEND:
- **Python** con Flask/Django
- **Base de datos**: PostgreSQL/MySQL
- **API REST** para frontend y móvil

#### FRONTEND:
- **React.js** o Vue.js
- **Chart.js** para gráficos
- **Responsive design** para móviles

#### HERRAMIENTAS:
- **Docker** para contenerización
- **Git** para control de versiones
- **CI/CD** para despliegues automáticos

### 📈 BENEFICIOS DEL SISTEMA AUTOMATIZADO

1. **Reducción de errores** en cálculos manuales
2. **Tiempo real** en actualizaciones
3. **Acceso móvil** para jugadores y fans
4. **Análisis avanzado** de rendimiento
5. **Escalabilidad** para múltiples temporadas
6. **Exportación profesional** de reportes

## 📋 Descripción Ampliada del Proyecto

El sistema de estadísticas de softball debe gestionar de manera completa la información de jugadores (peloteros), equipos y sus estadísticas, con las siguientes características específicas:

### 📊 Gestión de Estadísticas por Temporada y Generales
- **Estadísticas por Temporada**: Cada jugador tendrá estadísticas específicas por cada temporada/torneo
- **Estadísticas Generales**: Promedios acumulativos de toda la carrera del jugador
- **Sistema de Cálculo Automático**: Actualización en tiempo real de promedios

### 👥 Gestión de Jugadores (Peloteros)
- **Información Básica**: Nombre, apellido, número de camiseta
- **Foto de Perfil**: 
  - Opción de subir foto personal
  - Foto genérica por defecto (silueta de persona)
  - Logo del equipo como alternativa
- **Estadísticas Detalladas**: 
  - VB (Veces al bate), HC (Hits conectados), 2B (Dobles)
  - 3B (Triples), HR (Home runs), BB (Bases por bolas)
  - K (Ponches), CA (Carreras anotadas), CI (Carreras impulsadas)
  - SF (Sacrificios), AVG (Promedio de bateo)

### 🏟️ Gestión de Equipos
- Registro completo de equipos con información detallada
- Asignación de jugadores a equipos
- Estadísticas de equipo (JJ, JG, JP, JE, CA, CC, AVG)

### 📈 Sistema de Visualización y Ordenamiento
- **Tablas Ordenables**: Mostrar jugadores ordenados por promedio de mayor a menor
- **Filtros Avanzados**: Por equipo, temporada, posición, etc.
- **Rankings Automáticos**: Top 10 en diferentes categorías

### 💾 Almacenamiento Persistente y Seguro
- **Base de Datos Relacional**: PostgreSQL con relaciones bien definidas
- **Backups Automáticos**: Sistema de respaldo periódico
- **Guardado Automático**: Persistencia inmediata de datos
- **Recuperación de Datos**: Mecanismos para prevenir pérdida de información

## 🚀 PLAN DE IMPLEMENTACIÓN

#### FASE 1 (2-3 semanas):
- Diseño de base de datos
- API básica para CRUD
- Módulo de registro de partidos

#### FASE 2 (3-4 semanas):
- Sistema de cálculos automáticos
- Dashboard básico
- Módulo de clasificación

#### FASE 3 (2-3 semanas):
- Calendario automático
- Reportes avanzados
- Optimización móvil

Este sistema transformaría completamente la gestión de la liga, proporcionando herramientas profesionales similares a las usadas en ligas mayores, pero adaptadas al contexto local de la Liga Risaraldense de Softbol.


## 🗄️ Modelos de Base de Datos Ampliados

### 1. Modelo de Jugador con Foto y Estadísticas

```python
# models/player.py
from app import db
from datetime import datetime
import os

class Player(db.Model):
    __tablename__ = 'players'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    jersey_number = db.Column(db.Integer)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    position = db.Column(db.String(20))
    profile_picture = db.Column(db.String(255))  # Ruta de la imagen
    
    # Relaciones
    season_stats = db.relationship('PlayerSeasonStats', backref='player', lazy=True)
    career_stats = db.relationship('PlayerCareerStats', backref='player', uselist=False)
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def profile_picture_url(self):
        if self.profile_picture and os.path.exists(self.profile_picture):
            return f"/static/uploads/players/{self.profile_picture}"
        elif self.team and self.team.logo:
            return f"/static/uploads/teams/{self.team.logo}"
        else:
            return "/static/images/default-player.png"
    
    def update_career_stats(self):
        """Actualiza las estadísticas generales basado en todas las temporadas"""
        total_stats = {
            'at_bats': 0, 'hits': 0, 'doubles': 0, 'triples': 0,
            'home_runs': 0, 'walks': 0, 'strikeouts': 0,
            'runs_scored': 0, 'rbis': 0, 'sacrifice_flies': 0
        }
        
        for season in self.season_stats:
            for stat in total_stats:
                total_stats[stat] += getattr(season, stat, 0)
        
        # Crear o actualizar estadísticas de carrera
        if not self.career_stats:
            self.career_stats = PlayerCareerStats(player_id=self.id)
        
        for stat, value in total_stats.items():
            setattr(self.career_stats, stat, value)
        
        db.session.commit()

class PlayerSeasonStats(db.Model):
    __tablename__ = 'player_season_stats'
    
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable=False)
    season_id = db.Column(db.Integer, db.ForeignKey('seasons.id'), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=False)
    
    # Estadísticas de bateo
    at_bats = db.Column(db.Integer, default=0)
    hits = db.Column(db.Integer, default=0)
    doubles = db.Column(db.Integer, default=0)
    triples = db.Column(db.Integer, default=0)
    home_runs = db.Column(db.Integer, default=0)
    walks = db.Column(db.Integer, default=0)
    strikeouts = db.Column(db.Integer, default=0)
    runs_scored = db.Column(db.Integer, default=0)
    rbis = db.Column(db.Integer, default=0)
    sacrifice_flies = db.Column(db.Integer, default=0)
    
    # Estadísticas calculadas
    @property
    def batting_average(self):
        if self.at_bats == 0:
            return 0.000
        return round(self.hits / self.at_bats, 3)
    
    @property
    def on_base_percentage(self):
        if self.at_bats + self.walks + self.sacrifice_flies == 0:
            return 0.000
        return round((self.hits + self.walks) / 
                    (self.at_bats + self.walks + self.sacrifice_flies), 3)
    
    @property
    def slugging_percentage(self):
        if self.at_bats == 0:
            return 0.000
        total_bases = (self.hits - self.doubles - self.triples - self.home_runs) + \
                     (self.doubles * 2) + (self.triples * 3) + (self.home_runs * 4)
        return round(total_bases / self.at_bats, 3)

class PlayerCareerStats(db.Model):
    __tablename__ = 'player_career_stats'
    
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable=False, unique=True)
    
    # Estadísticas acumulativas
    at_bats = db.Column(db.Integer, default=0)
    hits = db.Column(db.Integer, default=0)
    doubles = db.Column(db.Integer, default=0)
    triples = db.Column(db.Integer, default=0)
    home_runs = db.Column(db.Integer, default=0)
    walks = db.Column(db.Integer, default=0)
    strikeouts = db.Column(db.Integer, default=0)
    runs_scored = db.Column(db.Integer, default=0)
    rbis = db.Column(db.Integer, default=0)
    sacrifice_flies = db.Column(db.Integer, default=0)
    
    # Estadísticas calculadas
    @property
    def batting_average(self):
        if self.at_bats == 0:
            return 0.000
        return round(self.hits / self.at_bats, 3)
    
    @property
    def games_played(self):
        # Esto debería calcularse basado en las temporadas
        from app.models.season import SeasonStats
        return SeasonStats.query.filter_by(player_id=self.player_id).count()
```

### 2. Modelo de Equipo con Logo

```python
# models/team.py
from app import db
import os

class Team(db.Model):
    __tablename__ = 'teams'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    city = db.Column(db.String(50))
    logo = db.Column(db.String(255))  # Ruta del logo
    
    # Estadísticas actuales
    wins = db.Column(db.Integer, default=0)
    losses = db.Column(db.Integer, default=0)
    runs_scored = db.Column(db.Integer, default=0)
    runs_allowed = db.Column(db.Integer, default=0)
    
    # Relaciones
    players = db.relationship('Player', backref='team', lazy=True)
    season_stats = db.relationship('TeamSeasonStats', backref='team', lazy=True)
    
    @property
    def logo_url(self):
        if self.logo and os.path.exists(self.logo):
            return f"/static/uploads/teams/{self.logo}"
        else:
            return "/static/images/default-team.png"
    
    @property
    def win_percentage(self):
        if self.wins + self.losses == 0:
            return 0.000
        return round(self.wins / (self.wins + self.losses), 3)
    
    @property
    def games_played(self):
        return self.wins + self.losses
```

## 🎯 Endpoints API para Gestión de Jugadores y Equipos

### 1. Gestión de Jugadores con Fotos

```python
# routes/players.py
import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from app.models import Player, PlayerSeasonStats, PlayerCareerStats
from app import db

players_bp = Blueprint('players', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@players_bp.route('/players', methods=['POST'])
def create_player():
    """Crear un nuevo jugador con posibilidad de subir foto"""
    try:
        data = request.form.to_dict()
        file = request.files.get('profile_picture')
        
        player = Player(
            first_name=data['first_name'],
            last_name=data['last_name'],
            jersey_number=data.get('jersey_number'),
            team_id=data.get('team_id'),
            position=data.get('position')
        )
        
        # Guardar foto si se proporciona
        if file and allowed_file(file.filename):
            filename = secure_filename(f"player_{player.first_name}_{player.last_name}_{datetime.now().timestamp()}.{file.filename.rsplit('.', 1)[1].lower()}")
            upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], 'players', filename)
            os.makedirs(os.path.dirname(upload_path), exist_ok=True)
            file.save(upload_path)
            player.profile_picture = filename
        
        db.session.add(player)
        db.session.commit()
        
        # Crear estadísticas de carrera
        career_stats = PlayerCareerStats(player_id=player.id)
        db.session.add(career_stats)
        db.session.commit()
        
        return jsonify({
            'message': 'Jugador creado exitosamente',
            'player': player.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@players_bp.route('/players/<int:player_id>/picture', methods=['PUT'])
def update_player_picture(player_id):
    """Actualizar foto de perfil del jugador"""
    player = Player.query.get_or_404(player_id)
    file = request.files.get('profile_picture')
    
    if file and allowed_file(file.filename):
        # Eliminar foto anterior si existe
        if player.profile_picture:
            old_path = os.path.join(current_app.config['UPLOAD_FOLDER'], 'players', player.profile_picture)
            if os.path.exists(old_path):
                os.remove(old_path)
        
        # Guardar nueva foto
        filename = secure_filename(f"player_{player.id}_{datetime.now().timestamp()}.{file.filename.rsplit('.', 1)[1].lower()}")
        upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], 'players', filename)
        file.save(upload_path)
        player.profile_picture = filename
        db.session.commit()
        
        return jsonify({
            'message': 'Foto actualizada exitosamente',
            'picture_url': player.profile_picture_url
        })
    
    return jsonify({'error': 'Archivo no válido'}), 400

@players_bp.route('/players/sorted/by-average', methods=['GET'])
def get_players_sorted_by_average():
    """Obtener jugadores ordenados por promedio (mayor a menor)"""
    season_id = request.args.get('season_id')
    min_at_bats = request.args.get('min_at_bats', 10, type=int)
    
    if season_id:
        # Estadísticas por temporada específica
        stats = PlayerSeasonStats.query.filter(
            PlayerSeasonStats.at_bats >= min_at_bats
        ).join(Player).order_by(
            PlayerSeasonStats.batting_average.desc()
        ).all()
        
        players_data = [{
            'player': stat.player.to_dict(),
            'season_stats': stat.to_dict(),
            'current_avg': stat.batting_average
        } for stat in stats]
    else:
        # Estadísticas generales de carrera
        stats = PlayerCareerStats.query.filter(
            PlayerCareerStats.at_bats >= min_at_bats
        ).join(Player).order_by(
            PlayerCareerStats.batting_average.desc()
        ).all()
        
        players_data = [{
            'player': stat.player.to_dict(),
            'career_stats': stat.to_dict(),
            'current_avg': stat.batting_average
        } for stat in stats]
    
    return jsonify(players_data)
```

### 2. Sistema de Guardado Automático y Backups

```python
# services/backup_service.py
import os
import json
from datetime import datetime
from app import db
from app.models import Player, Team, PlayerSeasonStats, PlayerCareerStats

class BackupService:
    @staticmethod
    def create_backup():
        """Crear backup completo de la base de datos"""
        backup_data = {
            'timestamp': datetime.now().isoformat(),
            'players': [],
            'teams': [],
            'season_stats': [],
            'career_stats': []
        }
        
        # Backup de jugadores
        players = Player.query.all()
        for player in players:
            backup_data['players'].append({
                'id': player.id,
                'first_name': player.first_name,
                'last_name': player.last_name,
                'jersey_number': player.jersey_number,
                'team_id': player.team_id,
                'profile_picture': player.profile_picture
            })
        
        # Backup de equipos
        teams = Team.query.all()
        for team in teams:
            backup_data['teams'].append({
                'id': team.id,
                'name': team.name,
                'city': team.city,
                'logo': team.logo,
                'wins': team.wins,
                'losses': team.losses,
                'runs_scored': team.runs_scored,
                'runs_allowed': team.runs_allowed
            })
        
        # Backup de estadísticas
        season_stats = PlayerSeasonStats.query.all()
        for stat in season_stats:
            backup_data['season_stats'].append({
                'id': stat.id,
                'player_id': stat.player_id,
                'season_id': stat.season_id,
                'team_id': stat.team_id,
                'at_bats': stat.at_bats,
                'hits': stat.hits,
                'doubles': stat.doubles,
                'triples': stat.triples,
                'home_runs': stat.home_runs,
                'walks': stat.walks,
                'strikeouts': stat.strikeouts,
                'runs_scored': stat.runs_scored,
                'rbis': stat.rbis,
                'sacrifice_flies': stat.sacrifice_flies
            })
        
        # Guardar archivo de backup
        backup_dir = 'backups'
        os.makedirs(backup_dir, exist_ok=True)
        filename = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        filepath = os.path.join(backup_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(backup_data, f, ensure_ascii=False, indent=2)
        
        # Mantener solo los últimos 7 backups
        BackupService.clean_old_backups(backup_dir)
        
        return filepath
    
    @staticmethod
    def clean_old_backups(backup_dir, keep_last=7):
        """Eliminar backups antiguos, mantener solo los últimos 'keep_last'"""
        backups = []
        for file in os.listdir(backup_dir):
            if file.startswith('backup_') and file.endswith('.json'):
                filepath = os.path.join(backup_dir, file)
                backups.append((filepath, os.path.getctime(filepath)))
        
        # Ordenar por fecha de creación (más reciente primero)
        backups.sort(key=lambda x: x[1], reverse=True)
        
        # Eliminar backups antiguos
        for backup in backups[keep_last:]:
            os.remove(backup[0])
    
    @staticmethod
    def auto_save():
        """Guardado automático periódico"""
        try:
            # Realizar commit de la sesión actual
            db.session.commit()
            
            # Crear backup cada 24 horas
            last_backup = getattr(BackupService, '_last_backup', None)
            if last_backup is None or (datetime.now() - last_backup).total_seconds() > 86400:
                BackupService.create_backup()
                BackupService._last_backup = datetime.now()
                
            return True
        except Exception as e:
            db.session.rollback()
            current_app.logger.error(f"Error en guardado automático: {e}")
            return False
```

### 3. Configuración de la Aplicación con Persistencia

```python
# config.py
import os
from datetime import timedelta

class Config:
    # Configuración de base de datos
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://username:password@localhost/softball_stats'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configuración de uploads
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Configuración de backups
    BACKUP_INTERVAL = timedelta(hours=24)
    KEEP_BACKUPS = 7
    
    # Configuración de seguridad
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'

# Configuración de desarrollo
class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_ECHO = True

# Configuración de producción
class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_ECHO = False
```

## 🎨 Frontend - Gestión de Jugadores con Fotos

### Componente de Registro de Jugador

```jsx
// components/PlayerForm.jsx
import React, { useState } from 'react';
import { playersAPI } from '../services/api';

const PlayerForm = ({ onPlayerCreated, teams }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    jersey_number: '',
    team_id: '',
    position: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) data.append(key, formData[key]);
      });
      
      if (profilePicture) {
        data.append('profile_picture', profilePicture);
      }

      const response = await playersAPI.create(data);
      onPlayerCreated(response.data.player);
      
      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        jersey_number: '',
        team_id: '',
        position: ''
      });
      setProfilePicture(null);
      
    } catch (error) {
      console.error('Error creating player:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="player-form">
      <h3>Registrar Nuevo Jugador</h3>
      
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Apellido:</label>
        <input
          type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Número de Camiseta:</label>
        <input
          type="number"
          value={formData.jersey_number}
          onChange={(e) => setFormData({...formData, jersey_number: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Equipo:</label>
        <select
          value={formData.team_id}
          onChange={(e) => setFormData({...formData, team_id: e.target.value})}
        >
          <option value="">Seleccionar equipo</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Posición:</label>
        <input
          type="text"
          value={formData.position}
          onChange={(e) => setFormData({...formData, position: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Foto de Perfil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {profilePicture && (
          <div className="image-preview">
            <img src={URL.createObjectURL(profilePicture)} alt="Preview" />
          </div>
        )}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar Jugador'}
      </button>
    </form>
  );
};

export default PlayerForm;
```

### Componente de Lista de Jugadores Ordenados

```jsx
// components/PlayersList.jsx
import React, { useState, useEffect } from 'react';
import { playersAPI } from '../services/api';

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [sortBy, setSortBy] = useState('average');
  const [seasonFilter, setSeasonFilter] = useState('career');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, [sortBy, seasonFilter]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      let response;
      
      if (seasonFilter === 'career') {
        response = await playersAPI.getSortedByAverage();
      } else {
        response = await playersAPI.getSortedByAverage(seasonFilter);
      }
      
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando jugadores...</div>;

  return (
    <div className="players-list">
      <div className="filters">
        <select value={seasonFilter} onChange={(e) => setSeasonFilter(e.target.value)}>
          <option value="career">Estadísticas Generales</option>
          <option value="current">Temporada Actual</option>
          {/* Aquí se pueden agregar más temporadas */}
        </select>
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="average">Promedio de Bateo</option>
          <option value="hits">Hits</option>
          <option value="hr">Home Runs</option>
          <option value="rbi">Carreras Impulsadas</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Jugador</th>
            <th>Equipo</th>
            <th>AVG</th>
            <th>H</th>
            <th>2B</th>
            <th>3B</th>
            <th>HR</th>
            <th>CI</th>
          </tr>
        </thead>
        <tbody>
          {players.map((playerData, index) => {
            const player = playerData.player;
            const stats = seasonFilter === 'career' ? playerData.career_stats : playerData.season_stats;
            
            return (
              <tr key={player.id}>
                <td>{index + 1}</td>
                <td className="player-info">
                  <img 
                    src={player.profile_picture_url} 
                    alt={player.full_name}
                    className="player-photo"
                  />
                  <div>
                    <div className="player-name">{player.full_name}</div>
                    {player.jersey_number && (
                      <div className="jersey-number">#{player.jersey_number}</div>
                    )}
                  </div>
                </td>
                <td>{player.team?.name || 'Sin equipo'}</td>
                <td className="highlight">{stats.batting_average.toFixed(3)}</td>
                <td>{stats.hits}</td>
                <td>{stats.doubles}</td>
                <td>{stats.triples}</td>
                <td>{stats.home_runs}</td>
                <td>{stats.rbis}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList;
```

Este sistema completo cumple con todos los requisitos especificados: gestión de estadísticas por temporada y generales, registro de jugadores con fotos, ordenamiento por promedio, y un robusto sistema de persistencia y backups automáticos.
