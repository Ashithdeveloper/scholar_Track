import 'package:flutter/material.dart';
import 'package:scholartracker/homepage/communitypage.dart';
import '../community/homepage.dart';
import 'homepage.dart';
import 'searchpage.dart';
import 'profilepage.dart';
import 'dashboardpage.dart';
import 'notificationpage.dart';

void main() {
  runApp(MaterialApp(home: MainPage(token: '',)));
}

class MainPage extends StatefulWidget {
  final String token;
  const MainPage({Key? key, required this.token}) : super(key: key);

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _currentIndex = 0;

  final List<String> languages = ["EN", "TA", "HI"];
  int languageIndex = 0;
  String get language => languages[languageIndex];

  void changeLanguage() {
    setState(() {
      languageIndex = (languageIndex + 1) % languages.length;
    });
  }

  final Map<String, Map<String, String>> translations = {
    "EN": {
      "appName": "ScholarTrack",
      "home": "Home",
      "search": "Search",
      "profile": "Profile",
      "dashboard": "Dashboard",
      "notifications": "Notifications",
      "translator": "Translator",
      "category": "Category",
      "caste": "Caste",
      "marks": "Marks",
      "all": "All",
      "Government": "Government",
      "Private": "Private",
      "Corporate": "Corporate",
      "International": "International",
      "Merit Based": "Merit Based",
      "Sports Based": "Sports Based",
    },
    "TA": {
      "appName": "ஸ்காலர் ட்ராக்",
      "home": "முகப்பு",
      "search": "தேடுக",
      "profile": "சுயவிவரம்",
      "dashboard": "கட்டுப்பாட்டு பலகை",
      "notifications": "அறிவிப்புகள்",
      "translator": "மொழிபெயர்ப்பாளர்",
      "category": "வகை",
      "caste": "சாதி",
      "marks": "மதிப்பெண்கள்",
      "all": "அனைத்து",
      "Government": "அரசு",
      "Private": "தனியார்",
      "Corporate": "நிறுவனங்கள்",
      "International": "ஆர்வலர்",
      "Merit Based": "மெரிட் அடிப்படையிலானது",
      "Sports Based": "கேளிக்கை அடிப்படையிலானது",
    },
    "HI": {
      "appName": "स्कॉलरट्रैक",
      "home": "मुखपृष्ठ",
      "search": "खोजें",
      "profile": "प्रोफ़ाइल",
      "dashboard": "डैशबोर्ड",
      "notifications": "सूचनाएं",
      "translator": "अनुवादक",
      "category": "श्रेणी",
      "caste": "जाति",
      "marks": "अंक",
      "all": "सभी",
      "Government": "सरकारी",
      "Private": "निजी",
      "Corporate": "कॉर्पोरेट",
      "International": "अंतरराष्ट्रीय",
      "Merit Based": "मेरिट आधारित",
      "Sports Based": "खेल आधारित",
    }
  };

  String translate(String key) {
    return translations[language]![key] ?? key;
  }

  @override
  Widget build(BuildContext context) {
    final pages = [
      HomePage(language: language, onLanguageChange: changeLanguage, translate: translate, token: widget.token,),
      SearchPage(language: language, onLanguageChange: changeLanguage, translate: translate, scholarships: [],),
      ProfilePage(language: language, onLanguageChange: changeLanguage, translate: translate, token: widget.token,),
      DashboardPage(language: language, onLanguageChange: changeLanguage, translate: translate),
      CommunityHomePage(language: language, onLanguageChange: changeLanguage, translate: translate),
    ];

    return Scaffold(
      backgroundColor: Colors.grey.shade100, // light grey background
      body: pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.white, // white background
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        selectedItemColor: Colors.black87, // selected icon & text → dark black
        unselectedItemColor: Colors.grey.shade600, // unselected → medium grey
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: translate("home")),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: translate("search")),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: translate("profile")),
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: translate("dashboard")),
          BottomNavigationBarItem(icon: Icon(Icons.group), label: translate("community")),
        ],
      ),
    );
  }
}
