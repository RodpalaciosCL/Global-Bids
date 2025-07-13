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

### Database Connection Stability Fix (July 13, 2025)
- **Fixed server startup failures** caused by PostgreSQL WebSocket connection issues
- **Enhanced database configuration** with improved connection pooling and error handling
- **Added connection stability features** including secure WebSocket usage and fetch-based queries
- **Implemented graceful error handling** with connection testing on startup
- **Added database monitoring** with connection event logging for better diagnostics
- **Server now starts successfully** with robust database connection management

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

### Complete North Country Integration (July 2025)
- **Imported 146 authentic lots** directly from North Country Auctions API endpoint
- **Four-page distribution**: Page 1 (40 lots), Page 2 (38 lots), Page 3 (40 lots), Page 4 (28 lots)  
- **Authentic equipment data** with real names, specifications, and technical descriptions
- **Real location data**: All equipment located in Colina, Chile with authentic addresses
- **Verified brands**: Kubota engines, Briggs & Stratton, Rato, and other authentic manufacturers
- **AWS S3 image integration** with working proxy system for all auction images
- **API endpoint used**: `getWebcastItems?auction_id=2187&page={1-4}` from northcountry.auctiontechs.com

### Navigation and Scroll Fixes (July 9, 2025)
- **Resolved marketplace visibility issue** by removing problematic Framer Motion isInView dependencies
- **Fixed scroll offset positioning** with dynamic header height calculation (headerHeight - 10px offset)
- **Implemented CSS custom property** --header-height for consistent scroll-padding-top across all sections
- **Updated section padding** to 0.5rem for optimal visual positioning
- **Marketplace now displays immediately** without requiring scroll trigger or viewport detection
- **All 146 authentic auction lots visible** in marketplace with proper filtering and pagination
- **Fixed navigation 404 error** by correcting detail page links from `/marketplace` to `/#marketplace`

### Data Extraction and Display Enhancement (July 9, 2025)
- **Implemented intelligent data extraction** from authentic North Country Auctions descriptions
- **Real specification parsing** for Brand, Model, Year, Kilometers, and Hours from equipment descriptions
- **Updated all card components** (MachineryCardCompact, MachineryCard) to display extracted real data
- **Enhanced detail page specifications** to show authentic information instead of placeholder data
- **Conditional display logic** - only shows kilometers/hours when actually available in descriptions
- **Applied across all 146 lots** ensuring Peugeot and all vehicles show correct kilometers (87,220 km) instead of "0 hrs"
- **Consistent data display** across marketplace, detail pages, and all card views
- **Simplified format to "Marca: Kms: Horas:"** with N/A for missing values
- **Added intelligent equipment classification** to correctly categorize excavators, trucks, generators based on name/description
- **Connected International Auctions button** to authentic North Country Auctions URL (https://northcountry.auctiontechs.com/auction-detail/174912699568418f53a4cac)

### Complete Filter System Overhaul (July 13, 2025)
- **Complete database reclassification** of all 145 equipment items with accurate types based on visual verification
- **21 distinct equipment categories** now properly mapped: excavator (34), loader (20), dump-truck (15), dozer (12), grader (9), parts (7), truck (7), machinery (6), telehandler (5), bus (5), roller (5), golf-cart (4), trailer (3), vehicle (3), dumper (2), compressor (2), drill (2), mixer (1), tractor (1), skidsteer (1), crane (1)
- **Direct type mapping system** eliminates complex keyword searches - each Spanish filter value maps directly to exact database type
- **Fully functional filtering** - all 21 categories now return correct results when selected
- **Updated filter counts** reflect actual equipment inventory with precise numbers
- **Simplified filter logic** - removed complex keyword mapping in favor of direct database type matching
- **Verified against visual assets** - classifications match actual equipment images provided by user
- **Comprehensive coverage** - every equipment type from mini excavators to specialized parts properly categorized
- **Complete bilingual translation system** - all equipment types display correctly in Spanish ("Excavadora", "Carrito Golf", "Repuestos") when site is in Spanish, and in English ("Excavator", "Golf Cart", "Parts") when site is in English
- **All components updated** - MachineryCard, MachineryCardCompact, MachineryDetail all use updated getTypeLabel functions with complete type mappings
- **Case-insensitive search fixed** - PostgreSQL ILIKE implementation now correctly finds brands like "peugeot" (1), "komatsu" (14), "kubota" (4)
- **Automatic condition classification** - 23 items marked as "nuevo" (with "sin usar", "nuevo", "unused", "new" in titles), 122 as "usado"
- **Simplified condition system** - Only "Nuevo" and "Usado" options in condition filters, replacing previous complex system
- **Tested and verified** - all filters working correctly with proper counts and multilingual display