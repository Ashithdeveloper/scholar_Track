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
    return Scaffold(
      backgroundColor: Colors.blue.shade50,
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
                      decoration: InputDecoration(
                        hintText: widget.translate("search_scholarships"),
                        prefixIcon: Icon(Icons.search),
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(width: 8),
                  ElevatedButton(
                      onPressed: widget.onLanguageChange,
                      child: Text(widget.language))
                ],
              ),
            ),

            // Suggestions list
            Expanded(
              child: _filteredScholarships.isEmpty
                  ? Center(
                child: Text(widget.translate("no_results_found")),
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
                    margin: EdgeInsets.only(bottom: 12),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
                    child: ListTile(
                      title: Text(s['scholarship_name'] ?? "No Name"),
                      subtitle: Text(
                          "Provider: $provider | Sector: $sector"),
                      trailing: Icon(Icons.arrow_forward),
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
