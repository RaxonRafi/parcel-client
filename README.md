## Parcel Delivery System

A React + TypeScript frontend for a parcel management platform. It supports user authentication and role-based workflows for admins, senders, and receivers, including creating parcels, tracking status, viewing delivery history, and managing users.

### Live URL

`https://urboxmate.vercel.app/`

### Technology Stack

- **Frontend**
  - Framework: React 19, TypeScript
  - Build Tool: Vite 7
  - State Management: Redux Toolkit, React Redux
  - Routing: React Router v7
  - HTTP: Axios
  - UI: Tailwind CSS v4, Radix UI, Lucide Icons
  - Forms & Validation: React Hook Form, Zod
  - Theming & UX: next-themes, Sonner
- **Backend**
  - Language/Runtime: TypeScript (Node.js)
  - Framework: Express.js
  - Database: MongoDB

### Project Overview

- **Authentication**: Login and registration flows
- **Parcels**: Create, list, track, and update parcel statuses
- **Roles**: Admin dashboards and user management; sender and receiver views
- **Reusable UI**: Modular components and layouts under `src/components`

### Getting Started

1. Clone and install

```bash
git clone https://github.com/RaxonRafi/parcel-client.git
cd parcel-client
npm install
```

2. Configure environment variables

Create a `.env` file in the project root:

```bash
VITE_BASE_URL=<your_api_base_url>
```

3. Run the app

```bash
npm run dev
```

4. Build and preview production

```bash
npm run build
npm run preview
```

### Available Scripts

- **dev**: Start Vite dev server
- **build**: Type-check and build for production
- **preview**: Preview the production build
- **lint**: Run ESLint

### Environment Variables

- **VITE_BASE_URL**: Base URL for the backend API. Used in `src/config/index.ts`.

### Notes

- This project uses ESM and TypeScript project references via `tsconfig.*.json`.
- Ensure the API defined by `VITE_BASE_URL` is reachable during development and preview.
- UI components are organized under `src/components/ui` and higher-level modules under `src/components/modules`.
