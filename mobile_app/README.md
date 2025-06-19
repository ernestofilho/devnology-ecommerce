# Devnology E-commerce Mobile

Aplicativo mobile desenvolvido em Flutter para o sistema de e-commerce da Devnology.

## Instalação

```bash
flutter pub get
```

## Execução

```bash
# Debug
flutter run

# Release
flutter run --release

# Build APK
flutter build apk

# Build iOS
flutter build ios
```

## Configuração

Para conectar com o backend local, ajuste o IP no arquivo `lib/services/api_service.dart`:

```dart
static const String baseUrl = 'http://SEU_IP:3001';
```

## Funcionalidades

- Listagem de produtos
- Busca e filtros
- Carrinho de compras
- Finalização de pedidos
- Interface nativa Android/iOS

## Tecnologias

- Flutter 3.24.5
- Dart 3.5.4
- Provider (gerenciamento de estado)
- HTTP (requisições API)

