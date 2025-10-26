# Vue.js Ticket Manager

A robust ticket management web application built with Vue.js 3, featuring a modern design with responsive layout, secure authentication, and full CRUD operations for tickets.

## 🚀 Features

### Core Functionality

- **Landing Page**: Welcoming homepage with hero section, wavy SVG background, and decorative elements
- **Authentication**: Secure login/signup with form validation and error handling
- **Dashboard**: Statistics overview with total, open, in-progress, and resolved tickets
- **Ticket Management**: Complete CRUD operations (Create, Read, Update, Delete)

### Technical Features

- **Responsive Design**: Mobile-first approach with max-width 1440px centered layout
- **Route Protection**: Protected routes with authentication guards
- **Form Validation**: Real-time validation with inline error messages
- **Local Storage**: Persistent session and data management
- **Modern UI**: Card-based layout with shadows, rounded corners, and smooth animations

## 🛠️ Technologies Used

### Frontend Framework

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router 4** - Official routing solution for Vue.js

### Build Tools

- **Vite 5** - Next generation frontend tooling
- **@vitejs/plugin-vue** - Vue.js plugin for Vite

### Utilities

- **UUID** - For generating unique identifiers

## 📦 Installation & Setup

### Prerequisites

- Node.js 16+
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vue-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 Usage Instructions

### Demo Credentials

Use these credentials to test the application:

- **Email**: demo@ticket.com
- **Password**: demo123

### Navigation

1. **Landing Page** (`/`) - Welcome page with app overview
2. **Login** (`/auth/login`) - User authentication
3. **Signup** (`/auth/signup`) - New user registration
4. **Dashboard** (`/dashboard`) - Statistics and overview (Protected)
5. **Tickets** (`/tickets`) - Ticket management interface (Protected)

### Ticket Management

- **Create**: Click "New Ticket" button on tickets page
- **View**: All tickets displayed in card format with status indicators
- **Edit**: Click "Edit" button on any ticket card
- **Delete**: Click "Delete" button with confirmation dialog

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── Footer.vue      # Site footer
│   └── Navbar.vue      # Navigation bar
├── views/              # Page components
│   ├── Landing.vue     # Landing page
│   ├── Dashboard.vue   # Dashboard with statistics
│   ├── Auth/           # Authentication pages
│   │   ├── Login.vue   # Login form
│   │   └── Signup.vue  # Registration form
│   └── Tickets/        # Ticket management
│       ├── index.vue   # Main tickets page
│       ├── TicketList.vue    # Ticket display component
│       └── TicketForm.vue    # Create/edit form
├── router/             # Vue Router configuration
│   └── index.js        # Route definitions and guards
├── assets/             # Static assets
│   └── styles.css      # Global styles
├── App.vue             # Root component
├── main.js             # Application entry point
└── setupDemo.js        # Demo data initialization
```

## 🎨 Design System

### Color Scheme

- **Primary**: #4f46e5 (Indigo)
- **Secondary**: #7c3aed (Purple)
- **Success/Open**: #10b981 (Green)
- **Warning/In Progress**: #f59e0b (Amber)
- **Danger/Error**: #ef4444 (Red)
- **Closed**: #6b7280 (Gray)

### Layout Rules

- **Max Width**: 1440px centered on large screens
- **Hero Section**: Purple gradient with wavy SVG bottom
- **Cards**: Rounded corners (12px), subtle shadows
- **Responsive**: Mobile-first with tablet and desktop breakpoints

### Status System

Tickets use a strict status enum:

- `open` → Green theme
- `in_progress` → Amber theme
- `closed` → Gray theme

## 🔐 Security Features

### Authentication

- localStorage session management with key: `ticketapp_session`
- Protected routes redirect to login when unauthorized
- Session clearing on logout

### Data Validation

- **Title**: Required, max 100 characters
- **Status**: Must be one of: 'open', 'in_progress', 'closed'
- **Description**: Optional, max 1000 characters
- **Email**: Valid email format required
- **Password**: Minimum 6 characters

### Error Handling

- Form validation with inline error messages
- Network error handling with user-friendly messages
- Unauthorized access protection
- Clear success/error feedback

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of form labels, headings, and ARIA attributes
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG compliant contrast ratios

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] Login/Signup validation works
- [ ] Protected routes redirect properly
- [ ] Dashboard statistics calculate correctly
- [ ] CRUD operations function properly
- [ ] Responsive design works on all devices
- [ ] Logout clears session properly

### Demo Data

The application automatically creates demo data on first run:

- Demo user account
- Sample tickets with different statuses

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Large Mobile**: 481px - 768px
- **Tablet**: 769px - 1024px
- **Desktop**: 1025px - 1280px
- **Large Desktop**: > 1280px

## 🐛 Known Issues

None currently reported.

## 📝 Development Notes

### State Management

- Uses component-level state management
- localStorage for persistence
- No external state management library required

### Performance

- Vite for fast development builds
- CSS optimizations for smooth animations
- Minimal bundle size with tree-shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Vue.js 3 and Vite**
