# FinApp

A modern financial management application with both web and mobile support version 2 of myFinApp.

## Features

### Transaction Management
- Add credits (income) and debits (expenses)
- Real-time balance updates
- Categorize transactions (food, transport, housing, leisure, etc.)
- Add optional transaction descriptions
- Automatic date tracking with manual override option

### Financial Overview
- Real-time balance display
- Configurable initial monthly balance
- Monthly financial reports including:
  - Total credits
  - Total debits
  - Remaining balance
  - Category-wise expense breakdown
- Report export functionality (PDF/Excel)

### Expense Tracking
- View current month's expenses
- Sort by date or category
- Filter transactions by:
  - Category
  - Amount
  - Date

### Customization
- Custom expense categories
- Monthly budget settings per category
- Budget progress tracking
- Notification preferences

## Technical Details

### Web Version
- Built with React and Vite
- Modern UI with Tailwind CSS
- Smooth animations using Framer Motion
- Interactive charts with Chart.js
- Supabase database integration

### Mobile Version (Expo)
- React Native implementation
- Native UI components
- Local storage support
- Offline functionality

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open the application in your browser at `http://localhost:5173`

## Project Structure

```
src/
├── components/    # Composants UI réutilisables
├── hooks/         # Hooks personnalisés
├── lib/           # Fonctions utilitaires et configurations
├── store/         # Gestion de l'état de l'application
├── assets/        # Ressources statiques
└── types/         # Définition des types TypeScript
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - Feel free to use this project for personal or commercial purposes.
