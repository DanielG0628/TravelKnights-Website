import 'package:flutter/material.dart';
import 'package:travelknights/components/rounded_button.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/routes/routes.dart';
import 'package:travelknights/screens/PasswordReset/passwordReset.dart';
import 'package:travelknights/utils/getAPI.dart';
import 'dart:convert';

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
  String message = "", newMessageText = "";

  var email, name;
  String? password1, password2, userPassword;
  bool validUser = true;
  var nameController = TextEditingController();
  var emailController = TextEditingController();
  var passwordController1 = TextEditingController();
  var passwordController2 = TextEditingController();

  changeText() {
    setState() {
      message = newMessageText;
    }
  }

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
              onChanged: (text) {
                name = text;
              }),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 100),
          child: TextFormField(
              decoration: const InputDecoration(
                  hintText: 'Email', prefixIcon: Icon(Icons.email)),
              validator: validateEmail,
              onChanged: (text) {
                email = text;
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
                  return "Please enter a password";
                }
                if (value != password1) {
                  return "Passwords don't match";
                }
                return null;
              }),
        ),
        RoundedButton(
            text: "REGISTER",
            press: () async {
              UserData.name = nameController.text;
              UserData.email = emailController.text;
              UserData.password = passwordController1.text;
              changeText();

              String payload = '{ "name":"' +
                  UserData.name +
                  '"email":"' +
                  UserData.email.trim() +
                  '","password":"' +
                  UserData.password.trim() +
                  '"}';
              var userId = -1;
              var jsonObject;
              String? emailResult = validateEmail(UserData.email);
              String? nameResult = validateName(UserData.name);
              if (emailResult != null) {
                newMessageText = emailResult;
                changeText();
              } else if (nameResult != null) {
                newMessageText = nameResult;
                changeText();
              } else {
                try {
                  String url = ApiConstants.baseUrl +
                      ApiConstants.usersEndpoint +
                      '/register';
                  String ret = await LoginData.getJson(url, payload);
                  jsonObject = json.decode(ret);
                  userId = jsonObject["id"];
                } catch (e) {
                  newMessageText = e.toString();
                  changeText();
                  return;
                }
                UserData.userId = userId;
                UserData.name = jsonObject["name"];
                UserData.email = jsonObject["email"];
                UserData.password = passwordController1.text;
                Navigator.pushNamed(context, '/emailregister');
              }
              nameController.clear;
              passwordController1.clear;
              passwordController2.clear;
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
    return 'Name must be more than 2 characters';
  else
    return null;
}
