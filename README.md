# Amazon 2.0

A modernized Amazon storefront built as a technical assignment with Next.js App Router, TypeScript, and Tailwind CSS. The product goal is a fast, intent-driven shopping journey: an organic catalog without sponsored banners, immediate product filtering, and checkout without a full-page detour.

## Product decisions

- **Zero-ad intent search:** Search and filter an organic product grid by category, quick price range, 4+ star rating, and Prime delivery. Results update immediately when filters change, with a live product count.
- **Key specs at a glance:** Each product detail page brings brand, color, dimensions, material, and warranty into compact, structured spec cards beside the product and buy box.
- **Instant slide-over cart:** Adding an item opens a side drawer. The header badge, quantities, and subtotal update from shared cart state without redirecting away from the product.
- **One-page checkout:** A modal keeps the order summary, mock shipping address, and Card or One-Click Pay choice together. Placing a demo order returns a tracking ID confirmation. No real payment is processed.

## Stack and architecture

- **Next.js 14+ App Router:** Homepage and dynamic `/product/[id]` routes.
- **TypeScript:** Typed product data, filters, and cart state.
- **Tailwind CSS:** Dense responsive layouts with dark slate navigation, light catalog surfaces, and restrained purchase accents.
- **Lucide Icons:** Utility icons for navigation, search, cart, and product details.
- **Client-side state:** `ProductBrowser` filters the sample catalog; `CartProvider` synchronizes the navbar, product cards, PDP, cart drawer, and checkout modal.

Sample product data lives in `data/products.ts`. The intro animation uses the frames in `public/animation/` and appears once per browser session, with a Skip control.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To verify a production build:

```bash
npm run build
```
