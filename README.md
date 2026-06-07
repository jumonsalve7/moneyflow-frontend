# 💰 MoneyFlow - Personal Finance Tracker

A modern, full-featured expense tracking application built with React. MoneyFlow helps you manage your personal finances by tracking incomes and expenses, visualizing spending patterns, and converting between multiple currencies.

## 🚀 Live Demo

[Add your deployment link here when available]

## ✨ Features Implemented

### ✅ Completed Features

| Feature | Description |
|---------|-------------|
| **Transaction Management** | Full CRUD operations: Create, Read, Update, Delete transactions |
| **Income vs Expenses** | Differentiate between money coming in and going out with color-coded displays |
| **Local Persistence** | All data automatically saved to browser's localStorage |
| **Search & Filters** | Search by name, filter by category, and filter by date range |
| **Analytics Charts** | Interactive pie chart (expenses by category) and bar chart (monthly comparison) |
| **Currency Conversion** | Real-time exchange rates with support for 10+ currencies including USD, EUR, COP |
| **Responsive Design** | Grid layout that adapts to any screen size |
| **BEM CSS Methodology** | Scalable and maintainable styling architecture |
| **Like/Favorite System** | Mark important transactions as favorites |

### 🗺️ Roadmap - Features to Implement

- [ ] **Export to CSV** - Download all transactions as CSV file for Excel/Google Sheets
- [ ] **Backend API Integration** - Connect to your existing backend repository for cloud storage
- [ ] **User Authentication** - Login/register system for multi-user support
- [ ] **Budget Categories** - Set monthly budgets per category with alerts
- [ ] **Recurring Transactions** - Automate regular incomes/expenses (subscriptions, salary)
- [ ] **Dark/Light Mode** - Theme toggle for better user experience
- [ ] **Category Icons** - Visual icons for each expense category (🍔, 🚗, 💡)
- [ ] **Trend Line Chart** - See spending trends over time
- [ ] **Mobile App** - React Native version for iOS/Android

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Charts:** Recharts
- **HTTP Client:** Fetch API (native)
- **Currency API:** exchangerate.host
- **Styling:** CSS with BEM methodology
- **State Management:** React Hooks (useState, useEffect)
- **Persistence:** LocalStorage API

## 📁 Project Structure
moneyflow-frontend/
├── src/
│ ├── components/
│ │ ├── AddTransactionForm/ # Form to add new incomes/expenses
│ │ ├── SearchForm/ # Search and filter UI
│ │ ├── TransactionList/ # Grid container for transactions
│ │ ├── TransactionCard/ # Individual transaction display
│ │ ├── TransactionCharts/ # Analytics charts (pie & bar)
│ │ ├── EditModal/ # Modal popup for editing
│ │ └── CurrencySelector/ # Currency dropdown selector
│ ├── hooks/
│ │ └── useCurrencyConverter.js # Custom hook for exchange rates
│ ├── App.jsx # Main application component
│ ├── App.css # Global styles
│ └── main.jsx # Application entry point
├── public/ # Static assets
├── index.html # HTML template
├── package.json # Dependencies
└── vite.config.js # Vite configuration

text

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jumonsalve7/moneyflow-frontend.git
   cd moneyflow-frontend
Install dependencies

bash
npm install
Start development server

bash
npm run dev
Open your browser at http://localhost:5173

Building for Production
bash
npm run build
🎯 How to Use
Add a transaction: Click "+ Add New Transaction", fill the form (select Income or Expense)

View your balance: Dashboard shows Total Income, Total Expenses, and Balance

Search & Filter: Click "🔍 Show Filters" to search by name, category, or date range

Edit a transaction: Click the ✏️ Edit button on any card

Delete a transaction: Click the Delete button

Like transactions: Click the heart icon 🤍 to mark as favorite ❤️

Change currency: Use the currency dropdown in the header (supports USD, EUR, COP, etc.)

View analytics: Charts automatically update with your data

🔄 Currency API
The application uses the free exchangerate.host API for real-time exchange rates. Rates are updated every hour.

Supported currencies: USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, MXN, COP

🐛 Known Issues
None currently. Please report issues on GitHub.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is for educational purposes as part of the TripleTen bootcamp.

👨‍💻 Author
Juan Pablo Monsalve

GitHub: @jumonsalve7

🙏 Acknowledgments
TripleTen bootcamp for project guidance

exchangerate.host for free currency API

Recharts for excellent charting library

🎓 What I Learned Building This
React Hooks (useState, useEffect, custom hooks)

Lifting state up and prop drilling

Component composition and reusability

BEM methodology for scalable CSS

Working with external APIs and CORS

Data visualization with Recharts

Responsive design with CSS Grid

LocalStorage for data persistence

Error handling in asynchronous operations

Built with 💰 at TripleTen

text

---

## 🇪🇸 VERSIÓN EN ESPAÑOL

