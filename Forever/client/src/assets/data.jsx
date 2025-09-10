import { 
  FaExchangeAlt, 
  FaUndo, 
  FaHeadset, 
  
} from "react-icons/fa";

export const navLinks = [
    {
        id:1,
        url: '/',
        text: 'HOME'
    },
    {
        id:2,
        url: '/collection',
        text: 'COLLECTION'
    },
    {
        id:3,
        url: '/about',
        text: 'ABOUT'
    },
    {
        id:4,
        url: '/contact',
        text: 'CONTACT'
    } 
]


export const services = [
    {
      id: 1,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy",
      icon: <FaExchangeAlt className="text-2xl" />
    },
    {
      id: 2,
      title: "7 Days Return Policy",
      description: "We provide 7 days free return policy",
      icon: <FaUndo className="text-2xl" />
    },
    {
      id: 3,
      title: "Best Customer Support",
      description: "We provide 24/7 customer support",
      icon: <FaHeadset className="text-2xl" />
    }
  ];
