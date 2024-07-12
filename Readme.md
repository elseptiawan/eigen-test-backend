# Backend Test - Eigen

## Running on your local machine

### Prerequisite :

- Node JS version 20.10.0 or latest
- MySQL version 8.0.25 or latest

### Installation guide

#### 1. Clone This Repository

```bash
git clone {REPOSITORY_SOURCE}
# example using https
git clone https://github.com/elseptiawan/eigen-test-backend.git
```

#### 2. Install All Dependencies

```bash
npm install
```

#### 3. Environment Configuration

```bash
- Copy .env.example to .env
- Fill all configuration in .env file
```

### Database Migration

#### 1. Create New Database on MySQL

#### 2. Run Migration

```bash
npx sequelize db:migrate
```

#### 3. Run Seeder

```bash
npx sequelize db:seed:all
```

### Running Unit Test

```bash
npm run test
```

### Running Application

```bash
npm run start
```

### API Documentation

```bash
{host}/api-docs
# example
http://localhost:3000/api-docs
```