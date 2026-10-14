export type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  prime: boolean;
  bestSeller?: boolean;
  category: string;
  specs?: { brand: string; color: string; dimensions: string; material: string; warranty: string };
};

export const products: Product[] = [
  { id: "p1", title: "Wireless Noise Cancelling Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85", price: 89.99, rating: 4.7, reviewCount: 2841, prime: true, bestSeller: true, category: "Electronics", specs: { brand: "North Sound", color: "Black", dimensions: "7.5 × 6.7 × 3.2 in", material: "Aluminum & foam", warranty: "1 year" } },
  { id: "p2", title: "Minimalist Ceramic Coffee Mug", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=85", price: 18.5, rating: 4.8, reviewCount: 932, prime: true, category: "Home", specs: { brand: "Hearth Studio", color: "Ivory", dimensions: "12 oz capacity", material: "Ceramic", warranty: "30-day returns" } },
  { id: "p3", title: "Classic Everyday Backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=85", price: 54.95, rating: 4.5, reviewCount: 1740, prime: false, category: "Fashion", specs: { brand: "Trailmark", color: "Olive", dimensions: "18 × 12 × 6 in", material: "Woven fabric", warranty: "1 year" } },
  { id: "p4", title: "Portable Bluetooth Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=85", price: 39.99, rating: 4.6, reviewCount: 1205, prime: true, category: "Electronics", specs: { brand: "Wave Audio", color: "Black", dimensions: "6 × 3 × 3 in", material: "Polymer", warranty: "1 year" } },
  { id: "p5", title: "Stainless Steel Water Bottle", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=85", price: 24.99, rating: 4.9, reviewCount: 3587, prime: true, category: "Home", specs: { brand: "Everwell", color: "Ocean Blue", dimensions: "24 oz capacity", material: "Stainless steel", warranty: "1 year" } },
  { id: "p6", title: "Modern Desk Lamp", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=85", price: 42.0, rating: 4.4, reviewCount: 648, prime: false, category: "Home", specs: { brand: "Forma", color: "Matte Black", dimensions: "16 × 7 × 7 in", material: "Metal", warranty: "2 years" } },
  { id: "p7", title: "Smart Fitness Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85", price: 129.0, rating: 4.6, reviewCount: 2104, prime: true, category: "Electronics", specs: { brand: "Pace", color: "Silver", dimensions: "1.7 in display", material: "Aluminum & silicone", warranty: "1 year" } },
  { id: "p8", title: "The Art of Slow Living", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=85", price: 21.0, rating: 4.7, reviewCount: 809, prime: true, bestSeller: true, category: "Books", specs: { brand: "Field Notes Press", color: "Paperback", dimensions: "6 × 9 in", material: "Paper", warranty: "30-day returns" } },
];
