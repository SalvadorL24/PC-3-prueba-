
// Componente Header
function Header() {
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem('darkMode') === 'true' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('darkMode') !== 'false')
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <header className="bg-green-200 dark:bg-green-900 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center flex-grow">GAME ZONE</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full focus:outline-none"
            >
              {darkMode ? (
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a href="carrito.html" className="p-2 rounded-full relative">
              <svg className="h-6 w-6 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="cart-count absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCart().reduce((total, item) => total + item.quantity, 0)}
              </span>
            </a>
          </div>
        </div>
        
        <nav className="mt-2">
          <div className="flex justify-center space-x-1 bg-gray-800 dark:bg-gray-800 py-2 rounded-md">
            <a href="index.html" className="text-white hover:text-green-300 font-medium px-3 py-1 rounded text-sm transition-colors">INICIO</a>
            <a href="juegos.html" className="text-white hover:text-green-300 font-medium px-3 py-1 rounded text-sm transition-colors">JUEGOS</a>
            <a href="funkos.html" className="text-white hover:text-green-300 font-medium px-3 py-1 rounded text-sm transition-colors">FUNKOS</a>
            <a href="consolas.html" className="text-white hover:text-green-300 font-medium px-3 py-1 rounded text-sm transition-colors">CONSOLAS</a>
            <a href="accesorios.html" className="text-white hover:text-green-300 font-medium px-3 py-1 rounded text-sm transition-colors">ACCESORIOS</a>
            <a href="contacto.html" className="text-white hover:text-green-300 font-medium px-3 py-1 rounded text-sm transition-colors">CONTACTO</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Componente Footer
function Footer() {
  return (
    <footer className="bg-green-200 dark:bg-green-900 text-gray-800 dark:text-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>&copy; 2023 Game Zone. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

// Componente ProductCard
function ProductCard({ product }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
        <p className="text-green-600 dark:text-green-400 font-bold">${product.price.toFixed(2)}</p>
        <button 
          onClick={() => addToCart(product.id)}
          className="mt-3 w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white py-2 rounded-md transition-colors"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

// Componente CategoryPage
function CategoryPage({ category }) {
  const [products, setProducts] = React.useState([]);
  const categoryNames = {
    'juegos': 'Juegos',
    'funkos': 'Funkos',
    'consolas': 'Consolas',
    'accesorios': 'Accesorios'
  };

  React.useEffect(() => {
    setProducts(getProductsByCategory(category));
  }, [category]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-8 flex-grow">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Nuestros {categoryNames[category]}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Componente HomePage
function HomePage() {
  const banners = [
    "https://via.placeholder.com/1200x400?text=Oferta+Especial",
    "https://via.placeholder.com/1200x400?text=Nuevos+Lanzamientos",
    "https://via.placeholder.com/1200x400?text=Black+Friday",
    "https://via.placeholder.com/1200x400?text=Cyber+Monday"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-8 flex-grow">
        {/* Carrusel de banners */}
        <div className="mb-12 overflow-hidden rounded-lg shadow-xl">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {banners.map((banner, index) => (
              <img 
                key={index}
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-64 object-cover flex-shrink-0 rounded-lg"
              />
            ))}
          </div>
        </div>
        
        {/* Resto del contenido existente... */}
      </main>
      <Footer />
    </div>
  );
}

// Componente ContactPage
// En main.js, actualiza el componente ContactPage
function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado con éxito');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-8 flex-grow">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Contacto</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Formulario de Contacto</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mensaje</label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
            
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Redes Sociales</h3>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-800 dark:text-pink-400">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="text-green-600 hover:text-green-800 dark:text-green-400">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a href="#" className="text-black hover:text-gray-800 dark:text-gray-300">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.186 8.302c1.161 0 2.343.566 2.343 2.279v4.768h1.701v-4.768c0-2.28-1.225-3.701-3.349-3.701-1.948 0-3.208 1.116-3.208 3.04v1.693H9.167v2.316h1.375v7.304h2.166v-7.304h1.843l.273-2.316h-2.116v-1.214c0-.963.427-1.56 1.272-1.56z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Ubicación</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.9878449241646!3d40.74844097138939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1683037463621!5m2!1sen!2sus" 
                  width="100%" 
                  height="400" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy" 
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="mt-4 text-gray-600 dark:text-gray-300">
                <p className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Av. Principal 1234, Ciudad de México
                </p>
                <p className="flex items-center mt-2">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Tel: 55 1234 5678
                </p>
                <p className="flex items-center mt-2">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  contacto@gamezone.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
// Componente CartPage
function CartPage() {
  const [cart, setCart] = React.useState(window.cartFunctions.getCart());
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false);
    // Escuchar cambios en el localStorage
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleStorageChange = (e) => {
    if (e.key === 'gamezone_cart') {
      setCart(JSON.parse(e.newValue));
    }
  };

  const handleUpdateQuantity = (productId, quantity) => {
    window.cartFunctions.updateQuantity(productId, quantity);
    setCart([...window.cartFunctions.getCart()]);
  };

  const handleRemoveItem = (productId) => {
    window.cartFunctions.removeFromCart(productId);
    setCart([...window.cartFunctions.getCart()]);
  };

  if (isLoading) return <div className="text-center py-12">Cargando carrito...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-8 flex-grow">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Tu Carrito</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Tu carrito está vacío</p>
            <a 
              href="juegos.html" 
              className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Ver productos
            </a>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center border-b dark:border-gray-700 py-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-800 dark:text-white">{item.name}</h4>
                    <p className="text-green-600 dark:text-green-400 font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2 text-gray-800 dark:text-white min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border-t dark:border-gray-700 pt-4">
              <div className="flex justify-between mb-2 text-gray-800 dark:text-gray-300">
                <span className="font-medium">Subtotal:</span>
                <span>${window.cartFunctions.getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-800 dark:text-gray-300">
                <span className="font-medium">Envío:</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-4 text-gray-800 dark:text-white">
                <span>Total:</span>
                <span>${(window.cartFunctions.getCartTotal() + 5.99).toFixed(2)}</span>
              </div>
              
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-6 transition-colors"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
// Renderizar la página adecuada
function App() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  
  if (path === 'carrito.html') return <CartPage />;
  if (path === 'juegos.html') return <CategoryPage category="juegos" />;
  if (path === 'funkos.html') return <CategoryPage category="funkos" />;
  if (path === 'consolas.html') return <CategoryPage category="consolas" />;
  if (path === 'accesorios.html') return <CategoryPage category="accesorios" />;
  if (path === 'contacto.html') return <ContactPage />;
  return <HomePage />;
}

// Inicializar la aplicación
ReactDOM.render(<App />, document.getElementById('root'));