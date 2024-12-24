

# URL Shortener Client  

Welcome to the **URL Shortener Client**! This is a front-end application designed to make managing and shortening URLs seamless and efficient. The project provides a user-friendly interface to shorten long URLs, manage your shortened links, and more, while maintaining secure and smooth user interactions.  

## Features  

### 🌟 Welcome Page  
- A warm introduction to the purpose and features of the website.  
- Provides an overview of how to use the URL shortener.  

### 🔐 Authentication  
- **Login/Logout** functionality.  
- User session management using **Redux** and **access tokens**.  

### ✂️ URL Shortener  
- Convert long URLs into shorter, shareable links effortlessly.  
- Manage your shortened URLs:  
  - **Visit** the shortened URLs.  
  - **Delete** links as needed.  

### ⚙️ User Management  
- View your login information after successful authentication.  

## Tech Stack  

- **React**: For building the user interface.  
- **Redux**: For state management, including user authentication and URL management.  
- **Axios**: For handling API requests.  
- **React Router**: For seamless navigation between pages.  
- **Tailwind CSS**: For styling the application.  

## Setup  

Follow these steps to run the client locally:  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/Ashif091/URL_Shortener-client
   cd url-shortener-client  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Create a `.env` file in the root directory and add the following environment variables:  
   ```env  
   REACT_APP_API_URL=your_backend_api_url  
   ```  

4. Start the development server:  
   ```bash  
   npm start  
   ```  

5. Open your browser and navigate to:  
   ```
   http://localhost:3000  
   ```  

## Folder Structure  

```plaintext  
src/  
├── components/           # Reusable UI components  
├── pages/                # Main application pages (Welcome, Shortener, etc.)  
├── redux/                # Redux store, slices, and actions  
├── services/             # API integration services  
├── styles/               # Custom styles (if any)  
├── App.js                # Application entry point  
└── index.js              # Main render file  
```  

## Contributing  

Contributions are always welcome! If you'd like to improve the app, follow these steps:  

1. Fork the repository.  
2. Create a new branch:  
   ```bash  
   git checkout -b feature-name  
   ```  
3. Commit your changes:  
   ```bash  
   git commit -m "Add some feature"  
   ```  
4. Push to the branch:  
   ```bash  
   git push origin feature-name  
   ```  
5. Open a pull request.  

