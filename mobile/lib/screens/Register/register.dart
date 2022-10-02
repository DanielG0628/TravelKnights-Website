import 'package:flutter/material.dart';
import 'package:travelknights/components/rounded_button.dart';
import 'package:travelknights/constants.dart';

class Register extends StatelessWidget {
  const Register({Key? key}) : super(key: key);

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
        Text('Create an Account', style: TextStyle(fontSize: 20)),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 100),
          child: TextFormField(
            decoration: const InputDecoration(
                hintText: 'Full Name', prefixIcon: Icon(Icons.person)),
            validator: validateName,
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 100),
          child: TextFormField(
            decoration: const InputDecoration(
                hintText: 'Email', prefixIcon: Icon(Icons.email)),
            validator: validateEmail,
          ),
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
              password1 = value;
              if (value == null || value.isEmpty) {
                validUser = false;
                return 'Please enter some text';
              }
              if (value.length < 8) {
                validUser = false;
                return 'Password must be at least 8 characters';
              }
              return null;
            },
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 100),
          child: TextFormField(
            obscureText: _isObscure,
            decoration: InputDecoration(
                hintText: 'Confirm password',
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
                return 'Please enter a valid password';
              }
              if (value.length < 8) {
                return 'Password must be at least 8 characters long';
              }
              if (password1 != value) {
                return "Passwords must be the same length";
              }
              return null;
            },
          ),
        ),
        RoundedButton(
            text: "REGISTER",
            press: () {
              Navigator.pop(context);
            })
      ],
    ));
  }
}

String? validateEmail(String? value) {
  if (value == null || value.length == 0) {
    return 'Please enter an Email';
  }
  String pattern =
      r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
  RegExp regex = new RegExp(pattern);
  if (!regex.hasMatch(value))
    return 'Enter Valid Email';
  else
    return null;
}

String? validateName(String? value) {
  if (value == null || value.length == 0) {
    return 'Please enter a Name';
  }
  if (value.length < 3)
    return 'Name must be more than 2 charater';
  else
    return null;
}
