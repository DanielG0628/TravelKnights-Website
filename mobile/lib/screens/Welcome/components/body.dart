import 'package:flutter/material.dart';
import 'package:travelknights/components/rounded_button.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/screens/Register/register.dart';
import 'package:travelknights/screens/Welcome/components/background.dart';
import 'package:flutter_svg/svg.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        SizedBox(height: 70),
        Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text("Travel \n Knights",
              style: TextStyle(fontWeight: FontWeight.bold, fontFamily: 'UCF')),
          Image.asset("assets/images/travelknightslogo.png",
              width: size.width * .1)
        ]),
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
              decoration:
                  const InputDecoration(hintText: 'Enter your password'),
              validator: (String? value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter some text';
                }
                return null;
              }),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            RoundedButton(text: "LOGIN", press: () {}),
            SizedBox(width: 10),
            RoundedButton(
                text: "REGISTER",
                press: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const Register()));
                }),
          ],
        )
      ],
    ));
  }
}
