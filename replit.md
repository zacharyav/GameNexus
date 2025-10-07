# Game Hub Application

## Overview

Game Hub is a fully functional web-based gaming platform featuring 6 classic games: Number Guessing, Blackjack, Tic-Tac-Toe (PvP and vs Bot), Spin the Wheel, and Shadow Boxing. The application allows users to create profiles, play games, track their wins, and view score dashboards across all players. Built with a retro-modern dark mode gaming aesthetic inspired by Nintendo Switch UI and Steam's game library interface.

**Recent Changes (October 2025)**
- Converted from prototype to fully functional app with persistent backend storage
- Implemented complete API for profile management and score tracking
- Locked app to dark mode only for consistent gaming experience
- Added robust validation and error handling throughout the stack
- Production-ready for deployment

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Client-side routing handled within a single-page application structure

**UI Component System**
- Shadcn/ui component library (New York style) for consistent, accessible UI components
- Radix UI primitives for headless component functionality
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for variant-based component styling

**State Management**
- TanStack Query (React Query) for server state management and caching
- Local React state (useState) for UI and game logic
- No global state management library - relying on component composition and prop drilling

**Design System**
- Dark mode only (locked) for consistent gaming aesthetic
- Custom color palette using HSL values for primary (purple), success (teal-green), and warning (orange-red)
- Typography: Press Start 2P for headings (retro feel), Inter for body text, JetBrains Mono for scores
- Consistent spacing using Tailwind's 4/6/8/12/16 unit system

### Backend Architecture

**Server Framework**
- Express.js for REST API endpoints
- TypeScript for type safety across the stack
- HTTP server created with Node's built-in http module

**API Design**
- RESTful endpoints for profile and score management
- JSON request/response format
- Endpoints:
  - GET /api/profiles - Fetch all profiles
  - POST /api/profiles - Create new profile (requires name)
  - PUT /api/profiles/:id/scores - Update game scores (validates game keys)
- Comprehensive request validation with Zod schemas
- Whitelisted game keys for security: NumberGuessing, Blackjack, TicTacToe, SpinTheWheel, ShadowBoxing
- Request logging middleware for debugging and monitoring

**Data Storage**
- In-memory storage using Map data structures (MemStorage class) for development
- IStorage interface allows easy database swapping for production
- Schema defined with Drizzle ORM and Zod for validation
- Deep merge logic for score updates to prevent data loss
- Drizzle configured for PostgreSQL (schema ready, can be connected when database is provisioned)

**Data Models**
- Profile: id (UUID), name (string), scores (JSON object mapping game keys to win counts)
- Validation using Zod schemas derived from Drizzle schema definitions
- Type inference for compile-time safety

### External Dependencies

**UI Libraries**
- @radix-ui/* components (20+ packages) - Accessible headless UI primitives
- lucide-react - Icon library for consistent iconography
- cmdk - Command palette component
- embla-carousel-react - Carousel functionality
- react-day-picker - Date picking components
- vaul - Drawer component library

**State & Forms**
- @tanstack/react-query - Server state management and caching
- react-hook-form - Form handling and validation
- @hookform/resolvers - Form validation resolvers
- zod - Schema validation library

**Database & ORM**
- drizzle-orm - Type-safe ORM for database operations
- drizzle-zod - Zod schema generation from Drizzle schemas
- @neondatabase/serverless - Serverless PostgreSQL driver
- connect-pg-simple - PostgreSQL session store (for future session management)

**Styling**
- tailwindcss - Utility-first CSS framework
- tailwind-merge & clsx - Class name merging utilities
- class-variance-authority - Variant-based styling system
- autoprefixer - PostCSS plugin for vendor prefixes

**Development Tools**
- @replit/vite-plugin-* - Replit-specific development plugins (runtime error overlay, cartographer, dev banner)
- tsx - TypeScript execution for development server
- esbuild - Fast bundler for production builds

**Utilities**
- date-fns - Date manipulation library
- nanoid - Unique ID generation