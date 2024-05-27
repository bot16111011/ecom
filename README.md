# E-Commerce Web App
This project is an E-Commerce web application built using React. It allows users to view products, add them to the cart, and manage their shopping experience.

# Installation
1. First, create a new React app using the following command:

```
npx create-react-app e-com
```

2. Navigate to the project directory:

```
cd e-com
```

3. Install the necessary packages:

```
npm install axios redux react-redux redux-toolkit react-router-dom react-toastify sass json-server
```

# Packages Used and Their Purpose

1. **axios**:
  - Used for making HTTP requests to an API (e.g., fetching product data).
2. **redux and react-redux**:
  - Used for managing global state (e.g., storing cart items, user authentication).
  - Redux provides a predictable state container for your application.
3. **redux-toolkit**:
  - A set of tools and utilities for working with Redux.
  - Simplifies the process of creating Redux stores, reducers, and actions.
4. **react-router-dom**:
  - Enables routing within the application.
  - Allows navigation between different pages (e.g., product list, cart, add product).
5. **react-toastify**:
  - Provides toast notifications for displaying messages (e.g., success, error) to the user.
  - Useful for showing alerts (e.g., “Product added to cart”) without disrupting the user experience.
6. **sass**:
  - A CSS preprocessor that allows you to write more maintainable and modular styles.
  - Helps organize your stylesheets and provides features like variables, nesting, and mixins.
7. **json-server**:
  - Used for mocking a RESTful API during development.
  - Allows you to create a simple API using a JSON file (e.g., db.json).
# Getting Started
1. Start the JSON server to serve mock data:
```
json-server --watch db.json
```

2. Run the React app:
```
npm start
```

3. Open your browser and navigate to http://localhost:3000 to view the app.
