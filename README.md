This Site is For ```Ranka Enterprises```
```text
/ranka-enterprises
├── app/
│   ├── layout.tsx                  # Global layout (Navbar, Footer)
│   ├── page.tsx                    # Home Page
│   ├── products/
│   │   ├── page.tsx                # Product listing page
│   │   └── [id]/page.tsx           # Product detail page
│   ├── cart/page.tsx               # Shopping cart
│   ├── checkout/page.tsx           # Checkout and Razorpay
│   ├── login/page.tsx              # Firebase login (Google)
│   ├── dashboard/page.tsx          # User Dashboard with order history
│   └── admin/page.tsx              # Admin panel to manage products/orders
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── CartItem.tsx
│   └── DeliveryFeeCalculator.tsx   # Calculates fee based on user's address
├── lib/
│   ├── firebase.ts                 # Firebase config + init
│   ├── auth.ts                     # Auth utility functions
│   └── razorpay.ts                 # Razorpay API config
├── utils/
│   └── calculateDistance.ts        # Haversine formula to calculate radius
├── types/
│   ├── product.ts
│   └── order.ts
├── public/                         # Assets
├── styles/
│   └── globals.css
├── .env.local                      # Environment variables
├── package.json
└── next.config.js
```
