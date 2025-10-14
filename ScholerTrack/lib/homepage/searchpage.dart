import 'package:flutter/material.dart';

class SearchPage extends StatefulWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;
  final List<Map<String, dynamic>> scholarships; // Pass fetched scholarships

  const SearchPage({
    Key? key,
    required this.language,
    required this.onLanguageChange,
    required this.translate,
    required this.scholarships,
  }) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  TextEditingController _searchController = TextEditingController();
  List<Map<String, dynamic>> _filteredScholarships = [];

  @override
  void initState() {
    super.initState();
    _filteredScholarships = widget.scholarships;
    _searchController.addListener(_onSearchChanged);
  }

  void _onSearchChanged() {
    String query = _searchController.text.toLowerCase();
    setState(() {
      if (query.isEmpty) {
        _filteredScholarships = widget.scholarships;
      } else {
        _filteredScholarships = widget.scholarships.where((s) {
          final name = s['scholarship_name']?.toString().toLowerCase() ?? '';
          final provider = s['providerName']?.toString().toLowerCase() ?? '';
          return name.contains(query) || provider.contains(query);
        }).toList();
      }
    });
  }

  @override
  void dispose() {
    _searchController.removeListener(_onSearchChanged);
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Example student portals
    final List<Map<String, String>> studentPortals = [
      {"name": "Scholarship Portal", "url": "#"},
      {"name": "University Admissions", "url": "#"},
      {"name": "Internships", "url": "#"},
      {"name": "Exam Prep", "url": "#"},
    ];

    // Example recommended scholarships (top 3)
    final List<Map<String, dynamic>> recommended =
    widget.scholarships.take(3).toList();

    return Scaffold(
      backgroundColor: Colors.grey.shade200,
      body: SafeArea(
        child: Column(
          children: [
            // Top search bar
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _searchController,
                      style: TextStyle(color: Colors.black87),
                      decoration: InputDecoration(
                        hintText: widget.translate("search_scholarships"),
                        hintStyle: TextStyle(color: Colors.grey.shade600),
                        prefixIcon: Icon(Icons.search, color: Colors.grey.shade800),
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none,
                        ),
                        contentPadding: EdgeInsets.symmetric(vertical: 0, horizontal: 16),
                      ),
                    ),
                  ),
                  SizedBox(width: 8),
                  ElevatedButton(
                    onPressed: widget.onLanguageChange,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.black87,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    ),
                    child: Text(
                      widget.language,
                      style: TextStyle(color: Colors.white),
                    ),
                  )
                ],
              ),
            ),

            // Recommendations
            if (recommended.isNotEmpty) ...[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    widget.translate("recommendations"),
                    style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade800),
                  ),
                ),
              ),
              Container(
                height: 150,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  itemCount: recommended.length,
                  itemBuilder: (context, index) {
                    final s = recommended[index];
                    String provider = s['providerName'] ?? s['provider'] ?? "Unknown";
                    return Container(
                      width: 250,
                      margin: EdgeInsets.only(right: 12),
                      padding: EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: Colors.grey.shade300),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            s['scholarship_name'] ?? "No Name",
                            style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                                color: Colors.black87),
                          ),
                          SizedBox(height: 8),
                          Text(
                            "Provider: $provider",
                            style: TextStyle(color: Colors.grey.shade700),
                          ),
                          Spacer(),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.black87,
                              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8)),
                            ),
                            onPressed: () {
                              // Navigate to details if needed
                            },
                            child: Text("View", style: TextStyle(color: Colors.white)),
                          )
                        ],
                      ),
                    );
                  },
                ),
              ),
            ],

            // Student Portals
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  widget.translate("student_portals"),
                  style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.grey.shade800),
                ),
              ),
            ),
            Container(
              height: 100,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: EdgeInsets.symmetric(horizontal: 16),
                itemCount: studentPortals.length,
                itemBuilder: (context, index) {
                  final portal = studentPortals[index];
                  return Container(
                    width: 180,
                    margin: EdgeInsets.only(right: 12),
                    padding: EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: Colors.grey.shade300),
                    ),
                    child: Center(
                      child: Text(
                        portal['name'] ?? "",
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.black87, fontWeight: FontWeight.bold),
                      ),
                    ),
                  );
                },
              ),
            ),

            SizedBox(height: 12),

            // Suggestions list
            Expanded(
              child: _filteredScholarships.isEmpty
                  ? Center(
                child: Text(
                  widget.translate("no_results_found"),
                  style: TextStyle(color: Colors.grey.shade700),
                ),
              )
                  : ListView.builder(
                padding: EdgeInsets.symmetric(horizontal: 16),
                itemCount: _filteredScholarships.length,
                itemBuilder: (context, index) {
                  final s = _filteredScholarships[index];
                  String provider =
                      s['providerName'] ?? s['provider'] ?? "Unknown";
                  String sector =
                      s['provider_sector'] ?? s['providerSector'] ?? "N/A";
                  return Card(
                    color: Colors.white,
                    margin: EdgeInsets.only(bottom: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 2,
                    child: ListTile(
                      title: Text(
                        s['scholarship_name'] ?? "No Name",
                        style: TextStyle(color: Colors.black87),
                      ),
                      subtitle: Text(
                        "Provider: $provider | Sector: $sector",
                        style: TextStyle(color: Colors.grey.shade700),
                      ),
                      trailing: Icon(Icons.arrow_forward, color: Colors.grey.shade800),
                      onTap: () {
                        // Navigate to details page if needed
                      },
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
