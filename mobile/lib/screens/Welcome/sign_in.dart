import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:travelknights/Screens/Welcome/components/body.dart';
import 'package:travelknights/constants.dart';

class SignInScreen extends StatefulWidget {
  const SignInScreen({Key? key}) : super(key: key);
  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  getUserData() async {
    var response = await http
        .get(Uri.parse(ApiConstants.baseUrl + ApiConstants.usersEndpoint));
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
          automaticallyImplyLeading: false,
          backgroundColor: kThirdColor,
          title: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
            Text("Travel \n Knights",
                style:
                    TextStyle(fontWeight: FontWeight.bold, fontFamily: 'UCF')),
            Image.asset("assets/images/travelknightslogo.png",
                width: size.width * .1)
          ])),
      //resizeToAvoidBottomInset: false,
      body: Body(),
    );
  }
}