```markdown
# 💰 MoneyFlow - Rastreador de Finanzas Personales

Una aplicación moderna y completa para el seguimiento de gastos construida con React. MoneyFlow te ayuda a administrar tus finanzas personales rastreando ingresos y gastos, visualizando patrones de gasto y convirtiendo entre múltiples monedas.

## 🚀 Demo en Vivo

[Añade aquí el enlace de despliegue cuando esté disponible]

## ✨ Características Implementadas

### ✅ Funcionalidades Completadas

| Característica | Descripción |
|----------------|-------------|
| **Gestión de Transacciones** | Operaciones CRUD completas: Crear, Leer, Actualizar, Eliminar |
| **Ingresos vs Gastos** | Diferencia entre dinero que entra y sale con códigos de color |
| **Persistencia Local** | Todos los datos se guardan automáticamente en localStorage |
| **Búsqueda y Filtros** | Buscar por nombre, filtrar por categoría y por rango de fechas |
| **Gráficos Analíticos** | Gráfico de torta (gastos por categoría) y barras (comparación mensual) |
| **Conversión de Moneda** | Tasas de cambio en tiempo real con soporte para 10+ monedas |
| **Diseño Responsive** | Cuadrícula que se adapta a cualquier tamaño de pantalla |
| **Metodología CSS BEM** | Arquitectura de estilos escalable y mantenible |
| **Sistema de Likes** | Marcar transacciones importantes como favoritas |

### 🗺️ Hoja de Ruta - Funcionalidades por Implementar

- [ ] **Exportar a CSV** - Descargar todas las transacciones como archivo CSV
- [ ] **Integración con Backend** - Conectar con tu repositorio backend existente
- [ ] **Autenticación de Usuarios** - Sistema de login/registro para múltiples usuarios
- [ ] **Presupuestos por Categoría** - Establecer presupuestos mensuales con alertas
- [ ] **Transacciones Recurrentes** - Automatizar ingresos/gastos regulares
- [ ] **Modo Oscuro/Claro** - Alternar tema para mejor experiencia de usuario
- [ ] **Íconos por Categoría** - Íconos visuales para cada categoría (🍔, 🚗, 💡)
- [ ] **Gráfico de Línea de Tendencia** - Ver tendencias de gasto a lo largo del tiempo
- [ ] **App Móvil** - Versión en React Native para iOS/Android

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Gráficos:** Recharts
- **Cliente HTTP:** Fetch API (nativo)
- **API de Monedas:** exchangerate.host
- **Estilos:** CSS con metodología BEM
- **Manejo de Estado:** React Hooks (useState, useEffect)
- **Persistencia:** API LocalStorage

## 📁 Estructura del Proyecto
moneyflow-frontend/
├── src/
│ ├── components/
│ │ ├── AddTransactionForm/ # Formulario para agregar ingresos/gastos
│ │ ├── SearchForm/ # UI de búsqueda y filtros
│ │ ├── TransactionList/ # Contenedor de cuadrícula
│ │ ├── TransactionCard/ # Tarjeta individual de transacción
│ │ ├── TransactionCharts/ # Gráficos analíticos
│ │ ├── EditModal/ # Ventana modal para editar
│ │ └── CurrencySelector/ # Selector de moneda
│ ├── hooks/
│ │ └── useCurrencyConverter.js # Hook personalizado para tasas de cambio
│ ├── App.jsx # Componente principal
│ ├── App.css # Estilos globales
│ └── main.jsx # Punto de entrada
├── public/ # Archivos estáticos
├── index.html # Plantilla HTML
├── package.json # Dependencias
└── vite.config.js # Configuración de Vite

text

## 🚦 Cómo Empezar

### Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jumonsalve7/moneyflow-frontend.git
   cd moneyflow-frontend
Instalar dependencias

bash
npm install
Iniciar servidor de desarrollo

bash
npm run dev
Abrir el navegador en http://localhost:5173

Construir para Producción
bash
npm run build
🎯 Cómo Usar
Agregar transacción: Haz clic en "+ Add New Transaction", completa el formulario

Ver tu balance: El dashboard muestra Ingresos Totales, Gastos Totales y Balance

Buscar y Filtrar: Haz clic en "🔍 Show Filters" para buscar por nombre, categoría o fecha

Editar transacción: Haz clic en el botón ✏️ Edit en cualquier tarjeta

Eliminar transacción: Haz clic en el botón Delete

Dar like: Haz clic en el corazón 🤍 para marcar como favorito ❤️

Cambiar moneda: Usa el selector de moneda en el encabezado

Ver análisis: Los gráficos se actualizan automáticamente

🔄 API de Monedas
La aplicación usa la API gratuita exchangerate.host para tasas de cambio en tiempo real. Las tasas se actualizan cada hora.

Monedas soportadas: USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, MXN, COP

🐛 Problemas Conocidos
Ninguno actualmente. Por favor reporta problemas en GitHub.

🤝 Contribuciones
¡Las contribuciones son bienvenidas! Por favor, envía un Pull Request.

Haz fork del repositorio

Crea tu rama de características (git checkout -b feature/CaracteristicaIncreible)

Confirma tus cambios (git commit -m 'Añadir alguna característica')

Push a la rama (git push origin feature/CaracteristicaIncreible)

Abre un Pull Request

📝 Licencia
Este proyecto es con fines educativos como parte del bootcamp de TripleTen.

👨‍💻 Autor
Juan Pablo Monsalve

GitHub: @jumonsalve7

🙏 Agradecimientos
Bootcamp TripleTen por la guía del proyecto

exchangerate.host por la API gratuita de monedas

Recharts por la excelente librería de gráficos

🎓 Lo que Aprendí Construyendo Esto
React Hooks (useState, useEffect, hooks personalizados)

Elevación de estado y prop drilling

Composición y reutilización de componentes

Metodología BEM para CSS escalable

Trabajo con APIs externas y CORS

Visualización de datos con Recharts

Diseño responsivo con CSS Grid

LocalStorage para persistencia de datos

Manejo de errores en operaciones asíncronas

Construido con 💰 en TripleTen

text

