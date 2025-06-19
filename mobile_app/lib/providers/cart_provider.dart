import 'package:flutter/material.dart';
import '../models/product.dart';
import '../services/api_service.dart';

class CartProvider with ChangeNotifier {
  final List<CartItem> _items = [];

  List<CartItem> get items => _items;

  int get itemCount => _items.fold(0, (sum, item) => sum + item.quantity);

  double get totalPrice => _items.fold(0, (sum, item) => sum + item.totalPrice);

  void addItem(Product product) {
    final existingIndex = _items.indexWhere((item) => item.product.id == product.id);
    
    if (existingIndex >= 0) {
      _items[existingIndex].quantity++;
    } else {
      _items.add(CartItem(product: product));
    }
    
    notifyListeners();
  }

  void removeItem(int productId) {
    final existingIndex = _items.indexWhere((item) => item.product.id == productId);
    
    if (existingIndex >= 0) {
      if (_items[existingIndex].quantity > 1) {
        _items[existingIndex].quantity--;
      } else {
        _items.removeAt(existingIndex);
      }
      notifyListeners();
    }
  }

  void clearCart() {
    _items.clear();
    notifyListeners();
  }

  Future<bool> checkout({
    required String customerName,
    required String customerEmail,
    required String customerPhone,
    required String customerAddress,
  }) async {
    final success = await ApiService.createOrder(
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      customerAddress: customerAddress,
      items: _items,
      total: totalPrice,
    );

    if (success) {
      clearCart();
    }

    return success;
  }
}

