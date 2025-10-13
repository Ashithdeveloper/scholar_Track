import 'package:flutter/material.dart';

class DashboardPage extends StatelessWidget {
  final String language;
  final VoidCallback onLanguageChange;
  final String Function(String) translate;

  DashboardPage({Key? key, required this.language, required this.onLanguageChange, required this.translate}) : super(key:key);

  @override
  Widget build(BuildContext context){
    return Scaffold(
        backgroundColor: Colors.blue.shade50,
        body: Center(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children:[
                  Text("${translate("dashboard")} - ${translate("translator")}", style: TextStyle(fontSize:24,fontWeight: FontWeight.bold,color: Colors.blue.shade700)),
                  SizedBox(height:20),
                  ElevatedButton(onPressed: onLanguageChange, child: Text(language)),
                ]
            )
        )
    );
  }
}
