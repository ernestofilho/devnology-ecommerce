class Product {
  final int id;
  final String name;
  final String description;
  final double price;
  final List<String> gallery;
  final String provider;
  final String originalId;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.gallery,
    required this.provider,
    required this.originalId,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      price: json['price'].toDouble(),
      gallery: json['gallery'] is List 
          ? List<String>.from(json['gallery'])
          : [json['gallery'] ?? ''],
      provider: json['provider'],
      originalId: json['originalId'],
    );
  }
}

class CartItem {
  final Product product;
  int quantity;

  CartItem({
    required this.product,
    this.quantity = 1,
  });

  double get totalPrice => product.price * quantity;

  Map<String, dynamic> toJson() {
    return {
      'id': product.id,
      'name': product.name,
      'price': product.price,
      'quantity': quantity,
    };
  }
}

