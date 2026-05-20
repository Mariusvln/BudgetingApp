# Personal Budget Analysis Application

Personal Budget Analysis Application is a full-stack system for managing personal finances. It lets users record income and expenses, organize transactions by categories, monitor current balances, analyze monthly financial data with charts, set category budget limits, and export financial records.

The project is implemented with a Java Spring Boot backend, a React frontend, JWT cookie authentication, and a relational database.

## Project Structure

```text
BudgetingApp/
  backend-java/       Spring Boot REST API, security, persistence, exports
  react-frontend/     React/Vite user interface
  README.md           Installation and usage documentation
```

## Main Features

- User registration, login, logout, and protected sessions with an HTTP-only JWT cookie.
- Two roles: regular user and administrator.
- Administrator panel for managing users and transaction categories.
- User activity log with search by user, email, action, or id.
- Income management: create, edit, delete, list, and filter by date range.
- Expense management: create, edit, delete, list, search, and filter by date range.
- Dashboard and analytics pages for income, expenses, balance, monthly summaries, and category-based charts.
- Monthly budget limits for selected categories with graphical progress indicators.
- CSV and Excel export for incomes and expenses.
- Profile management, preferred currency selection, theme selection, and account deletion.

## Requirement Coverage

| Requirement | Status | Implementation notes |
| --- | --- | --- |
| FR0: Administrator manages users and expense categories | Implemented | Admin users are handled by `/api/admin/users`; categories are handled by `/api/categories`; admin UI is available at `/admin`. |
| FR0: Administrator views event log | Partially implemented | Activity log exists at `/api/activity` and in the admin UI. It records registration, login, logout, profile changes, admin-created users, and account deletion. It does not currently log every income/expense/category change. |
| FR1: User registration, login, logout | Implemented | `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, and `/api/auth/me`. |
| FR2: User manages income | Implemented | `/api/app/incomes/` supports create, update, delete, list, date filtering, and export. |
| FR3: User manages expenses | Implemented | `/api/app/expenses/` supports create, update, delete, list, search, date filtering, and export. |
| FR4: Income and expense summaries with charts | Implemented | Dashboard and Analytics pages aggregate current and monthly income/expense data. |
| FR5: Expense summary by category and dates | Implemented | Expense pages and analytics support category/date-based analysis and searching. |
| FR6: Category budget limits and graphical progress | Implemented | `/api/app/budget/` and the Budgeting page support monthly limits per category. |
| FR7: Export expenses as CSV | Implemented | Expenses can be exported as CSV from the profile page and `/api/app/expenses/export?type=csv`. |
| NFR1: Java 8+ and Spring 5+ | Implemented with newer versions | Backend uses Java 21 and Spring Boot 4.0.0. |
| NFR2: React frontend | Implemented with newer version | Frontend uses React 19 instead of the originally specified React 17. |
| NFR3: Relational database | Implemented | Development uses file-based H2; production profile is configured for MySQL. |
| NFR4: All actions logged | Partially implemented | User/admin account actions are logged. Financial transaction actions are not logged yet. |
| NFR5: Installation and usage documentation | Implemented | This README contains setup, run, and usage instructions. |
| NFR6: Responses under 2 seconds for up to 1000 expenses | Not automatically verified | The implementation uses simple database queries and in-memory filtering; no performance test is included. |

## Technology Stack

Backend:

- Java 21
- Spring Boot 4.0.0
- Spring Security
- Spring Data JPA / Hibernate
- H2 database for development
- MySQL profile for production
- Maven
- Apache POI for Excel exports

Frontend:

- React 19
- Vite
- React Router
- Tailwind CSS
- DaisyUI / FlyonUI
- ApexCharts and Chart.js
- Axios and Fetch API

## Prerequisites

Install the following tools before running the project:

- JDK 21 or newer
- Maven
- Node.js and npm
- Optional for production: MySQL server

## Backend Setup

Open a terminal in the backend folder:

```bash
cd backend-java
mvn spring-boot:run
```

The backend starts on:

```text
http://localhost:8080
```

The default development database is stored in:

```text
backend-java/data/jwtapp-db
```

The H2 console is enabled in the development profile:

```text
http://localhost:8080/h2-console
```

Use these H2 settings:

```text
JDBC URL: jdbc:h2:file:./data/jwtapp-db
User: sa
Password: empty
```

## Frontend Setup

Open a second terminal in the frontend folder:

```bash
cd react-frontend
npm install
npm run dev
```

The frontend starts on:

```text
http://localhost:5173
```

The frontend currently calls the backend directly at `http://localhost:8080`, so both servers must be running for the application to work.

## Default Administrator

On backend startup, the application creates or restores the default administrator:

```text
Email: admin@gmail.com
Password: admin
```

After logging in as the administrator, open:

```text
http://localhost:5173/admin
```

For a real deployment, change the default admin password immediately.

## Production Configuration

The application supports a production profile with MySQL. Set these environment variables before starting the backend:

```text
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/budgeting_app
SPRING_DATASOURCE_USERNAME=your_mysql_user
SPRING_DATASOURCE_PASSWORD=your_mysql_password
APP_JWT_SECRET=replace_with_a_long_secret_key
```

The production profile uses:

```text
spring.jpa.hibernate.ddl-auto=validate
```

