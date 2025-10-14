import 'package:flutter/material.dart';

class NotificationsPage extends StatelessWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;

  const NotificationsPage({
    Key? key,
    required this.language,
    required this.onLanguageChange,
    required this.translate,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> notifications = [
      {
        "title": "New scholarship available",
        "subtitle": "Check out the latest opportunities added today.",
        "time": "2 hours ago",
        "icon": Icons.school_rounded,
      },
      {
        "title": "Application deadline approaching",
        "subtitle": "One of your saved scholarships closes soon.",
        "time": "1 day ago",
        "icon": Icons.schedule_rounded,
      },
      {
        "title": "Profile updated successfully",
        "subtitle": "Your personal information was saved.",
        "time": "3 days ago",
        "icon": Icons.check_circle_rounded,
      },
    ];

    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        title: Row(
          children: [
            Icon(Icons.notifications_active_rounded, color: Colors.black87),
            const SizedBox(width: 8),
            Text(
              translate("Notifications"),
              style: const TextStyle(
                  color: Colors.black87, fontWeight: FontWeight.bold, fontSize: 22),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: onLanguageChange,
            style: TextButton.styleFrom(
              foregroundColor: Colors.black87,
            ),
            child: Text(language, style: const TextStyle(fontWeight: FontWeight.bold)),
          ),
          const SizedBox(width: 10),
        ],
      ),
      body: notifications.isEmpty
          ? Center(
        child: Text(
          translate("No new notifications"),
          style: TextStyle(
            color: Colors.grey.shade700,
            fontSize: 18,
          ),
        ),
      )
          : ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: notifications.length,
        itemBuilder: (context, index) {
          final Map<String, dynamic> item = notifications[index];
          final IconData icon = item["icon"] as IconData;

          return Card(
            color: Colors.white,
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              leading: CircleAvatar(
                radius: 24,
                backgroundColor: Colors.grey.shade200,
                child: Icon(icon, color: Colors.black87),
              ),
              title: Text(
                item["title"] as String,
                style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                    fontSize: 16),
              ),
              subtitle: Text(
                item["subtitle"] as String,
                style: TextStyle(color: Colors.grey.shade700),
              ),
              trailing: Text(
                item["time"] as String,
                style: TextStyle(
                  color: Colors.grey.shade500,
                  fontSize: 12,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
