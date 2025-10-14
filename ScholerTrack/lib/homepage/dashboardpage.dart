import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class DashboardPage extends StatefulWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;

  const DashboardPage({
    Key? key,
    required this.language,
    required this.onLanguageChange,
    required this.translate,
  }) : super(key: key);

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  bool _loading = false;
  Map<String, Map<String, Map<String, String>>> _scheduleData = {}; // month -> day -> {"concept", "video"}

  Future<void> fetchLearningSuggestion(String month, String day) async {
    setState(() => _loading = true);

    const String geminiApiKey = "YOUR_GEMINI_API_KEY_HERE"; // replace with your key
    final Uri url = Uri.parse(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=$geminiApiKey");

    final prompt = "Suggest one top-rated learning concept and one YouTube video link for $month, $day to crack US scholarships. Give the concept and video separately.";

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          "contents": [
            {
              "parts": [
                {"text": prompt}
              ]
            }
          ]
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final text = data['candidates']?[0]?['content']?[0]?['parts']?[0]?['text'] ?? "";

        // Simple split: assume concept and video are separated by newlines
        final lines = text.split('\n').map((e) => e.trim()).where((e) => e.isNotEmpty).toList();
        String concept = lines.isNotEmpty ? lines[0] : "Concept not available";
        String video = lines.length > 1 ? lines[1] : "Video not available";

        setState(() {
          _loading = false;
          _scheduleData.putIfAbsent(month, () => {});
          _scheduleData[month]![day] = {"concept": concept, "video": video};
        });
      } else {
        setState(() {
          _loading = false;
        });
      }
    } catch (e) {
      setState(() {
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        iconTheme: IconThemeData(color: Colors.black87),
        title: Text(widget.translate("dashboard"),
            style: const TextStyle(color: Colors.black87)),
        actions: [
          IconButton(
            icon: const Icon(Icons.language, color: Colors.black87),
            onPressed: widget.onLanguageChange,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _sectionTitle("Notifications", Icons.notifications),
            const SizedBox(height: 10),
            _buildNotification("New scholarship available", "2 hours ago"),
            _buildNotification("Application deadline approaching", "1 day ago"),
            _buildNotification("Profile updated successfully", "3 days ago"),
            const SizedBox(height: 25),

            _sectionTitle("My Applications", Icons.school),
            const SizedBox(height: 10),
            _buildApplication("National Merit Scholarship", "pending", "\$50,000", "Dec 31, 2024"),
            _buildApplication("Tech Excellence Award", "approved", "\$25,000", "Nov 30, 2024"),
            _buildApplication("Academic Excellence Award", "rejected", "\$55,000", "Oct 15, 2024"),
            const SizedBox(height: 25),

            _sectionTitle("US Scholarship Learning Schedule", Icons.schedule),
            const SizedBox(height: 10),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: List.generate(3, (i) {
                final month = "Month ${i + 1}";
                return ElevatedButton.icon(
                  onPressed: () => _showDaysDialog(context, month),
                  icon: const Icon(Icons.calendar_today, size: 18),
                  label: Text(month, style: const TextStyle(fontWeight: FontWeight.bold)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey.shade800,
                    padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
                  ),
                );
              }),
            ),
            const SizedBox(height: 20),

            if (_loading)
              const Center(child: CircularProgressIndicator()),

            // Render schedule
            for (var monthEntry in _scheduleData.entries)
              Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(monthEntry.key,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 18)),
                    const SizedBox(height: 8),
                    for (var dayEntry in monthEntry.value.entries)
                      Container(
                        width: double.infinity,
                        margin: const EdgeInsets.only(bottom: 8),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                            boxShadow: [
                              BoxShadow(
                                  color: Colors.black12,
                                  blurRadius: 4,
                                  offset: Offset(0, 3))
                            ]),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(dayEntry.key,
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 16)),
                            const SizedBox(height: 4),
                            Text("Concept: ${dayEntry.value['concept'] ?? ''}",
                                style: TextStyle(color: Colors.grey.shade800)),
                            const SizedBox(height: 2),
                            Text("Video: ${dayEntry.value['video'] ?? ''}",
                                style: const TextStyle(
                                    color: Colors.blue,
                                    decoration: TextDecoration.underline)),
                          ],
                        ),
                      )
                  ],
                ),
              )
          ],
        ),
      ),
    );
  }

  Widget _sectionTitle(String title, IconData icon) {
    return Row(
      children: [
        Icon(icon, color: Colors.grey.shade800),
        const SizedBox(width: 8),
        Text(title,
            style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.grey.shade900)),
      ],
    );
  }

  Widget _buildNotification(String message, String time) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 3))],
      ),
      child: Row(
        children: [
          const Icon(Icons.notifications_none, color: Colors.grey, size: 28),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(message, style: const TextStyle(fontWeight: FontWeight.w500)),
                const SizedBox(height: 2),
                Text(time, style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildApplication(String title, String status, String amount, String dueDate) {
    Color statusColor;
    switch (status) {
      case "approved":
        statusColor = Colors.green;
        break;
      case "rejected":
        statusColor = Colors.red;
        break;
      default:
        statusColor = Colors.orange;
    }
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 3))],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  Text("Amount: $amount | Due: $dueDate",
                      style: TextStyle(color: Colors.grey.shade700, fontSize: 13)),
                ],
              )),
          Text(status.toUpperCase(),
              style: TextStyle(
                  color: statusColor, fontWeight: FontWeight.bold, fontSize: 14)),
        ],
      ),
    );
  }

  void _showDaysDialog(BuildContext context, String month) {
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          title: Text("$month - Select Day"),
          content: SizedBox(
            width: double.maxFinite,
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: 5,
              itemBuilder: (context, index) {
                final day = "Day ${index + 1}";
                return ListTile(
                  leading: const Icon(Icons.play_circle_outline, color: Colors.grey),
                  title: Text(day),
                  onTap: () {
                    Navigator.pop(context);
                    fetchLearningSuggestion(month, day);
                  },
                );
              },
            ),
          ),
        );
      },
    );
  }
}
