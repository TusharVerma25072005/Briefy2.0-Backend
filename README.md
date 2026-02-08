# Briefy Backend

A scalable email summarization service that securely processes user emails through OAuth authentication and provides intelligent summaries using AI.

## 🏗️ Architecture Overview

Briefy backend uses a multi-database architecture optimized for different data types and scaling requirements:

- **PostgreSQL**: Stores user credentials, OAuth refresh tokens, and relational data
- **MongoDB**: Stores email data and summaries (document-based storage for flexible email content)
- **Redis**: Manages job queues for horizontal scaling and distributed processing

## ✨ Features

- **OAuth 2.0 Authentication**: Secure user authentication with refresh token management
- **Email Permission Management**: Users grant read access to their emails
- **Masked Email Processing**: Receives masked/anonymized emails from client applications
- **AI-Powered Summarization**: Generates concise summaries of email content
- **Horizontal Scaling**: Redis queue-based architecture for processing emails at scale
- **Secure Credential Storage**: Encrypted storage of user credentials and tokens

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Databases**:
  - PostgreSQL (via Prisma ORM)
  - MongoDB (for document storage)
  - Redis (for queue management)
- **Authentication**: OAuth 2.0 with refresh tokens
- **ORM**: Prisma

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- MongoDB 6+
- Redis 7+
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd briefy-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database URLs
DATABASE_URL="postgresql://user:password@localhost:5432/briefy"
MONGODB_URI="mongodb://localhost:27017/briefy"
REDIS_URL="redis://localhost:6379"

# OAuth Configuration
OAUTH_CLIENT_ID="your-oauth-client-id"
OAUTH_CLIENT_SECRET="your-oauth-client-secret"
OAUTH_REDIRECT_URI="http://localhost:3000/api/auth/callback"

# Email Service Configuration
EMAIL_PROVIDER="gmail" # or other provider
EMAIL_SCOPES="https://www.googleapis.com/auth/gmail.readonly"

# Security
JWT_SECRET="your-jwt-secret"
ENCRYPTION_KEY="your-encryption-key-32-chars"

# App Configuration
PORT=3000
NODE_ENV="development"
```

### 4. Database Setup

#### PostgreSQL (Prisma)

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

#### MongoDB

MongoDB will auto-create collections on first use. Optionally, create indexes:

```javascript
// In MongoDB shell or compass
use briefy
db.emails.createIndex({ userId: 1, receivedAt: -1 })
db.emails.createIndex({ processed: 1 })
```

#### Redis

Ensure Redis server is running:

```bash
redis-server
```

### 5. Run the Application

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📊 Database Schemas

### PostgreSQL (User Management)

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String?
  provider      String    // e.g., "google", "microsoft"
  providerId    String    @unique
  refreshToken  String    @db.Text // Encrypted
  accessToken   String?   @db.Text // Encrypted
  tokenExpiry   DateTime?
  permissions   Json      // Granted scopes
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### MongoDB (Email Storage)

```typescript
interface EmailDocument {
  _id: ObjectId;
  userId: string;
  emailId: string;
  subject: string;
  sender: string;
  recipients: string[];
  body: string;
  summary?: string;
  
  // Metadata
  receivedAt: Date;
  processedAt?: Date;
  processed: boolean;
  
  // Email content
  attachments?: Array<{
    filename: string;
    mimeType: string;
    size: number;
  }>;
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Redis (Queue Jobs)

```typescript
interface EmailSummarizationJob {
  jobId: string;
  userId: string;
  emailId: string;
  priority: number;
  attempts: number;
  createdAt: string;
}
```

## 🔌 API Endpoints

### Authentication

#### `POST /api/auth/login`
Initiate OAuth flow

#### `GET /api/auth/callback`
OAuth callback handler

#### `POST /api/auth/refresh`
Refresh access token

#### `POST /api/auth/logout`
Revoke tokens and logout

### Users

#### `GET /api/users/me`
Get current user profile

#### `PUT /api/users/permissions`
Update email read permissions

### Emails

#### `POST /api/emails/ingest`
Receive masked emails from client app

```json
{
  "emails": [
    {
      "emailId": "unique-id",
      "subject": "Meeting Tomorrow",
      "sender": "***@example.com",
      "body": "masked-content",
      "receivedAt": "2026-02-09T10:00:00Z"
    }
  ]
}
```

#### `GET /api/emails`
Get user's email summaries

#### `GET /api/emails/:emailId`
Get specific email summary

#### `POST /api/emails/:emailId/summarize`
Trigger manual summarization

### Health & Status

#### `GET /api/health`
Check service health

#### `GET /api/queue/stats`
Get queue statistics

## 🔄 Horizontal Scaling with Redis Queue

### Queue Architecture

```
Client App → API Server → Redis Queue → Worker Instances
                                            ↓
                                        MongoDB + PostgreSQL
```

### Queue Implementation

Email summarization jobs are added to Redis queue for processing:

1. **Job Creation**: When emails are ingested, jobs are added to queue
2. **Worker Processing**: Multiple worker instances consume jobs from queue
3. **Retry Logic**: Failed jobs are retried with exponential backoff
4. **Priority Queue**: Urgent emails get higher priority

### Running Workers

```bash
# Start worker instance
npm run worker

# Start multiple workers
npm run worker -- --instances 4
```

### Queue Configuration

```typescript
// Queue priorities
enum Priority {
  HIGH = 1,
  NORMAL = 5,
  LOW = 10
}

// Worker configuration
const workerConfig = {
  concurrency: 5,
  maxRetries: 3,
  retryDelay: 1000, // ms
  timeout: 30000 // 30 seconds
}
```

## 🔐 Security Considerations

1. **Token Encryption**: All refresh tokens are encrypted at rest
2. **HTTPS Only**: Production environment requires HTTPS
3. **Rate Limiting**: API endpoints are rate-limited
4. **Input Validation**: All inputs are validated and sanitized
5. **CORS Configuration**: Restricted to allowed origins
6. **Token Rotation**: Refresh tokens are rotated periodically

## 📈 Monitoring & Logging

- **Application Logs**: Winston for structured logging
- **Database Monitoring**: Monitor PostgreSQL and MongoDB performance
- **Queue Monitoring**: Redis queue metrics and job statistics
- **Error Tracking**: Sentry or similar for error tracking
- **Health Checks**: `/api/health` endpoint for monitoring services

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage
```

## 📦 Deployment

### Docker Deployment

```bash
# Build image
docker build -t briefy-backend .

# Run containers
docker-compose up -d
```

### Environment Variables for Production

Ensure all sensitive variables are set in production:
- Strong JWT secret
- Encrypted database credentials
- Valid OAuth credentials
- Redis connection string
- MongoDB connection string with authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for secure and efficient email summarization**