# DNXT LAB - Audio Speaker Landing Page

Una página de aterrizaje moderna para altavoces de audio con animaciones fluidas y diseño responsivo.

## 🚀 Características

- **Animación de carga**: Efecto de texto animado "DNXT LAB" con transición suave
- **Video de fondo**: Reproducción automática de video con overlay
- **Diseño responsivo**: Optimizado para todos los dispositivos
- **Tipografía personalizada**: Fuentes Morien e Inter
- **Arquitectura modular**: Componentes y hooks organizados

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Estilos globales y utilidades Tailwind
│   ├── layout.tsx          # Layout principal de la aplicación
│   └── page.tsx            # Página principal
├── components/
│   ├── LoadingAnimation.tsx # Componente de animación inicial
│   ├── Navbar.tsx          # Componente de navegación
│   └── VideoContent.tsx    # Componente de contenido principal
├── hooks/
│   └── useLoadingAnimation.ts # Hook personalizado para animación
└── types/
    └── index.ts            # Definiciones de tipos TypeScript
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 14**: Framework de React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de CSS utilitario
- **React Hooks**: Estado y efectos personalizados

## 🎨 Componentes Principales

### LoadingAnimation
- Maneja la animación inicial "DNXT LAB"
- Transición de letras grises a blancas
- Logo animado con efectos suaves

### VideoContent
- Video de fondo a pantalla completa
- Contenido superpuesto con navbar
- Layout responsivo con contenido izquierdo y derecho

### useLoadingAnimation Hook
- Gestiona el estado de la animación
- Controla las fases: initial → animating → video
- Timing personalizable para efectos

## 🎯 Especificaciones de Diseño

### Tipografía
- **Título principal**: Morien, 136px (responsive)
- **Descripción**: Inter, 32px (responsive)
- **Botón**: Morien, 22px (responsive)

### Colores
- **Fondo**: Negro (#000000)
- **Texto**: Blanco (#FFFFFF)
- **Botón**: Blanco con texto negro
- **Overlay**: Negro con 30% transparencia

### Animaciones
- **Duración**: 1.5s para transiciones
- **Timing**: 120ms entre letras
- **Easing**: ease-out para suavidad

## 📱 Diseño Responsivo

- **Desktop**: Layout completo con contenido izquierdo/derecho
- **Tablet**: Ajustes de tamaño de fuente y espaciado
- **Mobile**: Stack vertical con navegación optimizada

## 🔧 Personalización

Los estilos personalizados se encuentran en `globals.css`:
- Tamaños de fuente con `clamp()` para responsividad
- Utilidades Tailwind personalizadas
- Variables de ancho máximo para layout

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.