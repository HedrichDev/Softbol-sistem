# 🚀 Sistema de Estadísticas de Softbol 
## 📊 LIGA RISARALDENSE 

¡Bienvenidos a la revolución digital del softball risaraldense!

HedrichDev se complace en presentar una solución tecnológica integral diseñada específicamente para elevar la gestión de las estadísticas de la Liga Risaraldense de Softbol a estándares profesionales.

Este sistema no es solo una herramienta de registro, sino un ecosistema inteligente que transformará la manera en que se capturan, analizan y aprovechan los datos deportivos. Imagine tener acceso instantáneo a:

    📊 Estadísticas en tiempo real con cálculos automáticos de averages, ERA y porcentajes de victoria

    👥 Gestión centralizada de jugadores, equipos y temporadas

    🏆 Rankings automáticos que reconocen el rendimiento excepcional

    📱 Acceso móvil desde cualquier dispositivo, en cualquier momento (futuro)

    💾 Protección de datos con respaldos automáticos y almacenamiento persistente

 El diseño de esta plataforma con pasión por el deporte y expertise tecnológico, creando un sistema que honra la tradición del softball mientras embrace la innovación digital.

### 🎯 PROPÓSITO DEL SISTEMA
Sistema de estadísticas para torneos de softball que registra:
- **Rendimiento individual** de jugadores
- **Estadísticas de equipos** y clasificación
- **Calendario de partidos** y programación
- **Rankings** de mejores jugadores en diferentes categorías

### 📋 ESTRUCTURA DE DATOS 

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

### 🔧 TECNOLOGÍAS 

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


# 📊 SISTEMA DE CÁLCULO DETALLADO DE LAS ESTADÍSTICAS

## 🔢 1. ESTADÍSTICAS DE JUGADORES (BATEADORES)

### **AVG - Promedio de Bateo**
**Fórmula:** `AVG = HC / VB`

- **Cómo sube:** Cuando el jugador conecta hits (HC aumenta)
- **Cómo baja:** Cuando el jugador hace out sin conectar hit (VB aumenta pero HC no)
- **Puntos clave:**
  - Solo se cuenta como VB cuando el bateador completa su turno al bate (no incluye bases por bolas, sacrificios ni interferencias)
  - Un hit (HC) siempre mejora el promedio
  - Un out empeora el promedio porque aumenta VB sin aumentar HC
  - Es un ratio que muestra la frecuencia con que el jugador conecta hits

### **Componentes del AVG:**

**VB (Veces al bate):**
- Se cuenta cada vez que el bateador completa su turno al bate
- No se incluyen: bases por bolas, sacrificios, golpeado por lanzamiento, interferencia del catcher

**HC (Hits conectados):**
- Se cuenta cuando el bateador llega a base por un hit válido
- Incluye: singles, dobles, triples y home runs

**2B (Dobles):** Hits que permiten llegar a segunda base
**3B (Triples):** Hits que permiten llegar a tercera base  
**HR (Home runs):** Hits que permiten recorrer todas las bases y anotar

**BB (Bases por bolas):**
- Lanzamientos fuera de la zona de strike que resultan en base
- No afecta el VB ni el AVG

**K (Ponches):**
- Cuando el bateador acumula 3 strikes
- Cuenta como VB y out → baja el AVG

**CA (Carreras anotadas):**
- Veces que el jugador cruza el home plate y anota

**CI (Carreras impulsadas):**
- Carreras anotadas como resultado directo de la acción del bateador
- Se cuenta cuando un hit, out de sacrificio o base por bolas permite anotar a un corredor

**SF (Sacrificios):**
- Outs intencionales que avanzan corredores
- No cuenta como VB → no afecta el AVG

---

## 🎯 2. ESTADÍSTICAS DE PITCHERS (LANZADORES)

### **PJG (Juegos ganados) / PJP (Juegos perdidos)**
- **PJG:** Se acredita al pitcher que estaba en el montículo cuando su equipo tomó la ventaja que nunca perdió
- **PJP:** Se acredita al pitcher que permitió la carrera que dio la ventaja al equipo contrario

### **KP (Ponches propinados)**
- Número de bateadores que ponchó (3 strikes)

### **BBP (Bases por bolas propinadas)**
- Lanzamientos fuera de la zona de strike que otorgan base al bateador

### **CP (Carreras permitidas)**
- Todas las carreras anotadas mientras el pitcher estaba en el juego

