# AuthX - Secure Degree Verification Platform

A comprehensive React.js prototype for secure degree verification with three distinct portals: University Admin, HR/User, and Government. Built for the Smart India Hackathon by Team Xerox.

## 🚀 Features

### University Admin Portal
- **Real-time Dashboard**: Live verification statistics and fraud detection metrics
- **CSV Bulk Upload**: Upload and process multiple degree records with progress tracking
- **Fraud Alerts**: Automated alerts for high fraud detection rates
- **Verification Management**: View and manage recent degree verifications

### HR/User Portal
- **File Upload**: Support for single files, bulk processing, and camera capture simulation
- **Live Verification**: Real-time verification results with confidence scores
- **Advanced Filtering**: Search and filter verifications by status, name, or degree type
- **PDF Reports**: Generate and download detailed verification reports
- **Drag & Drop Interface**: Intuitive file upload with progress indicators

### Government Portal
- **Analytics Dashboard**: Comprehensive fraud trend analysis and institutional comparisons
- **Interactive Charts**: Line charts, bar charts, and pie charts for data visualization
- **Data Export**: Export institutional data in JSON and CSV formats
- **Risk Assessment**: Color-coded risk levels for different institutions
- **Real-time Updates**: Live data simulation with automatic updates

## 🎨 Design Features

- **Professional Light Theme**: Clean, modern interface with blue primary colors
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Accessibility**: WCAG compliant with proper contrast ratios and keyboard navigation

## 🔐 Authentication

### Demo Credentials

#### University Admin
- **Username**: `admin@university.edu`
- **Password**: `admin123`
- **Features**: Dashboard analytics, CSV upload, fraud alerts, PDF reports

#### HR Manager
- **Username**: `hr@company.com`
- **Password**: `hr123`
- **Features**: File upload, verification results, PDF reports

#### Government Official
- **Username**: `gov@ministry.gov`
- **Password**: `gov123`
- **Features**: Analytics dashboard, data export, institutional monitoring, PDF reports

## 🛠️ Technology Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **File Handling**: React Dropzone
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **PDF Generation**: jsPDF

## 📱 Usage

1. **Login**: Use any of the demo credentials to access different portals
2. **University Portal**: Monitor verifications, upload CSV files, view fraud alerts, generate reports
3. **HR Portal**: Upload documents, verify degrees, generate reports
4. **Government Portal**: Analyze trends, export data, monitor institutions, generate reports
5. **Contact**: Visit the Team section to learn about the developers

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable components
├── contexts/           # React contexts (Auth)
├── pages/             # Main application pages
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

### Key Components
- `AuthContext`: Authentication state management
- `ProtectedRoute`: Route protection based on user roles
- `ContactSection`: Team information and contact details
- Dashboard components for each portal type

## 🎯 Demo Scenarios

### Real-time Features
- Live statistics updates
- Progress bars for file uploads
- Interactive charts and visualizations
- Responsive design across devices

## 👥 Team Xerox

- **Paranjay Soni** - Team Leader
- **Vedanshi Shrivastava**  
- **Shashank**
- **Abhijeet Biswas**
- **Ayush Ranjan**
- **Shubham Ranjan**

## 📄 License

This project is developed for the Smart India Hackathon 2025 by Team Xerox.

## 🤝 Contributing

This is a demo prototype developed for the Smart India Hackathon. For production use, additional security measures and backend integration would be required.

---

**Built with ❤️ by Team Xerox for Smart India Hackathon 2025**
