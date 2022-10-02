import 'package:flutter/material.dart';
import 'package:travelknights/components/rounded_button.dart';

class ForgotPassword extends StatelessWidget {
  const ForgotPassword({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
          title: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text("Travel \n Knights",
            style: TextStyle(fontWeight: FontWeight.bold, fontFamily: 'UCF')),
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
  String? email;
  final myController = TextEditingController();
  @override
  void dispose() {
    myController.dispose;
    super.dispose;
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text('Forgot Password?', style: TextStyle(fontSize: 20)),
          Text('Please enter email assoaciated with your account',
              style: TextStyle(fontSize: 10)),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 100),
            child: TextFormField(
              controller: myController,
              decoration: const InputDecoration(
                  hintText: 'Email address', prefixIcon: Icon(Icons.email)),
              validator: validateEmail,
            ),
          ),
          TextButton(child: Text("Resend email"), onPressed: () {}),
          RoundedButton(text: 'SEND EMAIL', press: () {}),
        ],
      ),
    );
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
