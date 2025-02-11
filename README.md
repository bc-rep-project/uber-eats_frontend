# UberEats Clone Frontend

This is the frontend application for the UberEats clone project, built with React and TypeScript.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Material-UI (MUI)
- **Forms**: Formik + Yup
- **API Client**: Axios
- **Testing**: Jest + React Testing Library
- **Maps**: Google Maps API

## Prerequisites

- Node.js 16+
- npm or yarn
- Backend service running

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your configuration:
- API endpoint
- Google Maps API key
- Stripe publishable key
- Other service configurations

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
frontend/
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Reusable components
│   │   ├── common/     # Common UI components
│   │   ├── layout/     # Layout components
│   │   └── features/   # Feature-specific components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── store/         # Redux store configuration
│   │   └── slices/    # Redux slices
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── public/           # Public assets
└── tests/           # Test files
```

## Available Scripts

- Start development server:
```bash
npm run dev
```

- Build for production:
```bash
npm run build
```

- Run tests:
```bash
npm test
```

- Run tests with coverage:
```bash
npm test -- --coverage
```

- Lint code:
```bash
npm run lint
```

## Features

### Customer Features
- User authentication
- Restaurant browsing and search
- Menu viewing and ordering
- Cart management
- Order tracking
- Payment processing
- Order history
- Profile management

### Restaurant Features
- Dashboard overview
- Menu management
- Order management
- Inventory tracking
- Analytics and reporting
- Settings management
- Tax rules configuration
- Business hours management

## Component Documentation

Key components include:

### Authentication
- `LoginForm`: User login form
- `RegisterForm`: User registration form
- `PrivateRoute`: Route protection component

### Restaurant Management
- `MenuManagement`: Menu CRUD operations
- `OrderManagement`: Order processing interface
- `InventoryManagement`: Stock management
- `AnalyticsManagement`: Reports and analytics
- `SettingsManagement`: Restaurant settings

### Order Processing
- `Cart`: Shopping cart management
- `Checkout`: Order placement and payment
- `OrderTracking`: Real-time order status
- `PaymentForm`: Stripe payment integration

## State Management

The application uses Redux Toolkit for state management:

### Slices
- `auth`: Authentication state
- `cart`: Shopping cart state
- `order`: Order management
- `restaurant`: Restaurant data
- `ui`: UI state (modals, notifications)

### Middleware
- `api`: API request handling
- `websocket`: Real-time updates
- `persistence`: Local storage sync

## Testing

The project uses Jest and React Testing Library for testing:

- Unit tests for components
- Integration tests for features
- E2E tests for critical flows

Run specific test suites:
```bash
npm test -- components
npm test -- integration
npm test -- e2e
```

## Development Guidelines

1. **Code Style**
   - Follow Airbnb style guide
   - Use TypeScript strictly
   - Document components with JSDoc
   - Use meaningful component names

2. **Component Structure**
   - Keep components focused and small
   - Use composition over inheritance
   - Implement proper prop validation
   - Handle loading and error states

3. **State Management**
   - Use local state for UI-only state
   - Use Redux for shared state
   - Implement proper error handling
   - Handle loading states consistently

4. **Testing**
   - Write tests for new components
   - Test edge cases
   - Mock external dependencies
   - Use meaningful test descriptions

## Deployment

The frontend is deployed on Vercel:

1. **Staging Environment**
   - Automatic deployment on merge to `develop`
   - Environment: `staging`
   - URL: `https://staging.example.com`

2. **Production Environment**
   - Manual deployment from `main`
   - Environment: `production`
   - URL: `https://example.com`

## Performance Optimization

- Implement code splitting
- Use lazy loading for routes
- Optimize images and assets
- Implement caching strategies
- Use memoization where appropriate

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 