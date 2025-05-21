const products = {
  juegos: [
    {
      id: 1,
      name: "The Last of Us Part II",
      price: 59.99,
      image: "https://via.placeholder.com/300x400?text=The+Last+of+Us",
      category: "juegos"
    },
    {
      id: 2,
      name: "Cyberpunk 2077",
      price: 49.99,
      image: "https://via.placeholder.com/300x400?text=Cyberpunk",
      category: "juegos"
    },
    {
      id: 3,
      name: "Elden Ring",
      price: 59.99,
      image: "https://via.placeholder.com/300x400?text=Elden+Ring",
      category: "juegos"
    }
  ],
  funkos: [
    {
      id: 4,
      name: "Funko Pop! Spider-Man",
      price: 14.99,
      image: "https://via.placeholder.com/300x400?text=Spider-Man",
      category: "funkos"
    },
    {
      id: 5,
      name: "Funko Pop! Batman",
      price: 14.99,
      image: "https://via.placeholder.com/300x400?text=Batman",
      category: "funkos"
    },
    {
      id: 6,
      name: "Funko Pop! Mario",
      price: 16.99,
      image: "https://via.placeholder.com/300x400?text=Mario",
      category: "funkos"
    }
  ],
  consolas: [
    {
      id: 7,
      name: "PlayStation 5",
      price: 499.99,
      image: "https://via.placeholder.com/300x400?text=PS5",
      category: "consolas"
    },
    {
      id: 8,
      name: "Xbox Series X",
      price: 499.99,
      image: "https://via.placeholder.com/300x400?text=Xbox",
      category: "consolas"
    },
    {
      id: 9,
      name: "Nintendo Switch OLED",
      price: 349.99,
      image: "https://via.placeholder.com/300x400?text=Switch",
      category: "consolas"
    }
  ],
  accesorios: [
    {
      id: 10,
      name: "Mando DualSense PS5",
      price: 69.99,
      image: "https://via.placeholder.com/300x400?text=DualSense",
      category: "accesorios"
    },
    {
      id: 11,
      name: "Auriculares Gaming",
      price: 89.99,
      image: "https://via.placeholder.com/300x400?text=Auriculares",
      category: "accesorios"
    },
    {
      id: 12,
      name: "Cargador Nintendo Switch",
      price: 29.99,
      image: "https://via.placeholder.com/300x400?text=Cargador",
      category: "accesorios"
    }
  ]
};

function getFeaturedProducts() {
  return [
    products.juegos[0],
    products.funkos[0],
    products.consolas[0]
  ];
}

function getProductsByCategory(category) {
  return products[category] || [];
}

window.getFeaturedProducts = getFeaturedProducts;
window.getProductsByCategory = getProductsByCategory;