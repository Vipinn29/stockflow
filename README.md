# StockFlow

<div align="center">

Modern inventory management for growing teams.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

StockFlow is a multi-organization inventory workspace where businesses can manage products, monitor stock levels, receive low-stock alerts, and configure inventory thresholds from one clean dashboard.

## Highlights

- Organization-aware authentication
- Secure signup and login with confirmation password validation
- Organization name shown across the workspace
- Real-time inventory dashboard
- Product search, create, edit, and delete workflows
- SKU management and stock quantities
- Configurable low-stock thresholds
- Product pricing and descriptions
- Responsive Next.js interface

## Application Preview

The landing page includes a modern inventory overview, stock movement preview, and quick access to account creation and login. Authenticated users can move between Overview, Products, and Settings from the responsive application shell.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Database | PostgreSQL |
| ORM | Prisma 6 |
| Authentication | JSON Web Tokens, HTTP-only cookies |
| Password Security | bcrypt |

## Core Features

### Dashboard

- Organization name
- Total product count
- Total stock quantity
- Low-stock product count
- Current low-stock inventory table

### Products

- Product name and SKU
- Optional description
- Available quantity
- Cost and selling prices
- Custom low-stock threshold
- Product-level create, update, and delete actions

### Settings

- Organization-wide default low-stock threshold
- Automatic fallback for products without a custom threshold

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/Vipinn29/stockflow.git
cd stockflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
JWT_SECRET="replace-with-a-long-random-secret"
```

Generate a strong JWT secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Prepare the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Commands

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Run the production build
npm run lint   # Run ESLint
```

## Project Structure

```text
app/
├── api/
│   ├── auth/        # Login, signup, and logout handlers
│   ├── dashboard/   # Dashboard metrics
│   ├── products/    # Product CRUD routes
│   └── settings/    # Inventory settings routes
├── dashboard/       # Dashboard page
├── login/           # Login page
├── products/        # Product management pages
├── settings/        # Settings page
└── signup/          # Account creation page
components/          # Shared application shell and UI components
lib/                 # Authentication and Prisma helpers
prisma/
└── schema.prisma    # Database schema
```

## Environment Security

Keep `.env` private and never commit database credentials or JWT secrets. If a secret has been exposed, rotate it immediately and update the deployed environment.

## Production Deployment

1. Create a PostgreSQL database.
2. Set `DATABASE_URL` and `JWT_SECRET` in the hosting platform.
3. Run database preparation with Prisma.
4. Deploy the Next.js application.

For Vercel deployments:

```bash
npx prisma generate
npx prisma db push
```

Then add the environment variables in the Vercel project settings.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run lint and a production build.
5. Open a pull request.

## License

This project is currently private and does not include a published license.

Made with love by Vipin Gupta