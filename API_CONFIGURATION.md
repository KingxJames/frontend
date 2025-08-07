# API Configuration

This project uses environment variables to configure the API base URL. This allows for easy switching between different environments (development, staging, production).

## Environment Variable Setup

### 1. Create Environment File

Create a `.env` file in the root directory of the project with the following content:

```env
VITE_API_BASE_URL=https://api.ub.edu.bz/api/v1
```

### 2. Environment Variable Details

- **Variable Name**: `VITE_API_BASE_URL`
- **Default Value**: `https://api.ub.edu.bz/api/v1`
- **Description**: The base URL for all API endpoints

### 3. Usage in Code

The API configuration is centralized in `src/config/api.ts`:

```typescript
// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.ub.edu.bz/api/v1";

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};
```

### 4. How to Use

Instead of hardcoding API URLs, use the `buildApiUrl` function:

```typescript
// Before (hardcoded)
const response = await fetch(
  "https://api.ub.edu.bz/api/v1/UBForms/uploadPhoto",
  {
    // ... options
  }
);

// After (using environment variable)
import { buildApiUrl } from "../../config/api";

const response = await fetch(buildApiUrl("UBForms/uploadPhoto"), {
  // ... options
});
```

### 5. Environment-Specific Configuration

For different environments, you can create different `.env` files:

- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.local` - Local development (gitignored)

### 6. Vite Configuration

The environment variables are automatically loaded by Vite. Make sure your `vite.config.ts` is properly configured to handle environment variables.

## Benefits

1. **Environment Flexibility**: Easy switching between different API endpoints
2. **Security**: No hardcoded URLs in source code
3. **Maintainability**: Centralized configuration
4. **Deployment**: Different environments can use different API endpoints
