import 'package:flutter/material.dart';
import 'package:travelknights/routes/routes.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/screens/Welcome/sign_in.dart';

enum Menu { itemOne, itemTwo }

class Trips extends StatefulWidget {
  const Trips({Key? key, required this.state}) : super(key: key);
  final String state;

  @override
  State<Trips> createState() => _TripsState();
}

class _TripsState extends State<Trips> {
  String _selectedMenu = '';
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
          backgroundColor: kThirdColor,
          actions: <Widget>[
            PopupMenuButton(
                onSelected: (Menu item) {
                  setState(() {
                    _selectedMenu = item.name;
                    if (_selectedMenu == "itemTwo") {
                      Navigator.pushReplacementNamed(
                          // Logout API
                          context,
                          '/SignIn');
                    }
                  });
                },
                itemBuilder: (BuildContext context) => <PopupMenuEntry<Menu>>[
                      const PopupMenuItem<Menu>(
                        value: Menu.itemOne,
                        child: Text('Settings'),
                      ),
                      const PopupMenuItem<Menu>(
                        value: Menu.itemTwo,
                        child: Text('Sign Out'),
                      ),
                    ])
          ],
          title: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
            Text("Travel \n Knights",
                style:
                    TextStyle(fontWeight: FontWeight.bold, fontFamily: 'UCF')),
            Image.asset("assets/images/travelknightslogo.png",
                width: size.width * .1)
          ])),
      body: Text(widget.state),
    );
  }
}

class Body extends StatefulWidget {
  final String state;
  const Body({Key? key, required this.state}) : super(key: key);

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[Text(widget.state)],
    );
  }
}
