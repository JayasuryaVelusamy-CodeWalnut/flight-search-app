# Flight Search App

A modern Vue.js flight search application with integration to the Sabre API for airport data.

## Features

- ✅ **Trip Type Selection**: Toggle between one-way and return flights
- ✅ **Airport Selection**: Origin and destination dropdowns populated from Sabre API
- ✅ **Date Selection**: Departure and return date pickers with conditional visibility
- ✅ **Passenger Count**: Adults, children, and infants selection with +/- controls
- ✅ **Search Functionality**: Displays search criteria and results
- ✅ **Modern UI**: Beautiful design with gradient backgrounds and smooth animations
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **TypeScript Support**: Full type safety throughout the application
- ✅ **SCSS Styling**: Modern CSS with custom design system

## API Integration

The app integrates with the Sabre API to fetch airport data:
- **Endpoint**: `GET https://api-cert.ezycommerce.sabre.com/api/v1/Airport/OriginsWithConnections/en-us`
- **Headers**: Includes the required `Tenant-Identifier` header
- **CORS**: Configured to work with localhost development server

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── FlightSearchForm.vue    # Main search form component
│   └── FlightResults.vue       # Results display component
├── services/
│   └── api.ts                  # API service for Sabre integration
├── types/
│   └── flight.ts               # TypeScript type definitions
├── App.vue                     # Main app component
├── main.ts                     # App entry point
└── style.scss                  # Global styles
```

## Technical Details

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: SCSS with modern CSS features
- **HTTP Client**: Axios
- **Development Server**: Configured for localhost:8080 to avoid CORS issues

## Development Notes

- The app is configured to run on `localhost:8080` to avoid CORS issues with the Sabre API
- Airport data is fetched on component mount
- Form validation ensures all required fields are filled before search
- Responsive design adapts to different screen sizes
- Modern CSS features include backdrop-filter, gradients, and smooth transitions

## Next Steps for Full Implementation

1. **Flight Search API**: Integrate with Sabre's flight search endpoints
2. **Real-time Pricing**: Display actual flight prices and availability
3. **Booking Flow**: Add booking functionality
4. **User Authentication**: Implement user accounts
5. **Flight Details**: Show detailed flight information, stops, airlines
6. **Advanced Filters**: Price range, airline preference, departure times
7. **Search History**: Save and display previous searches
8. **Error Handling**: Better error messages and fallback states

## Time Spent

**Total Development Time: ~6-8 hours**

### Breakdown:
- Project setup and configuration: ~1 hour
- Vue.js components development: ~3 hours
- SCSS styling and responsive design: ~2 hours
- API integration and testing: ~1 hour
- Documentation and final touches: ~1 hour

### Areas for Improvement:
- More sophisticated error handling for API failures
- Loading states and skeleton screens
- Advanced form validation with better UX
- Unit tests for components
- Integration tests for API calls
- Accessibility improvements (ARIA labels, keyboard navigation)
- Performance optimization (lazy loading, code splitting)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes.
