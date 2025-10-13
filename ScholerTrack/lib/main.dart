import 'package:flutter/material.dart';
import 'login_page/login.dart';
import 'login_page/signup.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ScholarTrack',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.grey[100],
      ),
      home: LoginPage(),
      routes: {
        '/login': (_) => LoginPage(),
        '/signup': (_) => SignupPage(),
      },
    );
  }
}
