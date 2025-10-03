<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>XITEI E-Commerce Website - README</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        h1, h2, h3 { color: #1a2a6c; }
        code, pre { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; }
        th { background: #f0f0f0; }
        .authors { margin-top: 40px; font-size: 1.1em; }
    </style>
</head>
<body>
    <h1>XITEI E-Commerce Website</h1>
    <p>
        Welcome to <strong>Xitei</strong>, a complete e-commerce platform built using Django (backend) and React (frontend). This project provides a robust product management system, secure authentication flow, shopping cart, and integrated payment functionality.
    </p>
    
    <h2>Features</h2>
    <ul>
        <li>Admin product management (create, modify, delete)</li>
        <li>User product browsing with detailed views</li>
        <li>Cart system with add, update, and remove functionality</li>
        <li>Authentication system using JWT</li>
        <li>Stripe payment integration</li>
        <li>Media/image upload and serving from backend</li>
        <li>Responsive modern frontend UI</li>
    </ul>
    
    <h2>Tech Stack</h2>
    <ul>
        <li><strong>Frontend:</strong> React, Axios, Context API</li>
        <li><strong>Backend:</strong> Django, Django REST Framework</li>
        <li><strong>Database:</strong> SQLite (default), switchable to PostgreSQL or MySQL</li>
        <li><strong>Payment:</strong> Stripe API</li>
        <li><strong>Authentication:</strong> JWT, Django Sessions</li>
    </ul>
    
    <h2>Backend Setup</h2>
    <p>
        <strong>Required files:</strong>
    </p>
    <ul>
        <li><code>requirements.txt</code> – Python dependencies</li>
        <li><code>manage.py</code> – Django management script</li>
        <li>Django project and main app files (e.g., <code>xitei/</code>, <code>products/</code>, <code>users/</code>)</li>
        <li><code>.env</code> – Environment variables (secret key, Stripe keys, database config, etc.)</li>
        <li><code>settings.py</code> – Make sure MEDIA_URL and MEDIA_ROOT are correctly configured for images</li>
    </ul>
    
    <h2>Frontend Setup</h2>
    <p>
        <strong>Required files:</strong>
    </p>
    <ul>
        <li><code>package.json</code> – Frontend dependencies</li>
        <li><code>src/</code> – Source code for React components, pages, context</li>
        <li><code>public/</code> – Public assets and entrypoint</li>
        <li><code>.env</code> – Environment variables (API URL, Stripe public key, etc.)</li>
    </ul>
    
    <h2>Project Structure</h2>
    <pre>
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
    </pre>
    
    <h2>API Endpoints</h2>
    <table>
        <tr>
            <th>Feature</th>
            <th>Endpoint Example</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>List Products</td>
            <td>/api/products/</td>
            <td>Get product list</td>
        </tr>
        <tr>
            <td>Cart Operations</td>
            <td>/api/cart/</td>
            <td>Add/remove/view cart items</td>
        </tr>
        <tr>
            <td>User Auth</td>
            <td>/api/auth/</td>
            <td>JWT registration/login</td>
        </tr>
        <tr>
            <td>Stripe Payment</td>
            <td>/api/payment/</td>
            <td>Create payment session</td>
        </tr>
    </table>
    
    <h2>Usage</h2>
    <ul>
        <li>Admins access <strong>/admin/</strong> to manage products.</li>
        <li>Users can browse, search, and view products; add items to their cart, and proceed to checkout with Stripe payments.</li>
        <li>Carts are securely linked to authenticated user accounts.</li>
    </ul>
    
    <h2>Contributing</h2>
    <p>Pull requests are welcome. Please submit issues for bugs or new feature requests via the repository tracker.</p>
    
    <h2>License</h2>
    <p>MIT License</p>
    
    <div class="authors">
        <strong>Authors:</strong> Anurodh Prasai &amp; Shailesh Acharya
    </div>

</body>
</html>