### **IL (Hits permitidos)**
- Todos los hits conectados mientras el pitcher estaba en el juego

### **HP (Carreras earned - Limpias)**
**Fórmula:** `HP = CP - Carreras no merecidas`
- Carreras que son responsabilidad directa del pitcher
- No incluye carreras que anotaron por errores defensivos

---

## 📈 3. ESTADÍSTICAS DE EQUIPOS

### **JJ (Juegos jugados)**
- Total de partidos disputados: `JJ = JG + JP + JE`

### **JG (Juegos ganados)**
- Partidos donde el equipo anotó más carreras

### **JP (Juegos perdidos)**
- Partidos donde el equipo anotó menos carreras

### **JE (Juegos empatados)**
- Partidos suspendidos o terminados con igual score

### **AVG (Porcentaje de victorias)**
**Fórmula:** `AVG = JG / (JG + JP)`
- Si JE > 0, no se consideran los empates en el cálculo
- Muestra el rendimiento global del equipo

### **CA (Carreras anotadas)**
- Total de carreras anotadas por el equipo en toda la temporada

### **CC (Carreras permitidas)**
- Total de carreras permitidas por el equipo en toda la temporada

---

## 🏆 4. SISTEMA DE RANKINGS

### **Top 10 Mejores Bateadores**
**Criterio:** Mayor AVG (con mínimo de 12 VB por temporada)
- Se ordena por promedio de bateo de mayor a menor
- Requisito mínimo de apariciones para evitar distorsiones

### **Top 3 Mejores Pitchers**
**Criterio:** Mayor cantidad de JG (juegos ganados)
- En caso de empate, se considera menor PJP (juegos perdidos)
- Segundo criterio: menor HP (carreras limpias permitidas)

### **Top 5 en Carreras Impulsadas (CI)**
- Jugadores con mayor cantidad de carreras impulsadas
- Mide la efectividad para producir carreras

### **Top 5 en Dobles (2B)**
- Jugadores con mayor cantidad de hits de dos bases
- Mide la potencia de bateo para hits largos

### **Top 5 en Home Runs (HR)**
- Jugadores con mayor cantidad de cuadrangulares
- Mide la máxima potencia de bateo

### **Top 5 Pitchers con más Ponches (KP)**
- Lanzadores con mayor cantidad de ponches propinados
- Mide la efectividad para dominar bateadores

---

## ⚙️ 5. SISTEMA DE CÁLCULO AUTOMÁTICO

### **Actualización en Tiempo Real**
- Cada acción en el juego actualiza inmediatamente las estadísticas
- El sistema recalcula automáticamente todos los promedios y rankings

### **Cálculo de Promedios**
- **AVG:** Se recalcula después de cada turno al bate
- **Porcentaje de victorias:** Se actualiza después de cada juego
- **ERA (para pitchers):** `(HP × 9) / Entradas lanzadas`

### **Lógica de Afectación**
- **Un hit:** ↑ HC, ↑ AVG
- **Un out por ponche:** ↑ VB, ↑ K, ↓ AVG  
- **Un out de fildeo:** ↑ VB, ↓ AVG
- **Base por bolas:** ↑ BB, no afecta VB ni AVG
- **Sacrificio:** ↑ SF, no afecta VB ni AVG
- **Carrera anotada:** ↑ CA
- **Carrera impulsada:** ↑ CI

### **Validaciones del Sistema**
- Mínimo de apariciones para rankings (evita estadísticas irrelevantes)
- Verificación de consistencia entre estadísticas relacionadas
- Prevención de datos duplicados o inconsistentes
- Historial de cambios para auditoría

### **Estadísticas Avanzadas (No en el Excel pero importantes)**
- **OBP (Porcentaje de embasarse):** `(HC + BB + HBP) / (VB + BB + HBP + SF)`
- **SLG (Porcentaje de slugging):** `(Sencillos + 2B×2 + 3B×3 + HR×4) / VB`
- **OPS (Suma de OBP + SLG):** Mide la efectividad total del bateador

Este sistema garantiza que todas las estadísticas se calculen de manera consistente, precisa y automática, proporcionando información confiable para jugadores, entrenadores y aficionados.


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



export default PlayersList;
```

Este sistema completo cumple con todos los requisitos especificados: gestión de estadísticas por temporada y generales, registro de jugadores con fotos, ordenamiento por promedio, y un robusto sistema de persistencia y backups automáticos.
