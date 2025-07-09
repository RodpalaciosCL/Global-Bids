# Global Bids - Heavy Machinery Auctions & Marketplace

## Overview

This is a modern, full-stack web application for a heavy machinery auction company called Global Bids. The platform serves as both an informational website and a marketplace for heavy machinery, equipment, and spare parts auctions. It combines a React-based frontend with an Express.js backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and effects
- **State Management**: React Context for global state, TanStack Query for server state

## Key Components

### Frontend Architecture
- **Component Structure**: Organized by feature (home, catalog, auctions, etc.)
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Internationalization**: Spanish/English language support with context-based translation system
- **Currency Support**: USD/CLP conversion system
- **Theme**: Dark/vibrant theme with customizable colors defined in theme.json

### Backend Architecture
- **API Structure**: RESTful endpoints with `/api` prefix
- **Database Layer**: Drizzle ORM with type-safe queries
- **Storage Interface**: Abstracted storage layer for flexibility
- **Email Integration**: Multiple email service options (SendGrid, Office 365)
- **Error Handling**: Centralized error handling middleware

### Database Schema
The application uses four main entities:
- **Users**: Admin authentication system
- **Machinery**: Equipment listings with detailed specifications
- **Contacts**: Contact form submissions
- **Registrations**: Auction registration data

Each table includes appropriate indexes and relationships for optimal performance.

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Database Operations**: Drizzle ORM executes type-safe database queries
4. **Response Handling**: Data flows back through the same path with proper error handling
5. **State Management**: Client updates local state and cache accordingly

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **ORM**: Drizzle with PostgreSQL dialect
- **Email Services**: SendGrid and Nodemailer for Office 365
- **UI Components**: Extensive Radix UI component library
- **Animations**: Framer Motion for smooth interactions
- **Forms**: React Hook Form with Zod validation
- **Routing**: Wouter for client-side routing

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across the stack
- **Styling**: Tailwind CSS with PostCSS
- **Code Quality**: ESLint and TypeScript compiler checks

## Deployment Strategy

The application is configured for deployment on platforms like Replit:

### Build Process
1. **Frontend Build**: Vite builds the React application to `dist/public`
2. **Backend Build**: esbuild bundles the Express server to `dist/index.js`
3. **Static Assets**: Frontend assets are served from the backend in production

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `EMAIL_PASS`: Office 365 app password for email service
- `SENDGRID_API_KEY`: SendGrid API key (optional alternative)
- `NODE_ENV`: Environment indicator

### Development vs Production
- **Development**: Uses Vite dev server with HMR
- **Production**: Serves built static files through Express
- **Database**: Uses Neon serverless PostgreSQL for scalability

The application includes proper error boundaries, loading states, and fallback mechanisms to ensure a smooth user experience across different deployment scenarios.

## Recent Changes (July 2025)

### Price Information Removal
- **Complete removal of all pricing information** from the marketplace interface as requested
- Eliminated price filters, sorting by price, and price displays in all catalog components
- Updated sorting to default to "Year: newest" instead of price-based sorting
- Removed price-related UI elements from both mobile and desktop catalog views

### Image Proxy Implementation
- **Added server-side image proxy** to resolve AWS S3 access restrictions from browser
- Implemented `/api/images/:lotId/:imageNum` endpoint for serving auction images
- Updated all frontend components to use the proxy URLs instead of direct S3 URLs
- Added proper error handling and caching for proxied images
- All 68+ auction lot images now display correctly through the proxy system

### Inventory Verification
- Verified authentic auction data with exact AWS S3 image counts for all lots
- Confirmed 628+ total images across the complete Prelco auction inventory
- Updated existing lots with correct image quantities based on actual S3 bucket content