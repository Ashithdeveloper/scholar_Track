import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ScholarshipDetailPage extends StatelessWidget {
  final Map<String, dynamic> scholarship;

  const ScholarshipDetailPage({Key? key, required this.scholarship}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Convert lists and semicolon-separated strings to bullet/numbered lists
    String requiredDocs = '';
    if (scholarship['required_documents'] != null &&
        scholarship['required_documents'] is List) {
      requiredDocs =
          (scholarship['required_documents'] as List).map((e) => "• $e").join('\n');
    }

    String benefits = '';
    if (scholarship['benefits'] != null) {
      benefits = (scholarship['benefits'] as String)
          .split(';')
          .map((e) => "• ${e.trim()}")
          .join('\n');
    }

    String eligibility = '';
    if (scholarship['eligibility_criteria'] != null) {
      eligibility = (scholarship['eligibility_criteria'] as String)
          .split(';')
          .map((e) => "• ${e.trim()}")
          .join('\n');
    }

    String applicationProcess = '';
    if (scholarship['application_process_steps'] != null &&
        scholarship['application_process_steps'] is List) {
      final steps = scholarship['application_process_steps'] as List;
      for (int i = 0; i < steps.length; i++) {
        applicationProcess += "${i + 1}. ${steps[i]}\n";
      }
    }

    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      body: SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Scholarship Name
            Text(
              scholarship['scholarship_name'] ?? "Scholarship Details",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.grey.shade900,
              ),
            ),
            SizedBox(height: 24),

            // Category & Type
            Row(
              children: [
                Icon(Icons.account_balance, color: Colors.grey.shade800),
                SizedBox(width: 8),
                Text(
                  scholarship['provider_sector'] ?? "Government",
                  style: TextStyle(
                      fontSize: 16, fontWeight: FontWeight.bold, color: Colors.grey.shade900),
                ),
              ],
            ),
            SizedBox(height: 20),

            // Apply Now Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                icon: Icon(Icons.check, color: Colors.white),
                label: Text("Apply Now", style: TextStyle(color: Colors.white)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.grey.shade900,
                  padding: EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onPressed: () async {
                  final url = scholarship['website_link'];
                  if (url == null || url.isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text("No website available")),
                    );
                    return;
                  }

                  final uri = Uri.parse(url);
                  if (await canLaunchUrl(uri)) {
                    await launchUrl(uri, mode: LaunchMode.externalApplication);
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text("Could not open link")),
                    );
                  }
                },
              ),
            ),

            SizedBox(height: 24),

            // Award Amount
            _detailSection(
              icon: Icons.monetization_on_outlined,
              title: "Award Amount",
              content: scholarship['scholar_prize'] ?? "N/A",
            ),

            // Deadline
            _detailSection(
              icon: Icons.calendar_today,
              title: "Deadline",
              content: scholarship['deadline'] ?? "N/A",
            ),

            // Provider
            _detailSection(
              icon: Icons.business,
              title: "Provider",
              content: scholarship['providerName'] ?? "N/A",
            ),

            // Description
            _detailSection(
              icon: Icons.description,
              title: "Description",
              content: scholarship['description'] ?? "No description available",
            ),

            // Eligibility Criteria
            _detailSection(
              icon: Icons.check_circle_outline,
              title: "Eligibility Criteria",
              content: eligibility.isNotEmpty ? eligibility : "No eligibility criteria available",
            ),

            // Benefits
            _detailSection(
              icon: Icons.card_giftcard,
              title: "Benefits",
              content: benefits.isNotEmpty ? benefits : "No benefits available",
            ),

            // Required Documents
            _detailSection(
              icon: Icons.folder_open,
              title: "Required Documents",
              content: requiredDocs.isNotEmpty ? requiredDocs : "No documents listed",
            ),

            // Application Process
            _detailSection(
              icon: Icons.list_alt,
              title: "Application Process",
              content: applicationProcess.isNotEmpty ? applicationProcess : "No application process available",
            ),

            SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _detailSection({required IconData icon, required String title, required String content}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: Colors.grey.shade800, size: 28),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade900)),
                SizedBox(height: 6),
                Text(content, style: TextStyle(fontSize: 15, color: Colors.grey.shade700)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
