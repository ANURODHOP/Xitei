XITEI E-Commerce Website
Welcome to Xitei, a modern e-commerce platform combining Django (backend) and React (frontend). This project features robust product management, secure authentication, cart functionality, and integrated Stripe payments.

Features
Admin product management (create, modify, delete)

User product browsing with detailed views

Cart system with add, update, and remove functionality

Authentication flow using JWT

Stripe payment integration

Product image upload and backend serving

Responsive, modern frontend UI

Tech Stack
Frontend: React, Axios, Context API

Backend: Django, Django REST Framework

Database: SQLite (default; can switch to PostgreSQL/MySQL)

Payment: Stripe API

Authentication: JWT, Django Sessions

Backend Setup
Required files:

requirements.txt - Python dependencies

manage.py

Django project and app files (xitei/, products/, users/)

.env - Environment variables (secret key, Stripe keys, DB config, etc.)

settings.py - MEDIA_URL and MEDIA_ROOT configured for images

Frontend Setup
Required files:

package.json - Frontend dependencies

src/ - React components, pages, context

public/ - Public assets and entrypoint

.env - API URLs, Stripe public key etc.

Project Structure
text
xitei/
  ├── backend/
  │     ├── manage.py
  │     ├── xitei/
  │     ├── products/
  │     └── users/
  └── frontend/
        ├── src/
        ├── public/
        └── package.json
API Endpoints
Feature	Endpoint Example	Description
List Products	/api/products/	Get product list
Cart Operations	/api/cart/	Add/remove/view cart items
User Auth	/api/auth/	JWT registration/login
Stripe Payment	/api/payment/	Create payment session
Usage
Admins access /admin/ for product management.

Users browse products, manage carts, and checkout with Stripe.

Cart is securely linked to authenticated accounts.

Contributing
Pull requests are welcome! Report issues or request features via the repository tracker.

License
MIT License.

Authors: Anurodh Prasai & Shailesh Acharya

This Markdown README is ready for direct inclusion in your project repository.

