import 'package:flutter/material.dart';
import 'package:travelknights/screens/ForgotPassword/forgotPassword.dart';
import 'package:travelknights/screens/PasswordReset/passwordReset.dart';
import 'package:travelknights/screens/Register/register.dart';
import 'package:travelknights/screens/States/states.dart';
import 'package:travelknights/screens/Trips/trips.dart';
import 'package:travelknights/screens/VerifyEmailReset/verifyEmailReset.dart';
import 'package:travelknights/screens/Welcome/sign_in.dart';
import 'package:travelknights/screens/verifyEmailRegister/verifyEmailReg.dart';

class Routes {
  static const String LOGINSCREEN = '/login';
  static const STATESSCREEN = '/states';
  static const FORGOTPASSWORDSCREEN = '/forgotpassword';
  static const PASSWORDRESETSCREEN = '/passwordreset';
  static const REGISTERSCREEN = '/register';
  static const TRIPSSCREEN = '/trips';
  static const EMAILREGISTERSCREEN = '/emailregister';
  static const EMAILRESETSCREEN = '/emailreset';

  static Map<String, Widget Function(BuildContext)> get getroutes => {
        //'/': (context) => SignInScreen(),
        LOGINSCREEN: (context) => SignInScreen(),
        STATESSCREEN: (context) => statesList(),
        FORGOTPASSWORDSCREEN: (context) => ForgotPassword(),
        PASSWORDRESETSCREEN: (context) => Reset(),
        REGISTERSCREEN: (context) => Register(),
        TRIPSSCREEN: (context) => Trips(),
        EMAILREGISTERSCREEN: (context) => VerifyEmailRegister(),
        EMAILRESETSCREEN: (context) => VerifyEmailReset(),
      };
}
