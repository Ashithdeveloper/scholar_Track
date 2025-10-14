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
      backgroundColor: Colors.grey.shade100,
      body: isLoading
          ? Center(child: CircularProgressIndicator(color: Colors.grey.shade800))
          : errorMessage != null
          ? Center(
          child: Text(
            errorMessage!,
            style: TextStyle(color: Colors.red.shade700, fontSize: 16),
          ))
          : userData == null
          ? Center(
          child: Text(
            "No user data found",
            style: TextStyle(color: Colors.grey.shade800),
          ))
          : SingleChildScrollView(
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 40),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Heading
            Text(
              "Profile",
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.grey.shade900,
                letterSpacing: 0.5,
              ),
            ),
            SizedBox(height: 10),
            Divider(color: Colors.grey.shade400, thickness: 1),
            SizedBox(height: 30),
            // Avatar with premium shadow
            Container(
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(
                  colors: [Colors.grey.shade700, Colors.grey.shade300],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.shade400.withOpacity(0.6),
                    blurRadius: 12,
                    offset: Offset(0, 6),
                  ),
                ],
              ),
              child: CircleAvatar(
                radius: 60,
                backgroundColor: Colors.grey.shade100,
                child: Icon(Icons.person, size: 80, color: Colors.grey.shade800),
              ),
            ),
            SizedBox(height: 40),
            // Info Cards
            Wrap(
              spacing: 16,
              runSpacing: 16,
              children: [
                _infoCard(Icons.person, "Full Name", userData!['fullname']),
                _infoCard(Icons.email, "Email", userData!['email']),
                _infoCard(Icons.phone, "Phone", "${userData!['phoneNumber']}"),
                _infoCard(Icons.transgender, "Gender", userData!['gender']),
                _infoCard(Icons.group, "Caste", userData!['caste']),
                _infoCard(Icons.grade, "Marks", "${userData!['percentage']}%"),
                _infoCard(Icons.school, "Institution", userData!['institution']),
                _infoCard(Icons.category, "Category", userData!['category']),
                _infoCard(Icons.menu_book, "Education", userData!['lasteducation']),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _infoCard(IconData icon, String title, String? value) {
    return Container(
      width: (MediaQuery.of(context).size.width - 72) / 2,
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.shade300,
            blurRadius: 12,
            offset: Offset(0, 6),
          ),
          BoxShadow(
            color: Colors.grey.shade50,
            blurRadius: 6,
            offset: Offset(-2, -2),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: Colors.grey.shade800, size: 28),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade900,
                        fontSize: 14)),
                SizedBox(height: 6),
                Text(value ?? 'N/A',
                    style: TextStyle(fontSize: 16, color: Colors.grey.shade700)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
