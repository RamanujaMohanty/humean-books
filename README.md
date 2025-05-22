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
/humean-books
├── node_modules/        # Installed npm packages (automatically created)
├── public/              # Static files (CSS, JS, images)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   └── images/
├── views/               
│   ├── layouts/         
│   └── index.html       
│   └── catalog.html     
│   └── signin.html      
│   └── checkout.html    
│   └── orderhistory.html
├── src/                 
│   ├── config/          
│   │   └── database.js
│   ├── logics/     
│   │   └── bookController.js
│   │   └── authController.js
│   │   └── orderController.js
│   ├── models/          
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
- Clone into the project repository `humean-books` using the terminal command `git clone git@github.com:RamanujaMohanty/humean-books.git`
- Use `cd humean-books` to enter the repository
```bash
$ cd humean-books/
```
- Use the command `npm install express sqlite3 dotenv` to install the following:
	-  Express.js
	-  SQLite
	-  DotEnv
```bash
$ npm install express sqlite3 dotenv
```
- Use the command `node app.js` in the terminal to execute `node.js`.
```bash
$ node app.js
```
