# Game Hub Design Guidelines

## Design Approach: Retro-Modern Gaming Aesthetic

Drawing inspiration from Nintendo Switch UI and Steam's game library interface, blending nostalgic gaming vibes with modern web design principles. This creates an inviting, playful atmosphere while maintaining professional polish.

## Core Design Principles
- **Playful yet Professional**: Balance fun gaming aesthetics with clean, usable interfaces
- **Game-First Focus**: Each game should feel like its own immersive experience
- **Clear Hierarchy**: Easy navigation between hub, games, and profiles
- **Instant Feedback**: Visual responses to all user actions

## Color Palette

### Dark Mode (Primary)
- **Background Base**: 220 20% 12% (deep navy-charcoal)
- **Surface Elevated**: 220 18% 18% (lighter surface for cards)
- **Primary Accent**: 265 85% 65% (vibrant purple - gaming energy)
- **Success/Win**: 145 65% 55% (bright teal-green)
- **Warning/Loss**: 15 85% 60% (energetic orange-red)
- **Text Primary**: 220 15% 95% (near white)
- **Text Secondary**: 220 12% 70% (muted light)

### Light Mode
- **Background Base**: 220 25% 97% (soft off-white)
- **Surface Elevated**: 0 0% 100% (pure white cards)
- **Primary Accent**: 265 75% 55% (slightly deeper purple)
- **Maintain same success/warning colors for consistency**

## Typography

**Font Stack**: 
- **Headings**: 'Press Start 2P' (Google Fonts) - retro gaming feel for titles
- **Body/UI**: 'Inter' (Google Fonts) - clean, readable for gameplay text
- **Monospace**: 'JetBrains Mono' - for scores and numbers

**Scale**:
- Hero/Game Titles: text-4xl to text-6xl, font-bold
- Section Headers: text-2xl to text-3xl, font-semibold  
- Body Text: text-base to text-lg
- Small UI: text-sm for labels, text-xs for hints

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16 for consistency
- Component padding: p-6 or p-8
- Section gaps: gap-8 or gap-12
- Margins: m-4, m-6, m-8

**Grid Structure**:
- Game selection grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Dashboard stats: grid-cols-2 md:grid-cols-4
- Max content width: max-w-7xl for hub, max-w-4xl for individual games

## Component Library

### Navigation & Hub
- **Top Bar**: Fixed navigation with profile selector, scores icon, back button
- **Game Grid Cards**: Elevated cards with game icons, hover lift effect, win count badges
- **Profile Selector**: Dropdown with avatar placeholders and "+New Profile" option

### Game Containers
- **Game Frame**: Centered max-w-3xl container with rounded-2xl border
- **Game Header**: Title, score display, exit button
- **Game Board**: Appropriate sizing for each game type (Tic-Tac-Toe grid, card displays, etc.)
- **Action Buttons**: Large, colorful CTAs (primary purple, secondary outlined)

### Interactive Elements
- **Buttons**: Rounded-lg, px-6 py-3, with subtle hover scale (scale-105)
- **Input Fields**: Dark bg with lighter border, focus ring in primary color
- **Cards**: Elevated with shadow-lg, hover:shadow-xl transition
- **Modals**: Backdrop blur with centered content, smooth fade animations

### Game-Specific Components
- **Number Guessing**: Input field with large submit button, hint text display
- **Blackjack**: Card visuals (rectangles with suit icons), hit/stand buttons
- **Tic-Tac-Toe**: 3x3 grid with large clickable cells, X/O symbols
- **Spin the Wheel**: Input field for names, animated spinner visualization
- **Shadow Boxing**: Direction buttons (Up/Down/Left/Right) in cross pattern
- **Scoreboard**: Table layout with game names, player columns, win counts

### Status & Feedback
- **Win/Loss Messages**: Toast-style notifications with appropriate colors
- **Score Badges**: Pill-shaped counters with gradient backgrounds
- **Loading States**: Pulse animations for game transitions
- **Empty States**: Friendly messages with game suggestions

## Animations

**Minimal & Purposeful**:
- Card hover: subtle lift (translateY(-4px)) with shadow increase
- Button press: slight scale-down (scale-95) on active
- Game transitions: smooth fade (opacity + translateY)
- Win celebration: confetti burst (library: canvas-confetti)
- NO continuous animations, NO distracting effects

## Images

### Hero Section (Optional)
- **Background**: Stylized gaming controller/arcade joystick illustration
- **Style**: Gradient mesh overlay, semi-transparent
- **Placement**: Full-width behind "Welcome to Game Hub" header

### Game Card Icons
- **Number Guessing**: Dice or numbers icon
- **Blackjack**: Playing cards icon  
- **Tic-Tac-Toe**: Grid with X and O
- **Spin the Wheel**: Wheel/spinner icon
- **Shadow Boxing**: Boxing gloves icon
- **Use**: Icon library (Heroicons or Font Awesome) for consistency

### Profile Avatars
- **Default**: Colorful geometric patterns or gaming-themed placeholder icons
- **Style**: Circular, 40px-64px diameter depending on context

## Responsive Behavior

- **Mobile (< 768px)**: Single column, full-width game containers, larger touch targets
- **Tablet (768-1024px)**: 2-column game grid, comfortable spacing
- **Desktop (> 1024px)**: 3-column grid, max-width constraints, hover effects active

## Accessibility Notes

- Maintain 4.5:1 contrast ratios for all text
- Keyboard navigation for all games
- Focus indicators on all interactive elements
- Screen reader labels for game controls
- Dark mode default with toggle option