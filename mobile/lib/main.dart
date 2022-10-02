import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/screens/Welcome/sign_in.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Travel Knights',
      theme: ThemeData(
          primaryColor: kPrimaryColor, scaffoldBackgroundColor: kSecondColor),
      home: SignInScreen(),
    );
  }
}
