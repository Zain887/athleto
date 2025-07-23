// data/products.ts

export interface Product {
  name: string;
  price: string;
  size: string;
  description: string;
  image: string;
  category: "men" | "women" | "kids";
}

export const products: Product[] = [
  {
    name: "Men's Elite Tracksuit",
    price: "$79.99",
    size: "M, L, XL",
    description: "Breathable and stylish tracksuit for everyday performance.",
    image: "/images/dummy.png",
    category: "men",
  },
  {
    name: "Men's Active Pro Set",
    price: "$89.99",
    size: "L, XL, XXL",
    description: "Sweat-wicking fabric with a modern slim fit.",
    image: "/images/dummy.png",
    category: "men",
  },
  {
    name: "Women's Flex Tracksuit",
    price: "$84.99",
    size: "S, M, L",
    description: "Comfortable, stylish and perfect for workouts or casual wear.",
    image: "/images/dummy.png",
    category: "women",
  },
  {
    name: "Women's Motion Luxe",
    price: "$94.99",
    size: "M, L",
    description: "Designed for flexibility and elegance on the go.",
    image: "/images/dummy.png",
    category: "women",
  },
  {
    name: "Kids' Play Tracksuit",
    price: "$59.99",
    size: "XS, S, M",
    description: "Durable tracksuit designed for energetic and playful kids.",
    image: "/images/dummy.png",
    category: "kids",
  },
  {
    name: "Kids' Color Pop Set",
    price: "$64.99",
    size: "S, M, L",
    description: "Bright, fun colors with durable comfort for kids.",
    image: "/images/dummy.png",
    category: "kids",
  },
];
