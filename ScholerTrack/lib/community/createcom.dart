import 'package:flutter/material.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';

class CommunityCreatePage extends StatefulWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;

  const CommunityCreatePage({
    Key? key,
    required this.language,
    required this.onLanguageChange,
    required this.translate,
  }) : super(key: key);

  @override
  State<CommunityCreatePage> createState() => _CommunityCreatePageState();
}

class _CommunityCreatePageState extends State<CommunityCreatePage> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  String _type = "Public";
  File? _profileImage;
  final ImagePicker _picker = ImagePicker();

  void _pickProfileImage() async {
    final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
    if (image != null) {
      setState(() {
        _profileImage = File(image.path);
      });
    }
  }

  void _createCommunity() {
    if (_nameController.text.isEmpty || _descriptionController.text.isEmpty) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text("Please fill all fields")));
      return;
    }
    // Save community locally (frontend-only)
    communities.add({
      "name": _nameController.text,
      "description": _descriptionController.text,
      "type": _type,
      "profileImage": _profileImage,
      "posts": [],
      "chats": [],
    });
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text("Community Created!")));
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Create Scholarship Community")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: _nameController,
              decoration: InputDecoration(
                  labelText: "Community Name",
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12))),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _descriptionController,
              maxLines: 3,
              decoration: InputDecoration(
                  labelText: "Description",
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12))),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                Text("Type:"),
                const SizedBox(width: 10),
                DropdownButton<String>(
                  value: _type,
                  items: ["Public", "Private"]
                      .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                      .toList(),
                  onChanged: (val) {
                    if (val != null) setState(() => _type = val);
                  },
                ),
                const SizedBox(width: 20),
                ElevatedButton.icon(
                    onPressed: _pickProfileImage,
                    icon: Icon(Icons.upload),
                    label: Text("Upload Profile"))
              ],
            ),
            const SizedBox(height: 20),
            ElevatedButton(
                onPressed: _createCommunity,
                child: Text("Create Community"),
                style: ElevatedButton.styleFrom(
                    minimumSize: Size(double.infinity, 45),
                    backgroundColor: Colors.black87)),
          ],
        ),
      ),
    );
  }
}

// Global list of communities (frontend-only)
List<Map<String, dynamic>> communities = [];
