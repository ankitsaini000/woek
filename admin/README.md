# Tour Travel Admin Dashboard

A modern admin dashboard built with Next.js 15 and Tailwind CSS for managing tour travel operations.

## Features

- **Dashboard Overview**: Statistics and recent bookings overview
- **User Management**: Manage customers and admin users
- **Destination Management**: Add and manage travel destinations
- **Tour Management**: Create and manage tour packages
- **Booking Management**: Handle customer bookings and reservations
- **Settings**: Configure system settings and user preferences

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Language**: TypeScript
- **State Management**: React Hooks

## Getting Started

1. **Install Dependencies**
   ```bash
   cd admin
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
admin/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard home page
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── layout/            # Layout components (Sidebar, Header)
│   ├── users/             # User management
│   ├── destinations/      # Destination management
│   ├── tours/             # Tour management
│   ├── bookings/          # Booking management
│   └── settings/          # Settings page
├── package.json           # Dependencies and scripts
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design System

The admin dashboard uses a consistent design system with:

- **Color Palette**: Blue primary colors with gray neutrals
- **Typography**: System font stack for optimal performance
- **Spacing**: Consistent spacing scale using Tailwind utilities
- **Components**: Reusable components with consistent styling
- **Responsive**: Mobile-first responsive design

## Customization

The dashboard is built with modularity in mind:

- **Components**: Each page has its own component for easy maintenance
- **Styling**: Uses Tailwind CSS for consistent styling
- **Layout**: Responsive sidebar layout that works on all devices
- **Navigation**: Easy navigation between different admin sections

## Deployment

The admin dashboard can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Self-hosted**

Build the project and deploy the output to your preferred platform.
