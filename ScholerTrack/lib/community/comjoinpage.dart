import 'package:flutter/material.dart';

class CommunityJoinPage extends StatefulWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;

  const CommunityJoinPage({
    Key? key,
    required this.language,
    required this.onLanguageChange,
    required this.translate,
  }) : super(key: key);

  @override
  State<CommunityJoinPage> createState() => _CommunityJoinPageState();
}

class _CommunityJoinPageState extends State<CommunityJoinPage> {
  // Demo data for communities
  List<Map<String, dynamic>> communities = [
    {
      "name": "AI Scholarship Updates",
      "description": "Latest AI-related scholarship opportunities",
      "type": "Public",
      "posts": [
        {
          "text": "New AI scholarship announced by XYZ University!",
          "likes": 5,
          "liked": false,
          "comments": ["Wow!", "Thanks for sharing!"],
          "queries": ["Is this for undergrad only?"]
        },
        {
          "text": "Deadline extended for ABC AI scholarship.",
          "likes": 3,
          "liked": false,
          "comments": ["Great!", "Helpful info!"],
          "queries": []
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
          "liked": false,
          "comments": ["Good luck!", "Awesome!"],
          "queries": ["When will results be announced?"]
        }
      ]
    },
  ];

  void _openCommunity(Map<String, dynamic> community) {
    TextEditingController postController = TextEditingController();
    TextEditingController commentController = TextEditingController();
    TextEditingController queryController = TextEditingController();

    showDialog(
      context: context,
      builder: (ctx) {
        return StatefulBuilder(builder: (context, setState) {
          return Dialog(
            child: Container(
              width: double.infinity,
              height: 550,
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(community["name"],
                      style:
                      TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  Text("Type: ${community["type"]}"),
                  Text(community["description"]),
                  const SizedBox(height: 10),
                  Text("Posts:", style: TextStyle(fontWeight: FontWeight.bold)),
                  Expanded(
                    child: ListView.builder(
                      itemCount: community["posts"].length,
                      itemBuilder: (ctx2, index) {
                        final post = community["posts"][index];
                        return Card(
                          margin: const EdgeInsets.symmetric(vertical: 6),
                          elevation: 2,
                          child: Padding(
                            padding: const EdgeInsets.all(8),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(post["text"]),
                                Row(
                                  children: [
                                    IconButton(
                                      icon: Icon(Icons.thumb_up,
                                          color: post["liked"]
                                              ? Colors.blue
                                              : Colors.grey),
                                      onPressed: () {
                                        setState(() {
                                          post["liked"] = !post["liked"];
                                          post["likes"] = post["liked"]
                                              ? post["likes"] + 1
                                              : post["likes"] - 1;
                                        });
                                      },
                                    ),
                                    Text("${post["likes"]} likes"),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text("Comments:", style: TextStyle(fontWeight: FontWeight.bold)),
                                ListView.builder(
                                  shrinkWrap: true,
                                  physics: NeverScrollableScrollPhysics(),
                                  itemCount: post["comments"].length,
                                  itemBuilder: (ctx3, cIndex) {
                                    return Text("- ${post["comments"][cIndex]}");
                                  },
                                ),
                                TextField(
                                  controller: commentController,
                                  decoration: InputDecoration(hintText: "Add comment"),
                                ),
                                ElevatedButton(
                                  onPressed: () {
                                    if (commentController.text.isNotEmpty) {
                                      setState(() {
                                        post["comments"].add(commentController.text);
                                      });
                                      commentController.clear();
                                    }
                                  },
                                  child: Text("Comment"),
                                ),
                                const SizedBox(height: 4),
                                Text("Queries:", style: TextStyle(fontWeight: FontWeight.bold)),
                                ListView.builder(
                                  shrinkWrap: true,
                                  physics: NeverScrollableScrollPhysics(),
                                  itemCount: post["queries"].length,
                                  itemBuilder: (ctx3, qIndex) {
                                    return Text("- ${post["queries"][qIndex]}");
                                  },
                                ),
                                TextField(
                                  controller: queryController,
                                  decoration: InputDecoration(hintText: "Ask a query"),
                                ),
                                ElevatedButton(
                                  onPressed: () {
                                    if (queryController.text.isNotEmpty) {
                                      setState(() {
                                        post["queries"].add(queryController.text);
                                      });
                                      queryController.clear();
                                    }
                                  },
                                  child: Text("Ask"),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  TextField(
                    controller: postController,
                    decoration: InputDecoration(hintText: "Write a post"),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      if (postController.text.isNotEmpty) {
                        setState(() {
                          community["posts"].insert(0, {
                            "text": postController.text,
                            "likes": 0,
                            "liked": false,
                            "comments": [],
                            "queries": []
                          });
                        });
                        postController.clear();
                      }
                    },
                    child: Text("Post"),
                  ),
                ],
              ),
            ),
          );
        });
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Join Communities")),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: communities.length,
        itemBuilder: (ctx, index) {
          final community = communities[index];
          return Card(
            child: ListTile(
              leading: CircleAvatar(child: Icon(Icons.group)),
              title: Text(community["name"]),
              subtitle: Text(community["description"]),
              trailing: ElevatedButton(
                onPressed: () => _openCommunity(community),
                child: Text("Join"),
              ),
            ),
          );
        },
      ),
    );
  }
}
