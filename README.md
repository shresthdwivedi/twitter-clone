# Twitter Clone

A Twitter clone built with NextJs Framework with type-safety of Typescript. This project is a full-stack application that replicates the core functionalities of Twitter.



## 🚀 Tech Used

| Technology      | Purpose |
|---------------|------------------------------------------------|
| ![Next.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg) | Full-stack React framework for SSR & API routes |
| ![TypeScript](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg) | Ensures type safety and better developer experience |
| ![Prisma](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg) | ORM for interacting with the database efficiently |
| ![Tailwind CSS](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg) | Utility-first CSS framework for styling |
| ![Vercel](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg) | Hosting and deployment platform for the app |

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

- User authentication and authorization
- Post and view tweets
- Follow and unfollow users
- Like tweets and reply to them
- Real-time notifications
- Responsive design using Tailwind CSS

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shresthdwivedi/twitter-clone.git
   cd twitter-clone
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
    DATABASE_URL=your_database_url
    NEXTAUTH_JWT_SECRET=your_nextauth_jwt_secret
    NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Build the project for production**

   ```bash
   pnpm build
   ```
6. **Run the production build**

   ```bash
   pnpm start
   ```

## Usage

1. **Open your browser and navigate to**

   ```
   http://localhost:3000
   ```

