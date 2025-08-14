# 404 Not Found Component

The `NotFound` component provides a user-friendly 404 error page when users navigate to non-existent routes or routes they don't have access to.

## Features

- **Modern Design**: Clean, professional design with UB branding
- **Smart Navigation**: Automatically navigates to user's first available menu
- **Multiple Actions**: Provides both "Go Home" and "Go Back" options
- **Responsive Layout**: Works well on all screen sizes
- **Accessibility**: Proper contrast and keyboard navigation

## Design Elements

### Visual Components
- **UB Logo**: Displays the university logo at the top
- **Large 404 Number**: Prominent display of the error code
- **Clear Message**: Explains that the page doesn't exist
- **Action Buttons**: Two navigation options for users
- **Help Text**: Additional guidance for users

### Color Scheme
- **Primary**: UB Purple (#6C3777)
- **Background**: Light gray (#f5f5f5)
- **Card**: White with subtle shadow
- **Text**: Dark gray for readability

## Navigation Logic

### Go Home Button
- Checks user's available menus from Redux state
- Navigates to the first active menu item
- Falls back to Dashboard if no menus available

### Go Back Button
- Uses browser history to go back one step
- Provides familiar navigation pattern

## Integration

### Routing
- **Direct Access**: `/404` route for direct navigation
- **Catch-all**: `*` route catches all unmatched paths
- **MenuRouter**: Redirects unauthorized access to 404

### State Management
- **Redux Integration**: Uses menu state to determine navigation
- **User Context**: Respects user permissions and available menus

## Usage Scenarios

1. **Invalid URL**: User types a non-existent route
2. **Unauthorized Access**: User tries to access a route they don't have permission for
3. **Broken Links**: External links that no longer exist
4. **Direct Navigation**: User manually navigates to `/404`

## Accessibility Features

- **High Contrast**: Clear text and button colors
- **Keyboard Navigation**: All buttons are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Logical tab order

## Responsive Design

- **Mobile**: Optimized for small screens with appropriate font sizes
- **Tablet**: Balanced layout for medium screens
- **Desktop**: Full-width layout with centered content

## Error Handling

- **Graceful Fallbacks**: Always provides navigation options
- **User Guidance**: Clear instructions on what to do next
- **Contact Information**: Suggests contacting administrator if needed 