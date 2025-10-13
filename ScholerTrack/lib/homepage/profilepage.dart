import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ProfilePage extends StatefulWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;
  final String token; // ✅ Pass token from LoginPage

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
      final url = Uri.parse("https://scholar-zceo.onrender.com/api/user/getme");
      final response = await http.get(url, headers: {
        "Authorization": "Bearer ${widget.token}",
        "Content-Type": "application/json",
      });

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          userData = data;
          isLoading = false;
        });
      } else {
        setState(() {
          errorMessage = "Failed to load user data";
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
      appBar: AppBar(
        backgroundColor: Colors.blue.shade700,
        title: Text(widget.translate("profile")),
        centerTitle: true,
        actions: [
          IconButton(
            icon: Icon(Icons.language),
            onPressed: widget.onLanguageChange,
          ),
        ],
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : errorMessage != null
          ? Center(child: Text(errorMessage!, style: TextStyle(color: Colors.red)))
          : userData == null
          ? Center(child: Text("No user data found"))
          : SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Card(
          elevation: 8,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: CircleAvatar(
                    radius: 50,
                    backgroundColor: Colors.blue.shade100,
                    child: Icon(Icons.person,
                        size: 60, color: Colors.blue.shade700),
                  ),
                ),
                SizedBox(height: 20),
                Center(
                  child: Text(
                    userData!['fullname'] ?? "Unknown",
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Colors.blue.shade700,
                    ),
                  ),
                ),
                SizedBox(height: 30),
                _infoRow(widget.translate("email"), userData!['email']),
                _infoRow(widget.translate("phone"), "${userData!['phoneNumber']}"),
                _infoRow(widget.translate("gender"), userData!['gender']),
                _infoRow(widget.translate("caste"), userData!['caste']),
                _infoRow(widget.translate("marks"), "${userData!['percentage']}%"),
                _infoRow(widget.translate("institution"), userData!['institution']),
                _infoRow(widget.translate("category"), userData!['category']),
                _infoRow(widget.translate("education"), userData!['lasteducation']),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _infoRow(String title, String? value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0),
      child: Row(
        children: [
          Icon(Icons.label, color: Colors.blue.shade700, size: 20),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              "$title: ${value ?? 'N/A'}",
              style: TextStyle(fontSize: 16),
            ),
          ),
        ],
      ),
    );
  }
}
