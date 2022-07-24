import 'package:flutter/material.dart';
import 'package:travelknights/components/rounded_button.dart';
import 'package:travelknights/constants.dart';
import 'package:travelknights/routes/routes.dart';
import 'package:travelknights/screens/Trips/trips.dart';
import 'package:syncfusion_flutter_maps/maps.dart';

enum Menu { itemOne, itemTwo }

class statesList extends StatefulWidget {
  const statesList({Key? key}) : super(key: key);

  @override
  State<statesList> createState() => _ListState();
}

class _ListState extends State<statesList> {
  String _selectedMenu = '';
  late MapShapeSource _mapSource;
  late List<MapModel> _mapData;
  int selectedIndex = 1;
  void initState() {
    super.initState();
    _mapData = _getMapData();
    _mapSource = MapShapeSource.asset(
      'assets/biggerusmap.json',
      shapeDataField: 'name',
      dataCount: _mapData.length,
      primaryValueMapper: (int index) => _mapData[index].state,
      //dataLabelMapper: null,
      shapeColorValueMapper: (int index) => _mapData[index].color,
    );
    String state = _mapData[selectedIndex].state;
    debugPrint("Selected state: $state");
  }

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
                        UserData.name = "";
                        UserData.email = "";
                        UserData.password = "";
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
                  style: TextStyle(
                      fontWeight: FontWeight.bold, fontFamily: 'UCF')),
              Image.asset("assets/images/travelknightslogo.png",
                  width: size.width * .1)
            ])),
        body: Column(children: <Widget>[
          Padding(
              padding: EdgeInsets.fromLTRB(0, 50, 0, 0),
              child: Text('Select a state')),
          Center(
            child: InteractiveViewer(
              child: SfMaps(layers: [
                MapShapeLayer(
                  source: _mapSource,
                  selectedIndex: selectedIndex,
                  onSelectionChanged: (int index) {
                    setState(() {
                      selectedIndex = index;
                    });
                  },
                )
              ]),
              boundaryMargin: EdgeInsets.all(60),
              minScale: 0.5,
              maxScale: 4,
            ),
          ),
          RoundedButton(
              text: "View Trips",
              press: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) =>
                            Trips(state: _mapData[selectedIndex].state)));
              }),
        ]));
  }

  static List<MapModel> _getMapData() {
    return <MapModel>[
      MapModel("Alabama", "AL", kThirdColor),
      MapModel("Alaska", 'AK', kThirdColor),
      MapModel("Arizona", 'AZ', kThirdColor),
      MapModel("Arkansas", 'AR', kThirdColor),
      MapModel("California", 'CA', kThirdColor),
      MapModel("Colorado", 'CO', kThirdColor),
      MapModel("Connecticut", 'CT', kThirdColor),
      MapModel("Delaware", 'DE', kThirdColor),
      MapModel("District of Columbia", 'DC', kThirdColor),
      MapModel("Florida", 'FL', kThirdColor),
      MapModel("Georgia", 'GA', kThirdColor),
      MapModel("Hawaii", 'HI', kThirdColor),
      MapModel("Idaho", 'ID', kThirdColor),
      MapModel("Illinois", 'IL', kThirdColor),
      MapModel("Indiana", 'IN', kThirdColor),
      MapModel("Iowa", 'IA', kThirdColor),
      MapModel("Kansas", 'KS', kThirdColor),
      MapModel("Kentucky", 'KY', kThirdColor),
      MapModel("Louisiana", 'LA', kThirdColor),
      MapModel("Maine", 'ME', kThirdColor),
      MapModel("Maryland", 'MD', kThirdColor),
      MapModel("Massachusetts", 'MA', kThirdColor),
      MapModel("Michigan", 'MD', kThirdColor),
      MapModel("Minnesota", 'MN', kThirdColor),
      MapModel("Mississippi", 'MS', kThirdColor),
      MapModel("Missouri", 'MO', kThirdColor),
      MapModel("Montana", 'MT', kThirdColor),
      MapModel("Nebraska", 'NE', kThirdColor),
      MapModel("Nevada", 'NV', kThirdColor),
      MapModel("New Hampshire", 'NH', kThirdColor),
      MapModel("New Jersey", 'NJ', kThirdColor),
      MapModel("New Mexico", 'NM', kThirdColor),
      MapModel("New York", 'NY', kThirdColor),
      MapModel("North Carolina", 'NC', kThirdColor),
      MapModel("North Dakota", 'ND', kThirdColor),
      MapModel("Ohio", 'AK', kThirdColor),
      MapModel("Oklahoma", 'OK', kThirdColor),
      MapModel("Oregon", 'OR', kThirdColor),
      MapModel("Pennsylvania", 'PA', kThirdColor),
      MapModel("Puerto Rico", 'PR', kThirdColor),
      MapModel("Rhode Island", 'RI', kThirdColor),
      MapModel("South Carolina", 'SC', kThirdColor),
      MapModel("South Dakota", 'SD', kThirdColor),
      MapModel("Tennessee", 'TN', kThirdColor),
      MapModel("Texas", 'TX', kThirdColor),
      MapModel("Utah", 'UT', kThirdColor),
      MapModel("Vermont", 'VT', kThirdColor),
      MapModel("Virginia", 'VA', kThirdColor),
      MapModel("Washington", 'WA', kThirdColor),
      MapModel("West Virginia", 'WV', kThirdColor),
      MapModel("Wisconsin", 'WI', kThirdColor),
      MapModel("Wyoming", 'WY', kThirdColor),
    ];
  }
}

/*class Body extends StatefulWidget {
  const Body({Key? key}) : super(key: key);

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  late MapShapeSource _mapSource;

  List<String> states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: states.length,
      itemBuilder: (context, int index) {
        return new GestureDetector(onTap: () {
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => Trips(state: states[index])));
        });
      },
    );
  }
}
*/

class MapModel {
  MapModel(this.state, this.stateCode, this.color);
  final String state;
  final String stateCode;
  final Color color;
}
