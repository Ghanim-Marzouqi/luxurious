# The LUXURIOUS - Dress Rental Management System

A modern, responsive web application for managing a luxury dress rental business. Built with SvelteKit and shadcn-svelte UI components.

## Features

- **Authentication**: Secure user authentication with JWT
- **User Roles**: Admin and Staff roles with appropriate permissions
- **Dashboard**: Overview of key metrics and recent activities
- **Customers Management**: Manage customer information and booking history
- **Bookings Management**: Create and manage dress bookings
- **Dress Inventory**: Manage dress inventory with details and availability
- **Settings**: Configure business information and system settings
- **Internationalization**: Support for English and Arabic languages
- **RTL Support**: Right-to-left layout for Arabic language
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Frontend Framework**: SvelteKit
- **UI Components**: shadcn-svelte
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Internationalization**: Custom i18n implementation
- **State Management**: Svelte stores

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/luxurious.git
cd luxurious
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Start the development server
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

- **Admin**: admin@luxurious.com / password
- **Staff**: staff@luxurious.com / password

## Project Structure

- `src/lib/components`: UI components
- `src/lib/stores`: State management
- `src/lib/services`: API services
- `src/lib/types`: TypeScript types
- `src/lib/utils`: Utility functions
- `src/lib/i18n`: Internationalization
- `src/routes`: SvelteKit routes

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [SvelteKit](https://kit.svelte.dev/)
- [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
