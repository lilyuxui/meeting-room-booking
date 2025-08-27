# GL - Meeting Room Booking App

A responsive React application for booking meeting rooms, designed with a mobile-first approach and built using React, TypeScript, and Tailwind CSS.

## 🎨 Design System

This app follows the exact design specifications from the Figma file, including:

### Colors
- **Primary Brand**: `#0e7c3a` (Green)
- **Brand Tertiary**: `#edfdf3` (Light Green Background)
- **Text Primary**: `#121c2d` (Dark Text)
- **Text Secondary**: `#606b85` (Secondary Text)
- **Background Gray**: `#f4f4f6` (Light Gray)
- **Border Light**: `#e1e3ea` (Light Border)
- **Border Success**: `#a2f6c3` (Success Border)
- **Border Success Hover**: `#36d576` (Success Border Hover)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 700 (Bold)
- **Line Height**: 1.5

### Spacing & Layout
- **Border Radius**: 24px (3xl), 16px (2xl), 8px (md)
- **Max Width**: 896px (container)
- **Padding**: 16px (p-4), 24px (p-6)
- **Gaps**: 6px (gap-1.5), 8px (gap-2), 16px (gap-4), 24px (gap-6)

## 📱 Responsive Design

The app is built with a mobile-first approach and includes responsive breakpoints:

- **Mobile**: Single column layout, stacked navigation
- **Tablet (md)**: Two-column time slot grid, side-by-side navigation
- **Desktop (lg)**: Optimized spacing and larger containers

## 🚀 Features

### Room Selection
- Toggle between Room Lime and Room Teal
- Visual feedback for selected room
- Responsive button design

### Date Selection
- Date picker with day and date display
- Previous/Next navigation
- "Today" quick action button
- Responsive layout (mobile: stacked, desktop: side-by-side)

### Time Slot Booking
- 30-minute time slots from 8:00 AM to 5:00 PM
- Available/Booked status indicators
- Interactive booking functionality
- Responsive grid layout
- Visual feedback for booked slots

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS 3** for styling
- **PostCSS** for CSS processing
- **Create React App** for build tooling

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.tsx          # App header with logo and title
│   ├── RoomSelection.tsx   # Room toggle selection
│   ├── DateSelection.tsx   # Date picker and navigation
│   ├── TimeSlotBooking.tsx # Main booking interface
│   ├── TimeSlot.tsx        # Individual time slot component
│   └── Footer.tsx          # App footer
├── App.tsx                 # Main app component
├── index.tsx               # App entry point
└── index.css               # Global styles and Tailwind imports
```

## 🎯 Component Architecture

### App.tsx
Main container that manages state for selected room and date.

### Header
Fixed header with company logo and app title.

### RoomSelection
Interactive room selection with toggle buttons and visual feedback.

### DateSelection
Date navigation with responsive layout and quick actions.

### TimeSlotBooking
Main booking interface with responsive grid layout.

### TimeSlot
Individual time slot component with different states (available/booked).

### Footer
Simple footer with credit information.

## 🔧 Customization

### Adding New Colors
Update the `tailwind.config.js` file to add new color variables:

```javascript
colors: {
  'custom': {
    'primary': '#your-color',
    'secondary': '#your-color',
  }
}
```

### Modifying Breakpoints
Tailwind's default breakpoints are used:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Adding New Components
Follow the existing component pattern with TypeScript interfaces and Tailwind classes.

## 📱 Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## 🚀 Deployment

The app can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `build/` folder to your hosting service
3. Ensure the service supports single-page applications (SPA)

## 👨‍💻 Development

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Responsive design patterns

### State Management
- React hooks for local state
- Props for component communication
- No external state management libraries

## 📄 License

This project is created based on the Figma design by Lily Yang.

---

**Made with ❤️ by Lily Yang**
