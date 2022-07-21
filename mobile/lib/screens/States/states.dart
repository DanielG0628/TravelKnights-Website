import 'package:flutter/material.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/routes/routes.dart';

enum Menu { itemOne, itemTwo }

class statesList extends StatefulWidget {
  const statesList({Key? key}) : super(key: key);

  @override
  State<statesList> createState() => _ListState();
}

class _ListState extends State<statesList> {
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
                      Navigator.pushNamed(
                          // Logout API
                          context,
                          '/signin');
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
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
          children: [TextButton(child: Text("Alabama"), onPressed: () {})]),
    );
  }
}
