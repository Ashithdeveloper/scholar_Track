import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
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
    fetchScholarships();
  }

  Future<void> fetchScholarships() async {
    final url = Uri.parse("https://scholar-zceo.onrender.com/api/scholarship/");
    try {
      final response = await http.get(
        url,
        headers: {"Authorization": "Bearer ${widget.token}", "Content-Type": "application/json"},
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['success'] == true && data['scholarships'] != null) {
          setState(() {
            scholarships = List<Map<String, dynamic>>.from(data['scholarships']);
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
      backgroundColor: Colors.blue.shade50,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(widget.translate("appName"),
                      style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.blue.shade700)),
                  ElevatedButton(
                    onPressed: widget.onLanguageChange,
                    style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue.shade600,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                    child: Text(widget.language),
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
                        color: isSelected ? Colors.blue.shade600 : Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.blue.shade200),
                      ),
                      child: Center(
                        child: Text(widget.translate(category),
                            style: TextStyle(color: isSelected ? Colors.white : Colors.blue.shade700, fontWeight: FontWeight.bold)),
                      ),
                    ),
                  );
                },
              ),
            ),

            SizedBox(height: 16),

            Expanded(
              child: isLoading
                  ? Center(child: CircularProgressIndicator())
                  : scholarships.isEmpty
                  ? Center(child: Text("No scholarships available"))
                  : ListView.builder(
                padding: EdgeInsets.symmetric(horizontal: 16),
                itemCount: scholarships.length,
                itemBuilder: (context, index) {
                  final s = scholarships[index];

                  String provider = s['providerName']?.toString().trim() ??
                      s['providerName ']?.toString().trim() ??
                      s['provider']?.toString().trim() ??
                      'Unknown';

                  // Handle provider sector safely
                  String sector = s['provider_sector']?.toString().trim() ??
                      s['provider_sector ']?.toString().trim() ??
                      s['providerSector']?.toString().trim() ??
                      'N/A';

                  return Card(
                    margin: EdgeInsets.only(bottom: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    elevation: 6,
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
                                color: Colors.blue.shade700),
                          ),
                          SizedBox(height: 8),
                          Text("Provider: $provider"),
                          Text("Provider Sector: $sector"),
                          Text("Prize: ${s['scholar_prize'] ?? 'N/A'}"),
                          Text("Deadline: ${s['deadline'] ?? 'N/A'}"),
                          SizedBox(height: 12),
                          Align(
                            alignment: Alignment.centerRight,
                            child: ElevatedButton(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (_) => ScholarshipDetailPage(scholarship: s),
                                  ),
                                );
                              },
                              child: Text("View Details"),
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
