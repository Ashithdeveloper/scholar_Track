import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ScholarshipDetailPage extends StatefulWidget {
  final Map<String, dynamic> scholarship;

  const ScholarshipDetailPage({Key? key, required this.scholarship}) : super(key: key);

  @override
  _ScholarshipDetailPageState createState() => _ScholarshipDetailPageState();
}

class _ScholarshipDetailPageState extends State<ScholarshipDetailPage> {
  final TextEditingController _chatController = TextEditingController();
  final List<Map<String, String>> _messages = [];
  bool _isChatLoading = false;

  final String geminiApiKey = "YOUR_GEMINI_API_KEY";

  Future<void> sendMessageToGemini(String message) async {
    if (message.isEmpty) return;

    setState(() {
      _messages.add({"role": "user", "content": message});
      _isChatLoading = true;
    });

    final url = Uri.parse("https://api.gemini.com/v1/chat/completions");
    try {
      final response = await http.post(
        url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $geminiApiKey"
        },
        body: jsonEncode({
          "model": "gpt-5-mini",
          "messages": [
            {"role": "user", "content": message}
          ]
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        String reply = data['choices'][0]['message']['content'] ?? "No response";

        setState(() {
          _messages.add({"role": "bot", "content": reply});
          _isChatLoading = false;
        });
      } else {
        setState(() {
          _messages.add({"role": "bot", "content": "Error: ${response.statusCode}"});
          _isChatLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _messages.add({"role": "bot", "content": "Error: $e"});
        _isChatLoading = false;
      });
    }

    _chatController.clear();
  }

  Future<void> _launchURL(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text("Cannot open the link")));
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.scholarship;

    String provider = s['providerName']?.toString().trim() ??
        s['provider']?.toString().trim() ??
        'Unknown';
    String sector = s['provider_sector']?.toString().trim() ??
        s['providerSector']?.toString().trim() ??
        'N/A';

    return Scaffold(
      appBar: AppBar(title: Text(s['scholarship_name'] ?? "Details")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            // Card 1: Provider info
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Provider: $provider",
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    Text("Provider Sector: $sector"),
                    Text("Prize: ${s['scholar_prize'] ?? 'N/A'}"),
                    Text("Deadline: ${s['deadline'] ?? 'N/A'}"),
                    SizedBox(height: 8),
                    if (s['website_link'] != null)
                      ElevatedButton(
                          onPressed: () => _launchURL(s['website_link']),
                          child: Text("Apply Now"))
                  ],
                ),
              ),
            ),

            SizedBox(height: 12),
            // Card 2: Description
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Text("Description:\n${s['description'] ?? 'N/A'}")),
            ),

            SizedBox(height: 12),
            // Card 3: Eligibility
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Text("Eligibility:\n${s['eligibility_criteria'] ?? 'N/A'}")),
            ),

            SizedBox(height: 12),
            // Card 4: Benefits
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Text("Benefits:\n${s['benefits'] ?? 'N/A'}")),
            ),

            SizedBox(height: 12),
            // Card 5: Application Steps
            if (s['application_process_steps'] != null)
              Card(
                elevation: 4,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: Padding(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Application Steps:",
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                        SizedBox(height: 8),
                        ...List<Widget>.from(
                            (s['application_process_steps'] as List)
                                .asMap()
                                .entries
                                .map((e) => Text("${e.key + 1}. ${e.value}"))),
                      ],
                    )),
              ),

            SizedBox(height: 16),
            Text("Chat with ScholarBot",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            SizedBox(height: 8),

            // Chat messages
            Container(
              constraints: BoxConstraints(
                  maxHeight: MediaQuery.of(context).size.height * 0.4),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey.shade300),
                borderRadius: BorderRadius.circular(12),
              ),
              child: ListView.builder(
                padding: EdgeInsets.all(8),
                shrinkWrap: true,
                itemCount: _messages.length,
                itemBuilder: (context, index) {
                  final msg = _messages[index];
                  bool isUser = msg['role'] == 'user';
                  return Align(
                    alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                    child: Container(
                      margin: EdgeInsets.symmetric(vertical: 4),
                      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(
                        color: isUser ? Colors.blue.shade200 : Colors.grey.shade200,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(msg['content'] ?? ""),
                    ),
                  );
                },
              ),
            ),

            SizedBox(height: 8),
            // Chat input
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _chatController,
                    decoration: InputDecoration(
                      hintText: "Ask something...",
                      border:
                      OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                ),
                SizedBox(width: 8),
                _isChatLoading
                    ? CircularProgressIndicator()
                    : IconButton(
                  icon: Icon(Icons.send),
                  onPressed: () => sendMessageToGemini(_chatController.text),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
