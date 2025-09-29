import type { NavbarLinks } from "../types/NavbarLinks";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import product5 from "../assets/product5.jpg";
import type { Product } from "../types/Product";

import {
  ArrowPathIcon,
  ArrowLeftCircleIcon,
  PhoneIcon,
  TruckIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import type { Feature, Stat } from "../types/About";


import { 
  FaRocket, 
  FaShieldAlt, 
  FaHeart, 
  FaAward,
  FaUsers,
  FaGlobe
} from "react-icons/fa";

export const navLinks: NavbarLinks[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Collection",
    path: "/collection",
  },
  {
    id: 3,
    title: "About",
    path: "/about",
  },
  {
    id: 4,
    title: "Contact",
    path: "/contact",
  },
];

export const AllProducts: Product[] = [
  {
    id: 1,
    title: "Nike Air Max",
    price: 120,
    image: product1,
  },
  {
    id: 2,
    title: "Nike Air Max",
    price: 120,
    image: product2,
  },
  {
    id: 3,
    title: "Nike Air Max",
    price: 120,
    image: product3,
  },
  {
    id: 4,
    title: "Nike Air Max",
    price: 120,
    image: product4,
  },
  {
    id: 5,
    title: "Nike Air Max",
    price: 120,
    image: product5,
  },
];

export const singleProduct: Product = {
  id: 1,
  title: "Nike Air Max",
  price: 120,
  image: product1,
};

export const services = [
  {
    icon: ArrowPathIcon,
    title: "Easy Exchange Policy",
    description: "We offer hassle free exchange policy",
    delay: 0.1,
  },
  {
    icon: ArrowLeftCircleIcon,
    title: "7 Days Return Policy",
    description: "We provide 7 days free return policy",
    delay: 0.2,
  },
  {
    icon: PhoneIcon,
    title: "Best Customer Support",
    description: "We provide 24/7 customer support",
    delay: 0.3,
  },
  {
    icon: TruckIcon,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
    delay: 0.4,
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Payments",
    description: "Your payments are safe and secure",
    delay: 0.5,
  },
  {
    icon: CheckBadgeIcon,
    title: "Quality Guarantee",
    description: "We guarantee the quality of all products",
    delay: 0.6,
  },
];


//------------------------------------data for about page------------------------------------

export const features: Feature[] = [
    {
      icon: <FaRocket className="text-3xl text-pink-600" />,
      title: "Innovation",
      description: "Cutting-edge technology and modern solutions"
    },
    {
      icon: <FaShieldAlt className="text-3xl text-pink-700" />,
      title: "Trust & Security",
      description: "Your data and transactions are always protected"
    },
    {
      icon: <FaHeart className="text-3xl text-pink-800" />,
      title: "Customer Love",
      description: "We prioritize customer satisfaction above all"
    },
    {
      icon: <FaAward className="text-3xl text-pink-600" />,
      title: "Quality",
      description: "Only the best products from trusted brands"
    },
    {
      icon: <FaUsers className="text-3xl text-pink-700" />,
      title: "Community",
      description: "Join thousands of satisfied customers worldwide"
    },
    {
      icon: <FaGlobe className="text-3xl text-pink-800" />,
      title: "Global Reach",
      description: "Serving customers across the globe"
    }
  ];


export  const stats: Stat[] = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Products" },
    { number: "50+", label: "Brands" },
    { number: "24/7", label: "Support" },
  ];