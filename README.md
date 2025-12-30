# SPACE - Premium Exhibition & Conference Landing Page

A high-end, premium single-page landing page for SPACE – For Organizing Exhibitions & Conferences, featuring a comprehensive admin dashboard for content and brand management.

## 🌟 Live Demo

- **Landing Page**: [View Live Site](https://niat5nwzcm.skywork.website)
- **Admin Dashboard**: [Access Admin Panel](https://niat5nwzcm.skywork.website/#/admin)

## 🎯 Features

### Landing Page
- **Premium Design**: Clean, corporate, international tone with locked brand identity
- **One-Page Experience**: Smooth scrolling navigation with sticky header
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Brand Compliant**: Strict adherence to SPACE brand guidelines
- **Professional Sections**:
  - Hero section with strong value proposition
  - About SPACE overview
  - Services capabilities grid
  - Portfolio showcase
  - Featured Green Life Expo section
  - Contact information

### Admin Dashboard
- **Multi-User System**: Role-based access control (Admin, Editor, Viewer)
- **Content Management**: Edit all website text and copy
- **Brand Controls**: Manage colors, logos, and visual identity
- **User Management**: Add, edit, and manage dashboard users (Admin only)
- **Logo Upload**: Advanced logo management with live preview
- **Media Library**: Organized asset management
- **Live Preview**: Direct access to website changes

## 🔐 Admin Access

### Demo Accounts
- **Admin**: `admin` / `space2024admin` (Full access)
- **Editor**: `editor` / `editor2024` (Content editing)

### User Roles
- **Admin**: Full access including user management
- **Editor**: Content and brand management
- **Viewer**: Read-only access

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Shadcn/ui
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 🎨 Brand Guidelines

### Color Palette (LOCKED)
- **Primary Background**: White / Off-white
- **Primary Text**: Dark Gray
- **Accent Color**: Bright Blue / Cyan
- **Secondary Backgrounds**: Dark Charcoal / Black

### Typography
- **Font**: Inter (Modern sans-serif)
- **Style**: Bold uppercase headings, clean readable body text
- **Hierarchy**: Strong executive/corporate feel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/omarfouad01/Space-website.git
   cd Space-website
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

## 📁 Project Structure

```
src/
├── components/ui/          # Reusable UI components
├── pages/
│   ├── Index.tsx          # Main landing page
│   └── Admin.tsx          # Admin dashboard
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
└── index.css             # Global styles & design system
```

## 🔧 Admin Dashboard Features

### Content Management
- Hero section editing
- About section content
- Services descriptions
- Green Life Expo content
- Contact information

### Brand & Logo Management
- Color scheme controls (HSL format)
- Logo upload system (main + white versions)
- Live preview functionality
- Brand consistency enforcement

### User Management (Admin Only)
- Create new user accounts
- Edit user permissions and roles
- Enable/disable user accounts
- Track login activity
- Password management

### Media Library
- View current assets
- Upload new media files
- Organized file management

## 🌐 Deployment

The project is configured for easy deployment to various platforms:

- **Vercel**: `npm run build` + deploy dist folder
- **Netlify**: Connect GitHub repo for automatic deployment
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 📝 License

This project is proprietary software for SPACE exhibitions and conferences.

## 🤝 Support

For technical support or questions about the admin dashboard:
- Check the admin panel help sections
- Review user role permissions
- Contact system administrator

---

**Built with precision for SPACE - Creating exceptional exhibitions and conferences worldwide.**