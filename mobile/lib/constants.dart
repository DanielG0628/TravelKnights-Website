import 'package:flutter/material.dart';

const kPrimaryColor = Color(0xFF433633);
const kSecondColor = Color(0xFFF8F4E3);
const kThirdColor = Color(0xFF65743A);

class ApiConstants {
  static String baseUrl = 'https://travelknights.herokuapp.com';
  static String usersEndpoint = '/api';
}

class UserData {
  static int userId = -1;
  static String name = "", email = "", password = "";
}

const MONGO_CONN_URL =
    "mongodb+srv://Noah:Dexter@cluster0.ukckn.mongodb.net/travelknights?retryWrites=true&w=majority";
const USER_COLLECTION = "users";
