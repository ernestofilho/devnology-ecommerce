import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import './App.css';

const API_BASE_URL = 'http://localhost:3001';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [providerFilter, setProviderFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({
  name: '',
  email: '',
  phone: '',
  address: '',
})


  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search and provider
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (providerFilter !== 'all') {
      filtered = filtered.filter(product => product.provider === providerFilter);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, providerFilter, products]);

  // Cart functions
  const addToCart = (product) => {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    alert('Produto já está no carrinho. Quantidade aumentada!');
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    alert('Produto adicionado ao carrinho com sucesso!');
    setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
  }
};

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Checkout function
  const handleCheckout = async () => {
      const newErrors = {
      name: '',
      email: '',
      phone: '',
      address: '',
    }
    let isValid = true

    if (!customerData.name.trim()) {
      newErrors.name = 'Nome é obrigatório.'
      isValid = false
    }

    if (!customerData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório.'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = 'E-mail inválido.'
      isValid = false
    }

    if (!customerData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório.'
      isValid = false
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(customerData.phone)) {
      newErrors.phone = 'Telefone inválido. Use o formato (11) 99999-9999.'
      isValid = false
    }

    if (!customerData.address.trim()) {
      newErrors.address = 'Endereço é obrigatório.'
      isValid = false
    }

    setErrors(newErrors)

    if (!isValid) return

    // Tudo válido: prossiga com o pedido
    console.log('Pedido confirmado:', customerData)
    try {
      const orderData = {
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        customerAddress: customerData.address,
        items: cart,
        total: getTotalPrice()
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Pedido realizado com sucesso!');
        setCart([]);
        setShowCheckout(false);
        setShowCart(false);
        setCustomerData({ name: '', email: '', phone: '', address: '' });
      } else {
        alert('Erro ao realizar pedido. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert('Erro ao realizar pedido. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary">Devnology E-commerce</h1>
            <Button
              variant="outline"
              onClick={() => setShowCart(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carrinho
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={providerFilter} onValueChange={setProviderFilter}>
            <SelectTrigger className="w-full sm:w-64">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por fornecedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os fornecedores</SelectItem>
              <SelectItem value="brazilian">Fornecedor Brasileiro</SelectItem>
              <SelectItem value="european">Fornecedor Europeu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-square bg-muted overflow-hidden">
                  {product.gallery && Array.isArray(product.gallery) && product.gallery[0] ? (
                    <img
                      src={product.gallery[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onError={(e) => {
                        console.error('Image failed to load:', product.gallery[0]);
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="w-full h-full flex items-center justify-center text-muted-foreground"
                  >
                    Sem imagem
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                <CardDescription className="text-sm mb-3 line-clamp-3">
                  {product.description}
                </CardDescription>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <Badge variant={product.provider === 'brazilian' ? 'default' : 'secondary'}>
                    {product.provider === 'brazilian' ? 'BR' : 'EU'}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={() => addToCart(product)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Nenhum produto encontrado.</p>
          </div>
        )}
      </div>

      {/* Cart Dialog */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Carrinho de Compras</DialogTitle>
            <DialogDescription>
              {cart.length === 0 ? 'Seu carrinho está vazio.' : `${getTotalItems()} item(s) no carrinho`}
            </DialogDescription>
          </DialogHeader>
          
          {cart.length > 0 && (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">R$ {item.price.toFixed(2)} cada</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="ml-4 font-medium">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>R$ {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {cart.length > 0 && (
              <Button onClick={() => setShowCheckout(true)} className="w-full">
                Finalizar Compra
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Finalizar Compra</DialogTitle>
            <DialogDescription>
              Preencha seus dados para finalizar o pedido.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                value={customerData.name}
                onChange={(e) => {
                  const value = e.target.value
                  setCustomerData(prev => ({ ...prev, name: value }))
                  if (errors.name && value.trim()) setErrors(prev => ({ ...prev, name: '' }))
                }}
                placeholder="Seu nome completo"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={customerData.email}
                onChange={(e) => {
                  const value = e.target.value
                  setCustomerData(prev => ({ ...prev, email: value }))
                  if (errors.email && value.trim()) setErrors(prev => ({ ...prev, email: '' }))
                }}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={customerData.phone}
                onChange={(e) => {
                  const value = e.target.value
                  setCustomerData(prev => ({ ...prev, phone: value }))
                  if (errors.phone && value.trim()) setErrors(prev => ({ ...prev, phone: '' }))
                }}
                placeholder="(11) 99999-9999"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Textarea
                id="address"
                value={customerData.address}
                onChange={(e) => {
                  const value = e.target.value
                  setCustomerData(prev => ({ ...prev, address: value }))
                  if (errors.address && value.trim()) setErrors(prev => ({ ...prev, address: '' }))
                }}
                placeholder="Rua, número, bairro, cidade, CEP"
                rows={3}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleCheckout}
              className="w-full"
              disabled={!customerData.name || !customerData.email || !customerData.phone || !customerData.address}
            >
              Confirmar Pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;

