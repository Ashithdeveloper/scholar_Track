import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;

  const HomePage({
    Key? key,
    required this.language,
    required this.onLanguageChange,
    required this.translate,
  }) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // Internal category keys
  final List<String> categories = [
    "Government",
    "Private",
    "Corporate",
    "International",
    "Merit Based",
    "Sports Based"
  ];

  String selectedCategory = "Government";

  // Institutions data with caste and marks
  List<Map<String, dynamic>> institutions = [
    {
      "name": "Govt College 1",
      "category": "Government",
      "caste": "General",
      "marks": 85
    },
    {
      "name": "Private Institute",
      "category": "Private",
      "caste": "OBC",
      "marks": 90
    },
    {
      "name": "Sports Academy",
      "category": "Sports Based",
      "caste": "SC",
      "marks": 70
    },
    {
      "name": "Merit College",
      "category": "Merit Based",
      "caste": "General",
      "marks": 95
    },
  ];

  @override
  Widget build(BuildContext context) {
    // Filter institutions by internal category key
    List<Map<String, dynamic>> filteredInstitutions = institutions
        .where((item) => item['category'] == selectedCategory)
        .toList();

    return Scaffold(
      backgroundColor: Colors.blue.shade50,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.all(16),
          child: Column(
            children: [
              // App name + language switch
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    widget.translate("appName"),
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Colors.blue.shade700,
                    ),
                  ),
                  ElevatedButton(
                    onPressed: widget.onLanguageChange,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue.shade600,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: Text(widget.language),
                  ),
                ],
              ),
              SizedBox(height: 16),

              // Category Tabs
              Container(
                height: 50,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: categories.length,
                  itemBuilder: (context, index) {
                    String categoryKey = categories[index]; // internal key
                    bool isSelected = categoryKey == selectedCategory;

                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          selectedCategory = categoryKey;
                        });
                      },
                      child: Container(
                        padding:
                        EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        margin: EdgeInsets.symmetric(horizontal: 8),
                        decoration: BoxDecoration(
                          color: isSelected ? Colors.blue.shade600 : Colors.white,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.blue.shade200),
                        ),
                        child: Center(
                          child: Text(
                            widget.translate(categoryKey), // TRANSLATED
                            style: TextStyle(
                              color: isSelected
                                  ? Colors.white
                                  : Colors.blue.shade700,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
              SizedBox(height: 16),

              // Institution Cards
              Column(
                children: filteredInstitutions.map((item) {
                  return Container(
                    width: double.infinity,
                    margin: EdgeInsets.only(bottom: 16),
                    child: Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      elevation: 8,
                      child: Padding(
                        padding: EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              item['name'],
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Colors.blue.shade700,
                              ),
                            ),
                            SizedBox(height: 8),
                            Text(
                              "${widget.translate("category")}: ${widget.translate(item['category'])}",
                            ),
                            Text(
                              "${widget.translate("caste")}: ${widget.translate(item['caste'])}",
                            ),
                            Text(
                              "${widget.translate("marks")}: ${item['marks']}%",
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
