import 'dart:async';

import 'package:email_auth/email_auth.dart';
import 'package:flutter/material.dart';
import 'package:pin_code_fields/pin_code_fields.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/main.dart';
import 'package:travelknights/routes/routes.dart';
import 'package:travelknights/constants.dart';

class VerifyEmailRegister extends StatelessWidget {
  const VerifyEmailRegister({Key? key}) : super(key: key);

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
      //resizeToAvoidBottomInset: false,
      body: Body(email: 'test123@gmail.com'),
    );
  }
}

class Body extends StatefulWidget {
  final String? email;
  const Body({
    Key? key,
    this.email,
  }) : super(key: key);

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  TextEditingController pinController = TextEditingController();
  TextEditingController _otpController = TextEditingController();

  String userPassword = "";
  bool hasError = false;
  String currentText = "";
  final formKey = GlobalKey<FormState>();
  EmailAuth emailAuth = new EmailAuth(sessionName: "Sample session");

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  void verify() async {
    var res = emailAuth.validateOtp(
        recipientMail: UserData.email, userOtp: _otpController.text);
    if (res) {
      print("Email verified");
    } else {
      print("Invalid code");
    }
  }

  sendOTP() async {
    var res = await emailAuth.sendOtp(recipientMail: UserData.email);
    if (res) {
      print("OTP Sent");
    } else {
      print("We failed to send the OTP");
    }
  }

  snackBar(String? message) {
    return ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(message!), duration: const Duration(seconds: 2)));
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () {},
        child: SizedBox(
            height: MediaQuery.of(context).size.height / 2,
            width: MediaQuery.of(context).size.width,
            child: ListView(children: <Widget>[
              const SizedBox(height: 30),
              const Padding(
                  padding: EdgeInsets.symmetric(vertical: 8),
                  child: Text(
                    'Email Verification',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 22),
                    textAlign: TextAlign.center,
                  )),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 30.0, vertical: 8),
                child: RichText(
                  text: TextSpan(
                      text: "Enter the code sent to ",
                      children: [
                        TextSpan(
                            text: UserData.email.toString(),
                            style: const TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 15)),
                      ],
                      style:
                          const TextStyle(color: Colors.black54, fontSize: 15)),
                  textAlign: TextAlign.center,
                ),
              ),
              Form(
                key: formKey,
                child: Padding(
                    padding: const EdgeInsets.symmetric(
                        vertical: 8.0, horizontal: 30),
                    child: PinCodeTextField(
                      appContext: context,
                      pastedTextStyle: TextStyle(fontWeight: FontWeight.bold),
                      length: 6,
                      obscureText: true,
                      obscuringCharacter: '*',
                      blinkWhenObscuring: true,
                      animationType: AnimationType.fade,
                      validator: (v) {
                        if (v!.length < 3) {
                          return "Type a valid PIN";
                        }
                        return null;
                      },
                      pinTheme: PinTheme(
                        shape: PinCodeFieldShape.box,
                        borderRadius: BorderRadius.circular(5),
                        fieldHeight: 50,
                        fieldWidth: 40,
                        activeFillColor: Colors.white,
                      ),
                      cursorColor: Colors.black,
                      animationDuration: const Duration(milliseconds: 300),
                      enableActiveFill: true,
                      controller: pinController,
                      keyboardType: TextInputType.number,
                      boxShadows: const [
                        BoxShadow(
                            offset: Offset(0, 1),
                            color: Colors.black12,
                            blurRadius: 10)
                      ],
                      onCompleted: (v) {
                        debugPrint("Completed");
                      },
                      onTap: () {
                        print("Pressed");
                      },
                      onChanged: (value) {
                        debugPrint(value);
                        setState(() {
                          currentText = value;
                        });
                      },
                      beforeTextPaste: (text) {
                        debugPrint("Allow to paste $text");
                        return true;
                      },
                    )),
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 30.0),
                child: Text(
                  hasError ? "*Please fill up all the cells properly" : "",
                  style: const TextStyle(
                      color: Colors.red,
                      fontSize: 12,
                      fontWeight: FontWeight.w400),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Didn't receive the code? ",
                      style: TextStyle(color: Colors.black54, fontSize: 15)),
                  TextButton(
                    onPressed: () {
                      //Resend email
                    },
                    child: const Text("RESEND",
                        style: TextStyle(
                            color: Color(0xFF91D3B3),
                            fontWeight: FontWeight.bold,
                            fontSize: 16)),
                  )
                ],
              ),
              Container(
                margin:
                    const EdgeInsets.symmetric(vertical: 16.0, horizontal: 8.0),
                child: ButtonTheme(
                  height: 50,
                  child: TextButton(
                    onPressed: () {
                      verify();
                    },
                    child: Center(
                        child: Text(
                      "VERIFY".toUpperCase(),
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold),
                    )),
                  ),
                ),
                decoration: BoxDecoration(
                    color: kPrimaryColor,
                    borderRadius: BorderRadius.circular(5),
                    boxShadow: [
                      BoxShadow(
                          color: Colors.green.shade200,
                          offset: const Offset(1, -2),
                          blurRadius: 5)
                    ]),
              ),
            ])));
  }
}
