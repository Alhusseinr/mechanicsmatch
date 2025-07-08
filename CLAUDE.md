# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture Overview

This is a **Next.js 15 App Router** application for MechanicsMatch.com - a platform connecting customers with auto repair shops. The application uses:

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL) for data storage and authentication
- **Styling**: Tailwind CSS 4
- **Authentication**: Supabase Auth with custom middleware
- **TypeScript**: Strict mode enabled

### Key Architecture Patterns

**Dual User System**: The application serves two distinct user types:
- **Customers**: Book appointments, manage vehicles, find shops
- **Mechanics/Shops**: Manage bookings, services, shop profile

**Route-based Authentication**: Middleware (`middleware.ts`) handles authentication routing:
- Protected routes: `/shop/dashboard`, `/shop/profile`, `/customer/dashboard`, `/customer/profile`, `/booking`
- Public auth routes: `/login`, `/register`
- Redirects based on user type after authentication

**Database Architecture**: Comprehensive type system defined in `src/lib/types.ts` covering:
- User management (customers/mechanics)
- Shop and service management
- Vehicle tracking
- Booking system
- Reviews and ratings

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── _components/        # Landing page components
│   ├── api/               # API routes (booking, quotes, shops)
│   ├── auth/              # Authentication flows
│   ├── booking/           # Booking system
│   ├── customer/          # Customer dashboard & profile
│   ├── shop/              # Shop/mechanic dashboard & profile
│   └── search/            # Shop search functionality
├── components/            # Reusable UI components
│   ├── auth/              # Authentication components
│   ├── layouts/           # Layout components
│   └── ui/                # UI primitives
├── contexts/              # React contexts (AuthContext)
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities and configurations
    ├── supabase.ts        # Supabase client configuration
    ├── types.ts           # TypeScript type definitions
    └── database.types.ts  # Database-generated types
```

### Authentication Flow

1. **AuthContext** (`src/contexts/AuthContext.tsx`) manages global auth state
2. **Middleware** (`middleware.ts`) handles route protection and redirects
3. **Supabase client** (`src/lib/supabase.ts`) provides authenticated database access
4. **ProtectedRoute** component ensures proper access control

### Database Integration

- Uses Supabase for authentication and data storage
- Custom types in `src/lib/types.ts` mirror database schema
- Comprehensive type definitions for all entities (User, Shop, Vehicle, Booking, etc.)
- Database helpers in `src/lib/databaseHelpers.ts` for common operations

### Recent Development Areas

Based on git status, active development includes:
- Search functionality (`src/app/search/`, `src/hooks/useSearch.ts`, `src/lib/searchService.ts`)
- Database operations (`src/lib/databaseHelpers.ts`)
- Shop data management (`src/lib/shopDataSeeder.ts`)
- UI improvements (Hero, Dashboard, Search components)

### TypeScript Configuration

- Path aliases: `@/*` maps to `./src/*`
- Strict mode enabled
- Next.js plugin integration
- Target ES2017 for broad compatibility