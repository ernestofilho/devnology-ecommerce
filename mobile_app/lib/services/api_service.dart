import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/product.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3001'; // Android emulator localhost

  static Future<List<Product>> getProducts({String? search, String? provider}) async {
    String url = '$baseUrl/products';
    List<String> queryParams = [];
    
    if (search != null && search.isNotEmpty) {
      queryParams.add('search=$search');
    }
    
    if (provider != null && provider != 'all') {
      queryParams.add('provider=$provider');
    }
    
    if (queryParams.isNotEmpty) {
      url += '?${queryParams.join('&')}';
    }

    try {
      final response = await http.get(Uri.parse(url));
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonData = json.decode(response.body);
        return jsonData.map((json) => Product.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load products');
      }
    } catch (e) {
      throw Exception('Error fetching products: $e');
    }
  }

  static Future<bool> createOrder({
    required String customerName,
    required String customerEmail,
    required String customerPhone,
    required String customerAddress,
    required List<CartItem> items,
    required double total,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/orders'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'customerName': customerName,
          'customerEmail': customerEmail,
          'customerPhone': customerPhone,
          'customerAddress': customerAddress,
          'items': items.map((item) => item.toJson()).toList(),
          'total': total,
        }),
      );

      return response.statusCode == 201;
    } catch (e) {
      return false;
    }
  }
}

