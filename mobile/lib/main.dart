import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/screens/Welcome/sign_in.dart';
import 'package:travelknights/routes/routes.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
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

class _User {
  final String name, email, userName, password;

  _User(this.name, this.email, this.userName, this.password);
}
