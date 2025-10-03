XITEI E-Commerce Website
Welcome to Xitei, a full-featured e-commerce platform built with Django and React. This project enables efficient product management, seamless user shopping, robust authentication, and smooth payment integration.

Features
Product management for administrators

User product browsing, detail views, and search

Shopping cart with add, update, and remove options

Secure JWT authentication system

Stripe-powered payments

Image/media upload and display from backend

Responsive, modern frontend UI

Tech Stack
Frontend: React, Axios, Context API

Backend: Django, Django REST Framework

Database: SQLite (default), easily switchable

Payment: Stripe API

Authentication: JWT, Django Sessions

Backend Setup
Required files:

requirements.txt (Python dependencies)

manage.py

Django project & apps: xitei/, products/, users/

.env (secrets, keys, DB config, Stripe keys)

settings.py with MEDIA_URL and MEDIA_ROOT configured

Frontend Setup
Required files:

package.json (frontend dependencies)

src/ (React source code)

public/ (static/public assets)

.env (API URLs, Stripe public key)

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
Feature	Endpoint	Description
List Products	/api/products/	Retrieve product list
Cart Operations	/api/cart/	Add/remove/view cart items
User Auth	/api/auth/	JWT registration/login
Stripe Payment	/api/payment/	Create payment session
Usage
Use /admin/ for admin product management

Browse, search and view products as users

Add items to cart, update quantities, proceed to checkout

Complete purchases securely through Stripe integration

Carts are linked to user authentication

Contributing
Pull requests are welcome. Please report bugs or request features using the issue tracker.

License
MIT License

Authors: Anurodh Prasai & Shailesh Acharya
