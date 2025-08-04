# DNXT LAB - Audio Speaker Landing Page

A modern landing page for audio speakers with smooth animations and responsive design.

## 🚀 Features

- **Loading animation**: Animated "DNXT LAB" text effect with smooth transition
- **Background video**: Auto-playing video with overlay
- **Responsive design**: Optimized for all devices
- **Custom typography**: Morien and Inter fonts
- **Modular architecture**: Organized components and hooks

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind utilities
│   ├── layout.tsx          # Main application layout
│   └── page.tsx            # Main page
├── components/
│   ├── LoadingAnimation.tsx # Initial animation component
│   ├── Navbar.tsx          # Navigation component
│   └── VideoContent.tsx    # Main content component
├── hooks/
│   └── useLoadingAnimation.ts # Custom hook for animation
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🛠️ Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Static typing
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Custom state and effects

## 🎨 Main Components

### LoadingAnimation
- Handles initial "DNXT LAB" animation
- Gray to white letter transition
- Animated logo with smooth effects

### VideoContent
- Full-screen background video
- Overlaid content with navbar
- Responsive layout with left and right content

### useLoadingAnimation Hook
- Manages animation state
- Controls phases: initial → animating → video
- Customizable timing for effects

## 🎯 Design Specifications

### Typography
- **Main title**: Morien, 136px (responsive)
- **Description**: Inter, 32px (responsive)
- **Button**: Morien, 22px (responsive)

### Colors
- **Background**: Black (#000000)
- **Text**: White (#FFFFFF)
- **Button**: White with black text
- **Overlay**: Black with 30% transparency

### Animations
- **Duration**: 1.5s for transitions
- **Timing**: 120ms between letters
- **Easing**: ease-out for smoothness

## 📱 Responsive Design

- **Desktop**: Full layout with left/right content
- **Tablet**: Font size and spacing adjustments
- **Mobile**: Vertical stack with optimized navigation

## 🔧 Customization

Custom styles are found in `globals.css`:
- Font sizes with `clamp()` for responsiveness
- Custom Tailwind utilities
- Maximum width variables for layout

## 📄 License

This project is under the MIT License.