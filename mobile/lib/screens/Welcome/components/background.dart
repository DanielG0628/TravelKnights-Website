import 'package:flutter/material.dart';
import 'package:travelknights/constants.dart';

class Background extends StatelessWidget {
  final Widget child;
  const Background({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      height: size.height,
      width: double.infinity,
      child: Stack(
        alignment: Alignment.center,
        children: <Widget>[
          Positioned(
              top: 20,
              left: 20,
              child: CircleAvatar(
                  backgroundColor: kThirdColor,
                  child: Image.asset(
                    "assets/images/goldengate.png",
                  ),
                  radius: size.width * .15)),
          Positioned(
              bottom: 100,
              right: 0,
              child: Image.asset("assets/images/keywest.png",
                  width: size.width * .3)),
          child
        ],
      ),
    );
  }
}
