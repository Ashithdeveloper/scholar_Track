import 'package:flutter/material.dart';
import 'comjoinpage.dart';
import 'createcom.dart' show CommunityCreatePage;

class CommunityHomePage extends StatelessWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;

   CommunityHomePage({
    Key? key,
    required this.language,
    required this.onLanguageChange,
    required this.translate,
  }) : super(key: key);

  // Demo communities
  final List<Map<String, dynamic>> communities = [
    {
      "name": "AI Scholarship Updates",
      "description": "Latest AI-related scholarship opportunities",
      "type": "Public",
      "posts": [
        {
          "text": "New AI scholarship announced by XYZ University!",
          "likes": 5,
          "comments": ["Wow!", "Thanks for sharing!"]
        },
        {
          "text": "Deadline extended for ABC AI scholarship.",
          "likes": 3,
          "comments": ["Great!", "Helpful info!"]
        }
      ]
    },
    {
      "name": "Merit-based Scholarships",
      "description": "Merit-based scholarship discussions",
      "type": "Private",
      "posts": [
        {
          "text": "I just applied for a national merit scholarship!",
          "likes": 7,
          "comments": ["Good luck!", "Awesome!"]
        }
      ]
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        title: Text("Scholarship Communities",
            style: TextStyle(color: Colors.black87)),
        actions: [
          IconButton(
              onPressed: onLanguageChange,
              icon: Icon(Icons.language, color: Colors.black87))
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Create / Join buttons
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (_) => CommunityCreatePage(
                            language: language,
                            onLanguageChange: onLanguageChange,
                            translate: translate)));
              },
              child: Text("Create Community"),
              style: ElevatedButton.styleFrom(
                  minimumSize: Size(double.infinity, 50),
                  backgroundColor: Colors.black87),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (_) => CommunityJoinPage(
                            language: language,
                            onLanguageChange: onLanguageChange,
                            translate: translate)));
              },
              child: Text("Join Community"),
              style: ElevatedButton.styleFrom(
                  minimumSize: Size(double.infinity, 50),
                  backgroundColor: Colors.grey.shade800),
            ),
            const SizedBox(height: 20),

            // Show your communities with latest posts
            Expanded(
              child: ListView.builder(
                itemCount: communities.length,
                itemBuilder: (context, index) {
                  final community = communities[index];
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8),
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                community["name"],
                                style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold),
                              ),
                              Text(
                                community["type"],
                                style: TextStyle(
                                    color: Colors.grey.shade600,
                                    fontStyle: FontStyle.italic),
                              ),
                            ],
                          ),
                          SizedBox(height: 4),
                          Text(
                            community["description"],
                            style: TextStyle(color: Colors.grey.shade700),
                          ),
                          SizedBox(height: 10),
                          Text("Latest Posts:",
                              style: TextStyle(fontWeight: FontWeight.bold)),
                          ...List.generate(
                            community["posts"].length,
                                (postIndex) {
                              final post = community["posts"][postIndex];
                              return ListTile(
                                contentPadding: EdgeInsets.zero,
                                title: Text(post["text"]),
                                subtitle: Text(
                                    "${post["likes"]} likes · ${post["comments"].length} comments"),
                                trailing: Icon(Icons.arrow_forward_ios, size: 16),
                              );
                            },
                          ),
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
