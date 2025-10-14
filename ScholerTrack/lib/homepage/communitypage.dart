import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

class CommunityPage extends StatefulWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;

  const CommunityPage({
    Key? key,
    required this.language,
    required this.onLanguageChange,
    required this.translate,
  }) : super(key: key);

  @override
  State<CommunityPage> createState() => _CommunityPageState();
}

class _CommunityPageState extends State<CommunityPage> {
  final List<Map<String, dynamic>> posts = [];
  final TextEditingController _postController = TextEditingController();
  File? _profileImage;
  final ImagePicker _picker = ImagePicker();

  // Pick profile image
  Future<void> _pickProfileImage() async {
    final XFile? pickedFile = await _picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _profileImage = File(pickedFile.path);
      });
    }
  }

  // Create new post
  void _createPost() {
    final content = _postController.text.trim();
    if (content.isEmpty) return;

    setState(() {
      posts.insert(0, {
        "author": "You",
        "profileImage": _profileImage,
        "content": content,
        "time": "Just now",
      });
      _postController.clear();
      _profileImage = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        title: Text(
          widget.translate("Community"),
          style: const TextStyle(color: Colors.black87, fontWeight: FontWeight.bold),
        ),
        actions: [
          TextButton(
            onPressed: widget.onLanguageChange,
            child: Text(widget.language, style: const TextStyle(color: Colors.black87, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(width: 10),
        ],
      ),
      body: Column(
        children: [
          // 📝 Create Post Area
          Container(
            color: Colors.white,
            padding: const EdgeInsets.all(12),
            child: Row(
              children: [
                GestureDetector(
                  onTap: _pickProfileImage,
                  child: CircleAvatar(
                    radius: 24,
                    backgroundColor: Colors.grey.shade300,
                    backgroundImage: _profileImage != null ? FileImage(_profileImage!) : null,
                    child: _profileImage == null ? const Icon(Icons.add_a_photo, color: Colors.white) : null,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: TextField(
                    controller: _postController,
                    decoration: InputDecoration(
                      hintText: "What's your scholarship query?",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      filled: true,
                      fillColor: Colors.grey.shade200,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send, color: Colors.blue),
                  onPressed: _createPost,
                )
              ],
            ),
          ),
          const SizedBox(height: 8),
          const Divider(height: 1),
          // 📰 Posts Feed
          Expanded(
            child: posts.isEmpty
                ? Center(
              child: Text(
                "No posts yet. Create a new scholarship post!",
                style: TextStyle(color: Colors.grey.shade700, fontSize: 16),
              ),
            )
                : ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: posts.length,
              itemBuilder: (context, index) {
                final post = posts[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  color: Colors.white,
                  child: ListTile(
                    leading: CircleAvatar(
                      radius: 24,
                      backgroundImage: post["profileImage"] != null ? FileImage(post["profileImage"]) : null,
                      backgroundColor: Colors.grey.shade300,
                      child: post["profileImage"] == null ? const Icon(Icons.person, color: Colors.white) : null,
                    ),
                    title: Text(post["author"], style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.black87)),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 4),
                        Text(post["content"], style: TextStyle(color: Colors.grey.shade800)),
                        const SizedBox(height: 4),
                        Text(post["time"], style: TextStyle(color: Colors.grey.shade500, fontSize: 12)),
                      ],
                    ),
                    isThreeLine: true,
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