This means the database schema must already exist before starting the application in production mode.

## User Guide

### Registration and Login

1. Open `http://localhost:5173`.
2. Create a new account from the sign-up page.
3. Log in with email and password.
4. After login, the application opens protected user pages such as Dashboard, Analytics, Incomes, Expenses, Budgeting, and Profile.

### Managing Income

1. Open the Incomes page.
2. Add a new income record with amount, date, description, and category.
3. Use the income table to review recent records.
4. Edit or delete existing records when needed.
5. Use date filters to view income for a selected period.

### Managing Expenses

1. Open the Expenses page.
2. Add a new expense with amount, date, description, and category.
3. Review the expense list.
4. Edit or delete existing expenses.
5. Use date range filtering and search to analyze specific expenses.

### Dashboard and Analytics

The Dashboard and Analytics pages show:

- Total income.
- Total expenses.
- Remaining balance.
- Monthly income and expense summaries.
- Category-based visual analysis.
- Recent combined transactions.

### Budget Limits

1. Open the Budgeting page.
2. Select a category.
3. Set or update a monthly limit.
4. Track spending progress visually against the selected category limit.
5. Delete a limit if it is no longer needed.

### Exporting Data

Open the Profile page and use the export controls to download:

- Incomes CSV.
- Incomes Excel.
- Expenses CSV.
- Expenses Excel.

The backend export endpoints are:

```text
GET /api/app/incomes/exportIncomes?type=csv
GET /api/app/incomes/exportIncomes?type=excel
GET /api/app/expenses/export?type=csv
GET /api/app/expenses/export?type=excel
```

### Profile Settings

The Profile page allows a user to:

- Update name, email, location, and preferred currency.
- Change visual theme.
- Export data.
- Delete their own account after password confirmation.

## Administrator Guide

The administrator can open the Admin page after logging in with an administrator account.

Administrator functions:

- View all users.
- Create users and assign roles.
- Edit user information and roles.
- Delete users.
- Create, edit, and delete categories.
- View and search the activity log.

Category records contain:

- Name.
- Type, such as income or expense category type.

## API Summary

Authentication:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user. |
| POST | `/api/auth/login` | Log in and receive an HTTP-only JWT cookie. |
| POST | `/api/auth/logout` | Clear the JWT cookie and log out. |
| GET | `/api/auth/me` | Return the current authenticated user. |

Users and admin:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| PUT | `/api/users/me` | Update current user profile. |
| DELETE | `/api/users/me` | Delete current user account. |
| GET | `/api/admin/users` | List all users as administrator. |
| POST | `/api/admin/users` | Create a user as administrator. |
| PUT | `/api/admin/users/{id}` | Update a user as administrator. |
| DELETE | `/api/admin/users/{id}` | Delete a user as administrator. |

Categories:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/categories` | List categories. |
| POST | `/api/categories` | Create a category. |
| PUT | `/api/categories/{id}` | Update a category. |
| DELETE | `/api/categories/{id}` | Delete a category. |

Income, expenses, and budget:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/app/incomes/` | List current user's incomes. |
| POST | `/api/app/incomes/` | Create an income. |
| PUT | `/api/app/incomes/` | Update an income. |
| DELETE | `/api/app/incomes/?incomeId={id}` | Delete an income. |
| GET | `/api/app/expenses/` | List current user's expenses. |
| POST | `/api/app/expenses/` | Create an expense. |
| PUT | `/api/app/expenses/` | Update an expense. |
| DELETE | `/api/app/expenses/?expenseId={id}` | Delete an expense. |
| GET | `/api/app/expenses/searchExpenses?title={text}` | Search expenses by title. |
| GET | `/api/app/expenses/transactions-overview` | List combined income and expense transactions. |
| GET | `/api/app/budget/` | List current user's category limits. |
| POST | `/api/app/budget/` | Create a category limit. |
| PUT | `/api/app/budget/{id}` | Update a category limit. |
| DELETE | `/api/app/budget/{id}` | Delete a category limit. |

Activity log:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/activity` | List activity records. |
| GET | `/api/activity/search?query={text}` | Search activity records. |

## Data Validation and Security

- Passwords are stored using BCrypt.
- Authentication uses JWT tokens stored in an HTTP-only cookie named `access_token`.
- User financial endpoints require authentication.
- Admin endpoints require the `ROLE_ADMIN` role.
- Income and expense updates/deletes verify ownership before modifying data.
- Amount values must be at least `0.01` and must not exceed `4,000,000,000`.
- Invalid date ranges are rejected by backend services.

## Known Limitations

- The frontend is implemented with React 19, while the original assignment mentions React 17.
- Category and activity endpoints are currently permitted in the security configuration, even though they are mainly used by admin screens.
- Activity logging does not yet cover every system action, especially income, expense, and category CRUD operations.
- Some filtering and aggregation is performed in application memory, which is acceptable for small datasets but should be optimized for larger production datasets.
- There are no automated performance tests proving the 2-second response requirement for 1000 expense records.

## Suggested Final Improvements

- Restrict category and activity endpoints to administrator access where appropriate.
- Add activity logging for income, expense, category, and budget limit operations.
- Add backend and frontend automated tests.
- Move frontend API base URL to an environment variable.
- Add production database migration scripts.
