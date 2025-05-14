#Final Project - Humean Books
---
## Colophon:
- Name: **Ramanuja Mohanty**
- Date: **05/13/2025**
- Description: Humean Books is a bookstore specializing in the sale of first-edition, antique, or otherwise rare books. 
---
## Technical Aspects:
- Project File Structure:
```
/your-bookstore-project
├── node_modules/        # Installed npm packages (automatically created)
├── public/              # Static files (CSS, JS, images)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   └── images/
├── views/               # Your HTML template files (if using a templating engine, otherwise HTML files go here or in public)
│   ├── layouts/         # Optional: for layout templates
│   └── index.html       # Example: your homepage HTML
│   └── catalog.html     # Example: your catalog page HTML
│   └── signin.html      # Example: your sign-in page HTML
│   └── checkout.html    # Example: your checkout page HTML
│   └── orderhistory.html# Example: your order history page HTML
├── src/                 # Or 'server/', 'backend/' - Your server-side code
│   ├── config/          # Configuration files (e.g., database config)
│   │   └── database.js
│   ├── controllers/     # Handle request/response logic
│   │   └── bookController.js
│   │   └── authController.js
│   │   └── orderController.js
│   ├── models/          # Interact with the database (data structure and logic)
│   │   └── book.js
│   │   └── user.js
│   │   └── order.js
│   ├── routes/          # Define your URL endpoints
│   │   └── index.js     # Main routes
│   │   └── books.js     # Book related routes
│   │   └── auth.js      # Authentication routes
│   │   └── orders.js    # Order related routes
│   ├── services/        # Optional: Business logic
│   │   └── bookService.js
│   └── app.js           # Your main application file (entry point)
├── .gitignore           # Specify files/folders to ignore in Git (like node_modules)
└── package.json         # Project dependencies and scripts (automatically created)
```
- The site has 5 pages of importance:
	- Home Page
	- Sign-In Page
	- Catalog Page
	- Checkout Page
	- Order History Page
---
## Usage:
1. Clone into the project repository `humean-books` using the terminal command `git clone git@github.com:RamanujaMohanty/humean-books.git`
2. Do the following steps:
	a. Use `cd humean-books` to enter the repository
	b. 
