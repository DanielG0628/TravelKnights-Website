import 'dart:async';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:amplify_datastore/amplify_datastore.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/screens/Welcome/sign_in.dart';
import 'package:travelknights/routes/routes.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
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
      routes: Routes.getroutes,
      home: AuthenticationWrapper(),
    );
  }
}

class AuthenticationWrapper extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SignInScreen();
  }
}
