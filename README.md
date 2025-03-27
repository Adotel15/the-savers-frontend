# The Savers - Sistema de Recomendaciones

Aplicación web desarrollada en React que proporciona recomendaciones de productos y las mejoras horas para asistir a la tienda a recoger el pedido y así poder ofrecer un servicio más eficiente y eficaz, de esta forma satisfacer las necesidades de los clientes. La aplicación está construida con React y Material-UI, ofreciendo una interfaz moderna y responsive.

## Características Principales

- Recomendación de productos basada en selecciones previas
- Recomendación de horas óptimas de recogida por tienda
- Interfaz responsive adaptada a móvil y desktop
- Diseño moderno con Material-UI

## Estructura de Componentes

### App.jsx
Componente principal que gestiona:
- Navegación por pestañas entre productos y horas
- Estado global de la aplicación
- Manejo de errores y estados de carga
- Integración de todos los componentes

### ProductSelector.jsx
Permite al usuario seleccionar productos para obtener recomendaciones:
- Entrada de IDs de productos
- Entrada de histórico de compras
- Validación de entradas
- Envío de selecciones al servidor

### RecommendationsList.jsx
Muestra la lista de productos recomendados:
- Grid responsive de 2 columnas
- Tarjetas de producto con imagen y nombre
- Diseño optimizado para móvil y desktop
- Manejo de estados de carga y error

### HoursRecommendation.jsx
Gestiona la recomendación de horas:
- Integra StoreSelector y HoursList
- Manejo de estados y errores
- Comunicación con la API

### StoreSelector.jsx
Permite seleccionar la tienda:
- Campo de entrada para ID de tienda
- Validación de entrada
- Botón de envío

### HoursList.jsx
Muestra las horas recomendadas:
- Grid de horas disponibles
- Selección de hora
- Confirmación de reserva
- Feedback visual mediante Snackbar

## API y Servicios

### api.js
Contiene las funciones de comunicación con el backend:

#### getRecommendations
- Endpoint: `/recommended-items`
- Método: POST
- Parámetros: productos seleccionados e histórico
- Respuesta: lista de productos recomendados con imágenes y detalles

#### getRecommendedHours
- Endpoint: `/recommended-hours`
- Método: GET
- Parámetros: ID de tienda
- Respuesta: lista de horas con indicador de recomendación

## Diseño Responsive

### Mobile First
- Diseño optimizado para dispositivos móviles
- Grid de 2 columnas para productos
- Tamaños de fuente y espaciado adaptables
- Imágenes optimizadas para cada dispositivo

### Desktop
- Aprovechamiento del espacio adicional
- Mantenimiento de la legibilidad
- Interacciones mejoradas (hover effects)
- Mayor tamaño de imágenes

## Tecnologías Utilizadas

- React 18
- Material-UI
- Vite
- CSS Modules

## Instalación y Ejecución

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Ejecutar en modo desarrollo:
```bash
npm run dev
```
4. Construir para producción:
```bash
npm run build
```

## Estructura del Proyecto

```
src/
  ├── components/         # Componentes React
  ├── services/           # Servicios y API
  ├── assets/            # Recursos estáticos
  ├── App.jsx            # Componente principal
  ├── main.jsx           # Punto de entrada
  └── index.css          # Estilos globales
```
