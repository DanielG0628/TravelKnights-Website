import 'package:flutter/material.dart';
import 'package:travelknights/components/rounded_button.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/screens/Register/register.dart';
import 'package:travelknights/screens/Welcome/components/background.dart';
import 'package:travelknights/screens/ForgotPassword/forgotPassword.dart';

class Body extends StatefulWidget {
  const Body({Key? key}) : super(key: key);

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  bool _isObscure = true;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SingleChildScrollView(
      child: Background(
          child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text('SIGN IN', style: TextStyle(fontSize: 20)),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 100),
            child: TextFormField(
                decoration: const InputDecoration(hintText: 'Enter your email'),
                validator: (String? value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter some text';
                  }
                  return null;
                }),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 100),
            child: TextFormField(
              obscureText: _isObscure,
              decoration: InputDecoration(
                  hintText: 'Enter your password',
                  suffixIcon: IconButton(
                      icon: Icon(
                        _isObscure ? Icons.visibility : Icons.visibility_off,
                      ),
                      onPressed: () {
                        setState(() {
                          _isObscure = !_isObscure;
                        });
                      })),
              validator: (String? value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter some text';
                }
                return null;
              },
            ),
          ),
          SizedBox(
            height: 30,
            width: 225,
            child: TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const ForgotPassword()),
                  );
                },
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                    'Forgot Password?',
                    style: TextStyle(color: Colors.black, fontSize: 10),
                  ),
                )),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              RoundedButton(
                  text: "REGISTER",
                  press: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const Register()));
                  }),
              SizedBox(width: 10),
              RoundedButton(text: "LOGIN", press: () {}),
            ],
          )
        ],
      )),
    );
  }
}
