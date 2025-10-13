import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ProfilePage extends StatefulWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;
  final String token;

  ProfilePage({
    Key? key,
    required this.language,
    required this.onLanguageChange,
    required this.translate,
    required this.token,
  }) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  Map<String, dynamic>? userData;
  bool isLoading = true;
  String? errorMessage;

  @override
  void initState() {
    super.initState();
    fetchUserData();
  }

  Future<void> fetchUserData() async {
    try {
      if (widget.token.isEmpty) {
        setState(() {
          errorMessage = "Token is missing. Please login again.";
          isLoading = false;
        });
        return;
      }

      final url = Uri.parse("https://scholar-zceo.onrender.com/api/user/getme");
      final response = await http.get(url, headers: {
        "Authorization": "Bearer ${widget.token}",
        "Content-Type": "application/json",
      });

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          userData = data['user'];
          isLoading = false;
        });
      } else {
        setState(() {
          errorMessage = "Failed to load user data: ${response.body}";
          isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        errorMessage = "Error: $e";
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue.shade50,
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : errorMessage != null
          ? Center(
          child: Text(
            errorMessage!,
            style: TextStyle(color: Colors.red, fontSize: 16),
          ))
          : userData == null
          ? Center(child: Text("No user data found"))
          : SingleChildScrollView(
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 40),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Profile Heading
            Text(
              "Profile",
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.blue.shade700,
              ),
            ),
            SizedBox(height: 20),
            // Profile Avatar
            Center(
              child: CircleAvatar(
                radius: 60,
                backgroundColor: Colors.blue.shade100,
                child: Icon(
                    Icons.person, size: 80, color: Colors.blue.shade700),
              ),
            ),
            SizedBox(height: 30),
            // Details Card
            Card(
              elevation: 8,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    double spacing = 12; // space between cards
                    double width = (constraints.maxWidth - spacing) /
                        2; // 2 per row
                    return Wrap(
                      spacing: spacing,
                      runSpacing: spacing,
                      children: [
                        _infoCard(
                            widget.translate("fullname"), userData!['fullname'],
                            width),
                        _infoCard(widget.translate("email"), userData!['email'],
                            width),
                        _infoCard(widget.translate("phone"),
                            "${userData!['phoneNumber']}", width),
                        _infoCard(
                            widget.translate("gender"), userData!['gender'],
                            width),
                        _infoCard(widget.translate("caste"), userData!['caste'],
                            width),
                        _infoCard(widget.translate("marks"),
                            "${userData!['percentage']}%", width),
                        _infoCard(widget.translate("institution"),
                            userData!['institution'], width),
                        _infoCard(
                            widget.translate("category"), userData!['category'],
                            width),
                        _infoCard(widget.translate("education"),
                            userData!['lasteducation'], width),
                      ],
                    );
                  },
                ),
              ),
            ),

          ],
        ),
      ),
    );
  }

  Widget _infoCard(String title, String? value, double width) {
    return Container(
      width: width,
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.blue.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.blue.shade100),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.blue.shade700,
              )),
          SizedBox(height: 6),
          Text(value ?? 'N/A', style: TextStyle(fontSize: 16)),
        ],
      ),
    );
  }
}