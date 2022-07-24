import 'package:flutter/material.dart';
import 'package:flutter_pw_validator/flutter_pw_validator.dart';
import 'package:travelknights/components/rounded_button.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/routes/routes.dart';

class Reset extends StatelessWidget {
  const Reset({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
          backgroundColor: kThirdColor,
          title: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
            Text("Travel \n Knights",
                style:
                    TextStyle(fontWeight: FontWeight.bold, fontFamily: 'UCF')),
            Image.asset("assets/images/travelknightslogo.png",
                width: size.width * .1)
          ])),
      body: Center(child: Body()),
    );
  }
}

class Body extends StatefulWidget {
  const Body({Key? key}) : super(key: key);

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  bool _isObscure = true;
  TextEditingController _passwordController1 = TextEditingController();
  TextEditingController _passwordController2 = TextEditingController();
  var email;
  String? password1, password2;
  bool validUser = true;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SingleChildScrollView(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text('Reset password', style: TextStyle(fontWeight: FontWeight.bold)),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 100),
          child: TextFormField(
            controller: _passwordController1,
            obscureText: _isObscure,
            onChanged: (value) {
              password1 = value;
            },
            decoration: InputDecoration(
                hintText: 'Enter new password',
                suffixIcon: IconButton(
                    icon: Icon(
                      size: 20,
                      _isObscure ? Icons.visibility : Icons.visibility_off,
                    ),
                    onPressed: () {
                      setState(() {
                        _isObscure = !_isObscure;
                      });
                    })),
          ),
        ),
        FlutterPwValidator(
            width: 215,
            height: 100,
            minLength: 8,
            uppercaseCharCount: 1,
            numericCharCount: 1,
            specialCharCount: 1,
            onSuccess: () {},
            controller: _passwordController1),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 100),
          child: TextFormField(
              obscureText: _isObscure,
              decoration: InputDecoration(
                  hintText: 'Confirm password',
                  suffixIcon: IconButton(
                      icon: Icon(
                        size: 15,
                        _isObscure ? Icons.visibility : Icons.visibility_off,
                      ),
                      onPressed: () {
                        setState(() {
                          _isObscure = !_isObscure;
                        });
                      })),
              controller: _passwordController2,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return "Please enter a password";
                }
                if (value != password1) {
                  return "Passwords don't match";
                }
              }),
        ),
        RoundedButton(
            text: "RESET PASSWORD",
            press: () {
              // Change password
              Navigator.pushReplacementNamed(context, '/');
            })
      ],
    ));
  }
}

String? validatePassword(String? value) {
  if (value == null || value.isEmpty) {
    return 'Please enter a valid password';
  }
  if (value.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return null;
}
