import 'package:flutter/material.dart';
import 'package:travelknights/constants.dart';

class RoundedButton extends StatelessWidget {
  final String? text;
  final VoidCallback? press;
  final Color color, textColor;
  const RoundedButton({
    Key? key,
    this.text,
    this.press,
    this.color = kThirdColor,
    this.textColor = Colors.white,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          primary: color,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(18.0)),
          padding: EdgeInsets.symmetric(vertical: 7.5, horizontal: 12.5),
        ),
        onPressed: press,
        child: (Text(text!, style: TextStyle(color: textColor))),
      ),
    );
  }
}
