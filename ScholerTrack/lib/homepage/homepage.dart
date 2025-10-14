import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'notificationpage.dart';
import 'scholardetailpage.dart';

class HomePage extends StatefulWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;
  final String token;

  const HomePage({
    Key? key,
    required this.language,
    required this.onLanguageChange,
    required this.translate,
    required this.token,
  }) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  static List<Map<String, dynamic>> _cachedScholarships = [];
  static bool _hasLoaded = false;

  final List<String> categories = [
    "Government",
    "Private",
    "Corporate",
    "International",
    "Merit Based",
    "Sports Based"
  ];

  String selectedCategory = "Government";
  List<Map<String, dynamic>> scholarships = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    if (_hasLoaded && _cachedScholarships.isNotEmpty) {
      setState(() {
        scholarships = _cachedScholarships;
        isLoading = false;
      });
    } else {
      fetchScholarships();
    }
  }

  Future<void> fetchScholarships() async {
    final url = Uri.parse("https://scholar-zceo.onrender.com/api/scholarship/");
    try {
      final response = await http.get(
        url,
        headers: {
          "Authorization": "Bearer ${widget.token}",
          "Content-Type": "application/json"
        },
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['success'] == true && data['scholarships'] != null) {
          setState(() {
            scholarships = List<Map<String, dynamic>>.from(data['scholarships']);
            _cachedScholarships = scholarships;
            _hasLoaded = true;
            isLoading = false;
          });
        } else {
          setState(() => isLoading = false);
        }
      } else {
        setState(() => isLoading = false);
      }
    } catch (e) {
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Left: Education icon + App name
                  Row(
                    children: [
                      Icon(Icons.school_rounded, color: Colors.black87, size: 30),
                      const SizedBox(width: 8),
                      Text(
                        widget.translate("appName"),
                        style: const TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                    ],
                  ),

                  // Right: Language button + Notification icon
                  Row(
                    children: [
                      ElevatedButton(
                        onPressed: widget.onLanguageChange,
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.black87,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12))),
                        child: Text(widget.language,
                            style: const TextStyle(color: Colors.white)),
                      ),
                      const SizedBox(width: 12),
                      IconButton(
                        icon: const Icon(Icons.notifications_rounded),
                        color: Colors.black87,
                        onPressed: () {
                          // Navigate to Notifications Page
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => NotificationsPage(
                                language: widget.language,
                                onLanguageChange: widget.onLanguageChange,
                                translate: widget.translate,
                              ),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),


            // Category Tabs
            Container(
              height: 50,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: categories.length,
                itemBuilder: (context, index) {
                  final category = categories[index];
                  final isSelected = category == selectedCategory;

                  return GestureDetector(
                    onTap: () => setState(() => selectedCategory = category),
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      margin: EdgeInsets.symmetric(horizontal: 8),
                      decoration: BoxDecoration(
                        color: isSelected ? Colors.black87 : Colors.grey.shade300,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                            color: isSelected ? Colors.black87 : Colors.grey.shade400),
                      ),
                      child: Center(
                        child: Text(widget.translate(category),
                            style: TextStyle(
                                color: isSelected ? Colors.white : Colors.black87,
                                fontWeight: FontWeight.bold)),
                      ),
                    ),
                  );
                },
              ),
            ),

            SizedBox(height: 16),

            // Scholarships List
            Expanded(
              child: isLoading
                  ? Center(child: CircularProgressIndicator())
                  : scholarships.isEmpty
                  ? Center(child: Text("No scholarships available", style: TextStyle(color: Colors.grey.shade700)))
                  : ListView.builder(
                padding: EdgeInsets.symmetric(horizontal: 16),
                itemCount: scholarships.length,
                itemBuilder: (context, index) {
                  final s = scholarships[index];

                  String provider =
                      s['providerName']?.toString().trim() ??
                          s['providerName ']?.toString().trim() ??
                          s['provider']?.toString().trim() ??
                          'Unknown';

                  String sector =
                      s['provider_sector']?.toString().trim() ??
                          s['provider_sector ']?.toString().trim() ??
                          s['providerSector']?.toString().trim() ??
                          'N/A';

                  return Card(
                    margin: EdgeInsets.only(bottom: 16),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                    elevation: 2,
                    color: Colors.white,
                    child: Padding(
                      padding: EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            s['scholarship_name'] ?? "No Name",
                            style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Colors.black87),
                          ),
                          SizedBox(height: 8),
                          Text("Provider: $provider",
                              style: TextStyle(color: Colors.grey.shade800)),
                          Text("Provider Sector: $sector",
                              style: TextStyle(color: Colors.grey.shade800)),
                          Text("Prize: ${s['scholar_prize'] ?? 'N/A'}",
                              style: TextStyle(color: Colors.grey.shade800)),
                          Text("Deadline: ${s['deadline'] ?? 'N/A'}",
                              style: TextStyle(color: Colors.grey.shade800)),
                          SizedBox(height: 12),
                          Align(
                            alignment: Alignment.centerRight,
                            child: ElevatedButton(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (_) =>
                                        ScholarshipDetailPage(scholarship: s),
                                  ),
                                );
                              },
                              style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.black87),
                              child: const Text("View Details",
                                  style: TextStyle(color: Colors.white)),
                            ),
                          )
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
