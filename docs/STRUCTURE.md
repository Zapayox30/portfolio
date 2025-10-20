# 📁 Estructura del Proyecto

Esta documentación describe la organización y arquitectura del portfolio.

## 🏗️ Arquitectura General

```
src/
├── components/          # Componentes React organizados por tipo
│   ├── layout/         # Componentes de layout (Navbar, Footer)
│   ├── sections/       # Secciones principales (Hero, About, etc.)
│   ├── ui/            # Componentes UI reutilizables
│   └── index.js       # Barrel exports
├── hooks/             # Custom React hooks
├── utils/             # Funciones utilitarias
├── constants/         # Constantes y datos estáticos
├── config/           # Configuración de la aplicación
├── assets/           # Recursos estáticos (imágenes, iconos)
└── styles/           # Estilos globales (si es necesario)
```

## 📦 Componentes

### Layout Components (`/components/layout/`)
Componentes que definen la estructura general de la aplicación:

- **Navbar/** - Navegación principal
- **Footer/** - Pie de página
- **index.js** - Exports de layout

### Section Components (`/components/sections/`)
Secciones principales del portfolio:

- **Hero/** - Sección principal con 3D
- Otros componentes de sección se mantienen en la raíz por compatibilidad

### UI Components (`/components/ui/`)
Componentes reutilizables de interfaz:

- **Button/** - Botones con variantes
- **Card/** - Tarjetas con efectos
- **LoadingSpinner/** - Indicadores de carga
- **index.js** - Exports de UI

## 🎣 Custom Hooks (`/hooks/`)

### useScrollPosition
Maneja la posición y dirección del scroll:
```javascript
const { scrollPosition, scrollDirection } = useScrollPosition()
```

### useIntersectionObserver
Detecta cuando elementos entran en viewport:
```javascript
const [ref, isIntersecting, hasIntersected] = useIntersectionObserver()
```

### useLocalStorage
Maneja datos en localStorage con sincronización:
```javascript
const [value, setValue] = useLocalStorage('key', defaultValue)
```

## 🛠️ Utilidades (`/utils/`)

### animations.js
Variantes de animación para Framer Motion:
- `fadeInUp`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `staggerContainer`
- `hoverScale`, `hoverLift`, `hoverGlow`

### helpers.js
Funciones utilitarias:
- Scroll: `scrollToSection()`, `scrollToTop()`
- Validación: `validateEmail()`, `validateForm()`
- Performance: `debounce()`, `throttle()`
- Utilidades: `formatNumber()`, `generateId()`

## 📊 Constantes (`/constants/`)

Datos centralizados de la aplicación:
- `PERSONAL_INFO` - Información personal
- `SOCIAL_LINKS` - Enlaces de redes sociales
- `NAV_ITEMS` - Elementos de navegación
- `SKILLS_DATA` - Datos de habilidades
- `PROJECTS_DATA` - Información de proyectos
- `STATS_DATA` - Estadísticas
- `CONTACT_INFO` - Información de contacto

## ⚙️ Configuración (`/config/`)

### APP_CONFIG
Configuración general de la aplicación:
```javascript
{
  name: 'Portfolio Sandro Reátegui',
  version: '2.0.0',
  description: '...',
  author: 'Sandro Reátegui'
}
```

### THEME_CONFIG
Configuración de tema y colores:
```javascript
{
  colors: { primary: {...}, secondary: {...} },
  breakpoints: { sm: '640px', md: '768px', ... }
}
```

### PERFORMANCE_CONFIG
Configuración de rendimiento:
```javascript
{
  lazyLoadOffset: 100,
  debounceDelay: 300,
  throttleDelay: 100
}
```

## 🔄 Patrón de Imports

### Barrel Exports
Cada carpeta principal tiene un `index.js` que exporta todos sus componentes:

```javascript
// components/ui/index.js
export { default as Button } from './Button'
export { default as Card } from './Card'

// Uso en otros archivos
import { Button, Card } from '../ui'
```

### Imports Organizados
```javascript
// Librerías externas primero
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Componentes internos
import { Button, Card } from '../ui'

// Utilidades y constantes
import { PERSONAL_INFO } from '../../constants'
import { scrollToSection } from '../../utils/helpers'
```

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px - Móviles grandes
- **md**: 768px - Tablets
- **lg**: 1024px - Laptops
- **xl**: 1280px - Desktops
- **2xl**: 1536px - Pantallas grandes

### Clases Responsive
```css
.grid-cols-1 md:grid-cols-2 lg:grid-cols-3
.text-base md:text-lg lg:text-xl
.px-4 md:px-6 lg:px-8
```

## 🎨 Convenciones de Naming

### Componentes
- **PascalCase**: `Button`, `LoadingSpinner`
- **Carpetas**: Mismo nombre que el componente
- **Archivos**: `ComponentName.jsx` + `index.js`

### Hooks
- **camelCase**: `useScrollPosition`, `useLocalStorage`
- **Prefijo**: Siempre empezar con `use`

### Constantes
- **UPPER_SNAKE_CASE**: `PERSONAL_INFO`, `SOCIAL_LINKS`
- **Agrupadas**: Por funcionalidad en objetos

### Funciones
- **camelCase**: `scrollToSection`, `validateEmail`
- **Descriptivas**: Nombres que explican la acción

## 🚀 Performance

### Code Splitting
```javascript
const Hero = lazy(() => import('./components/sections/Hero'))
```

### Memoización
```javascript
const MemoizedComponent = memo(Component)
```

### Optimización de Re-renders
- Usar `useCallback` para funciones
- Usar `useMemo` para cálculos costosos
- Evitar objetos inline en props

## 🧪 Testing (Futuro)

### Estructura de Tests
```
src/
├── components/
│   └── Button/
│       ├── Button.jsx
│       ├── Button.test.jsx
│       └── index.js
└── __tests__/
    ├── utils/
    └── hooks/
```

### Convenciones
- **Unit Tests**: `Component.test.jsx`
- **Integration Tests**: `Feature.integration.test.jsx`
- **E2E Tests**: `cypress/integration/`

## 📚 Documentación

### Componentes
Cada componente debe tener:
- JSDoc con descripción
- PropTypes o TypeScript
- Ejemplos de uso
- Casos edge

### Funciones
```javascript
/**
 * Valida un email usando regex
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
export const validateEmail = (email) => { ... }
```

## 🔧 Mantenimiento

### Agregar Nuevo Componente
1. Crear carpeta en la categoría apropiada
2. Crear `ComponentName.jsx`
3. Crear `index.js` con export
4. Actualizar barrel export del padre
5. Documentar en README si es necesario

### Agregar Nueva Utilidad
1. Añadir función en archivo apropiado de `/utils/`
2. Exportar en el archivo
3. Documentar con JSDoc
4. Añadir tests si es compleja

### Actualizar Constantes
1. Modificar en `/constants/index.js`
2. Verificar que no rompa componentes existentes
3. Actualizar documentación si es necesario
