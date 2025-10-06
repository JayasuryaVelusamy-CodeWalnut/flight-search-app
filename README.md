# Flight Search App

A modern Vue.js flight search application with integration to the Sabre API for airport data.

## Quick Demo

Check out the quick demo video of the application in action: [Watch Demo](https://drive.google.com/file/d/11UIer3DO_URGOjwA7lJufVhGPL7Zuk0k/view?usp=sharing)

## Features

-  **Trip Type Selection**: Toggle between one-way and return flights
-  **Airport Selection**: Origin and destination dropdowns populated from Sabre API
-  **Date Selection**: Departure and return date pickers with conditional visibility
-  **Passenger Count**: Adults, children, and infants selection with +/- controls
-  **Search Functionality**: Displays search criteria and results
-  **Modern UI**: Beautiful design with gradient backgrounds and smooth animations
-  **Responsive Design**: Works on desktop, tablet, and mobile devices
-  **TypeScript Support**: Full type safety throughout the application
-  **SCSS Styling**: Modern CSS with custom design system

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
- **UI Implementation**: Custom designed and implemented without Figma or design mockups, focusing on modern UI/UX principles and best practices

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

## 10-Hour Implementation Plan

Here is a detailed breakdown of the development process, estimated to take 10 hours:

- **Hour 1: Project Setup & Configuration (1 hour)**
  - Initialize Vue 3 project with Vite and TypeScript.
  - Install and configure Tailwind CSS for styling.
  - Set up project structure (folders for components, services, types, etc.).
  - Configure Vitest for unit testing.

- **Hour 2-3: Core UI Components (2 hours)**
  - Develop `FlightTypeSwitch` component for one-way/return selection.
  - Create `DatePicker` component for selecting departure and return dates.
  - Build `PassengerSelector` component for managing adults, children, and infants.
  - Develop `SearchButton` component with loading and disabled states.

- **Hour 4-5: API Integration & Airport Selection (2 hours)**
  - Create an API service using Axios to fetch airport data from the Sabre API.
  - Implement the `AirportSelect` component with searchable dropdowns for origin and destination.
  - Populate airport dropdowns with data from the API.
  - Handle loading and error states for the API call.

- **Hour 6-7: Main View & Form Logic (2 hours)**
  - Assemble the main `FlightSearch.vue` view by combining all the smaller components.
  - Implement the main form logic using Vue's Composition API (`ref`, `computed`).
  - Add form validation to ensure all required fields are filled.
  - Manage the state for trip type, dates, passengers, and selected airports.

- **Hour 8: Styling & Responsiveness (1 hour)**
  - Design and implement custom UI components without relying on design mockups
  - Apply global styles and Tailwind CSS utility classes following modern design principles
  - Ensure the layout is fully responsive and works well on mobile, tablet, and desktop screens
  - Add subtle animations and transitions for a better user experience
  - Create a cohesive visual language through consistent spacing, colors, and typography

- **Hour 9: Search Results & State Management (1 hour)**
  - Implement the search results display section.
  - Simulate a search action and display a summary of the selected criteria.
  - Refine state management for search status (e.g., `searching`, `searched`).

- **Hour 10: Final Touches & Documentation (1 hour)**
  - Write unit tests for key components and logic.
  - Perform final testing and bug fixes.
  - Write and finalize the `README.md` documentation.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes.
