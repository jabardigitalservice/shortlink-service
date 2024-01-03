# Short Link Service

This repository houses the Short Link Service, a tool for creating and managing short links (URLs). Whether you need concise URLs for marketing campaigns or improved user experience, this service simplifies the process of generating and handling short links.

## Features:
- Short Link Generation:
  - Create short links for long URLs effortlessly.
- Customization:
  - Optionally customize short link aliases for branding or meaningful links.
- Analytics:
  - Track and analyze short link usage with built-in analytics.
- Expiration:
  - Set expiration dates for short links to control their validity.

## API Endpoints:
- Create Short Link:
  - POST /shorten
  - Payload: { "url": "your-long-url", "short_link": "custom-short-link" (OPTIONAL), "expired": "your-set-expired" }
- Redirect by Short link:
  - GET /:shortCode

## Tech Stack

- Node.js v14
- Mongoose (MongoDB ODM)
- Sequelize (SQL ORM)
- TypeScript
- Docker
- Express (HTTP framework)

## Design Pattern: Clean Architecture

The project follows the principles of Clean Architecture, emphasizing separation of concerns into distinct layers:

- **Entities**: Representing the core business entities.
- **Use Cases**: Defining application-specific business rules.
- **Interface Adapters**: Implementing details for external frameworks and tools.
- **Frameworks & Drivers**: Implementing details for external frameworks and tools (Express, databases, etc.).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jabardigitalservice/shortlink-service.git
   ```

2. Navigate to the project directory:

   ```bash
   cd shortlink-service
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy the appropriate environment file:
   - For SQL (choose MySQL, PostgreSQL, or SQLite), use `.env.example.sql`:

     ```bash
     cp .env.example.sql .env
     ```

   Customize the `.env` file according to your configuration.

## Usage

### Development

```bash
npm run start:dev
```

### Build

```bash
npm run build
```

### Start

```bash
npm start
```

### Docker

Build Docker image:

```bash
docker -f docker/Dockerfile build -t your-image-name .
```

Run Docker container:

```bash
docker run -p 3000:3000 -d your-image-name
```

## Additional Scripts

- **Linting:**
  - Check code formatting:
    ```bash
    npm run lint
    ```
  - Fix code formatting:
    ```bash
    npm run lint:fix
    ```

- **Database Migration:**
  - Run migrations:
    ```bash
    npm run migrate:up
    ```
  - Rollback migrations:
    ```bash
    npm run migrate:down
    ```

- **Local Database Migration (development):**
  - Generate migration file:
    ```bash
    npm run migration:generate --name=your-migration-name
    ```
  - Run migrations:
    ```bash
    npm run migrate:up:local
    ```
  - Rollback migrations:
    ```bash
    npm run migrate:down:local
    ```

- **Seed:**
  - Run Seed:
    ```bash
    npm run seed:run --name=your-seed-filename
    ```


- **Cron:**
  - Run Cron:
    ```bash
    npm run seed:run --name=your-cron-filename
    ```

- **Testing:**
  - Run tests:
    ```bash
    npm test
    ```

## Folder Structure Modules

```bash
modules/
└── name module/
    ├── delivery/
    │   ├── http/
    │   │   └── handler.ts
    │   ├── grpc/
    │   │   └── handler.ts
    │   └── graphQL/
    │       └── handler.ts
    ├── entity/
    │   ├── interface.ts // for the core business entities
    │   └── schema.ts // for the schema validation
    ├── repository/
    │   ├── mongo/
    │   │   └── repository.ts
    │   ├── mySQL/
    │   │   └── repository.ts
    │   └── postgreSQL/
    │       └── repository.ts
    ├── usecase/
    │   └── usecase.ts
    └── name module.ts // for init the module to load in the main
```

## Contributing:

We welcome contributions! Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License:

This project is licensed under the MIT License - see the LICENSE file for details.
Support:

## For support or issues, please open an issue.

Feel free to customize this README to reflect your specific Short Link Service implementation.