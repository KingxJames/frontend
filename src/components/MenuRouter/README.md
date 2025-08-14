# MenuRouter Component

The `MenuRouter` component is responsible for checking user menus and routing to the first available menu component. It ensures that routing only happens to components that exist in the user's menu.

## Features

- **Menu Validation**: Checks if the current route is accessible to the user based on their assigned menus
- **Automatic Routing**: Routes to the first available menu when accessing the root path or dashboard
- **Access Control**: Redirects users away from routes they don't have access to
- **Fallback Handling**: Provides fallback routing to Dashboard when no valid menus are found

## How it Works

1. **Menu State Monitoring**: The component monitors the Redux menu state to get the user's available menus
2. **Route Validation**: It checks if the current route is accessible to the user by comparing it with their assigned menus
3. **Automatic Routing**: When a user accesses the root path (`/`) or dashboard (`/Dashboard`), it automatically routes to the first available menu
4. **Access Control**: If a user tries to access a route they don't have permission for, they are redirected to their first available menu

## Available Routes

The component recognizes the following routes as valid menu destinations:

- `/Dashboard` - The dashboard page
- `/Messages` - The Whatsapp Web page
- `/Forms` - The forms page
- `/Reports` - The reports page
- `/Settings` - The settings page

## Usage

The component is automatically integrated into the main App component and wraps all routes:

```tsx
<MenuRouter>
  <Routes>{/* All your routes */}</Routes>
</MenuRouter>
```

## Menu Structure

The component expects menu items to have the following structure:

```typescript
interface IMenu {
  id: string;
  name: string;
  path: string;
  icon: string;
  order: number;
  is_active: boolean;
}
```

## Behavior

- **Public Routes**: Routes like `/login` and `/404` are always accessible to all users
- **Protected Routes**: All other routes require the user to have the corresponding menu item
- **Menu Priority**: Routes are selected based on the menu order, with the first available active menu being chosen
- **Fallback**: If no valid menus are found, users are redirected to `/Dashboard`

## Integration

The component is designed to work with the existing Redux store and menu system. It uses the `selectMenuState` selector to access the user's menu data and integrates seamlessly with the existing authentication and routing system.
