import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:scholartracker/homepage/mainpage.dart';

class SignupPage extends StatefulWidget {
  @override
  _SignupPageState createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  int _currentStep = 0;
  bool _obscurePassword = true;
  bool _isNext = true;
  bool _isLoading = false;

  final TextEditingController fullnameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController institutionController = TextEditingController();
  final TextEditingController percentageController = TextEditingController();

  String? selectedGender;
  String? selectedCast;
  String? selectedInstitutionType;
  String? selectedEducation;

  final _formKey = GlobalKey<FormState>();

  void nextStep() {
    if (_formKey.currentState!.validate()) {
      if (_currentStep < 2) {
        setState(() {
          _isNext = true;
          _currentStep++;
        });
      } else {
        submitData();
      }
    }
  }

  void previousStep() {
    if (_currentStep > 0) {
      setState(() {
        _isNext = false;
        _currentStep--;
      });
    }
  }

  Future<void> submitData() async {
    if (selectedCast == null ||
        selectedGender == null ||
        selectedInstitutionType == null ||
        selectedEducation == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Please fill all required fields")),
      );
      return;
    }

    setState(() => _isLoading = true);

    final data = {
      "fullname": fullnameController.text.trim(),
      "email": emailController.text.trim(),
      "password": passwordController.text,
      "caste": selectedCast,
      "phoneNumber": int.tryParse(phoneController.text) ?? 0,
      "percentage": double.tryParse(percentageController.text) ?? 0.0,
      "gender": selectedGender,
      "category": selectedInstitutionType,
      "institution": institutionController.text.trim(),
      "lasteducation": selectedEducation,
    };

    final url = Uri.parse("https://scholar-zceo.onrender.com/api/user/studentsignup");

    try {
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(data),
      );

      setState(() => _isLoading = false);

      if (response.statusCode == 200 || response.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("Signup successful! Redirecting..."),
            backgroundColor: Colors.green,
          ),
        );

        // ✅ Navigate directly to home page (no OTP)
        Future.delayed(Duration(seconds: 1), () {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => MainPage()),
          );
        });
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("Signup failed: ${response.body}"),
            backgroundColor: Colors.redAccent,
          ),
        );
      }
    } catch (e) {
      setState(() => _isLoading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Error: $e"),
          backgroundColor: Colors.redAccent,
        ),
      );
    }
  }

  Widget stepCard(Widget content) {
    return Center(
      child: Card(
        elevation: 10,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        shadowColor: Colors.blue.shade100,
        child: Container(
          width: 350,
          padding: EdgeInsets.all(24),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            color: Colors.white,
          ),
          child: content,
        ),
      ),
    );
  }

  Widget buildStepContent() {
    switch (_currentStep) {
      case 0:
        return Column(
          key: ValueKey(0),
          mainAxisSize: MainAxisSize.min,
          children: [
            Text("Sign Up",
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.blue.shade700)),
            SizedBox(height: 24),
            TextFormField(
              controller: fullnameController,
              decoration: _inputDecoration("Full Name"),
              validator: (value) => value!.isEmpty ? "Enter full name" : null,
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: emailController,
              decoration: _inputDecoration("Email"),
              validator: (value) {
                if (value == null || value.isEmpty) return "Enter email";
                final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
                if (!emailRegex.hasMatch(value)) return "Enter valid email";
                return null;
              },
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: passwordController,
              obscureText: _obscurePassword,
              decoration: _inputDecoration("Password").copyWith(
                suffixIcon: IconButton(
                  icon: Icon(_obscurePassword ? Icons.visibility : Icons.visibility_off),
                  onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                ),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) return "Enter password";
                if (value.length < 8) return "Password must be 8+ characters";
                return null;
              },
            ),
          ],
        );

      case 1:
        return Column(
          key: ValueKey(1),
          mainAxisSize: MainAxisSize.min,
          children: [
            Text("Personal Info",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.blue.shade700)),
            SizedBox(height: 24),
            DropdownButtonFormField<String>(
              value: selectedCast,
              decoration: _inputDecoration("Caste"),
              items: ["BC", "OC", "SC", "ST", "Other"]
                  .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                  .toList(),
              onChanged: (val) => setState(() => selectedCast = val),
              validator: (value) => value == null ? "Select caste" : null,
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: phoneController,
              keyboardType: TextInputType.number,
              maxLength: 10,
              decoration: _inputDecoration("Phone Number").copyWith(counterText: ""),
              validator: (value) {
                if (value == null || value.isEmpty) return "Enter phone number";
                if (value.length != 10) return "Enter valid 10-digit number";
                return null;
              },
            ),
            SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: selectedGender,
              decoration: _inputDecoration("Gender"),
              items: ["Male", "Female", "Other"]
                  .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                  .toList(),
              onChanged: (val) => setState(() => selectedGender = val),
              validator: (value) => value == null ? "Select gender" : null,
            ),
          ],
        );

      case 2:
        return Column(
          key: ValueKey(2),
          mainAxisSize: MainAxisSize.min,
          children: [
            Text("Education",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.blue.shade700)),
            SizedBox(height: 24),
            DropdownButtonFormField<String>(
              value: selectedInstitutionType,
              decoration: _inputDecoration("Institution Type"),
              items: ["School", "College"]
                  .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                  .toList(),
              onChanged: (val) => setState(() => selectedInstitutionType = val),
              validator: (value) => value == null ? "Select institution type" : null,
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: institutionController,
              decoration: _inputDecoration("Institution Name"),
              validator: (value) => value!.isEmpty ? "Enter institution name" : null,
            ),
            SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: selectedEducation,
              decoration: _inputDecoration("Education Level"),
              items: ["UG", "PG", "Diploma", "Other"]
                  .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                  .toList(),
              onChanged: (val) => setState(() => selectedEducation = val),
              validator: (value) => value == null ? "Select education" : null,
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: percentageController,
              keyboardType: TextInputType.numberWithOptions(decimal: true),
              decoration: _inputDecoration("Percentage (%)"),
              validator: (value) {
                if (value == null || value.isEmpty) return "Enter percentage";
                final numValue = double.tryParse(value);
                if (numValue == null || numValue < 0 || numValue > 100) return "Enter valid percentage (0–100)";
                return null;
              },
            ),
          ],
        );

      default:
        return Container();
    }
  }

  InputDecoration _inputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      filled: true,
      fillColor: Colors.blue.shade50.withOpacity(0.3),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue.shade50,
      body: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedSwitcher(
              duration: Duration(milliseconds: 400),
              transitionBuilder: (child, animation) {
                final inAnimation = Tween<Offset>(
                  begin: Offset(_isNext ? 1 : -1, 0),
                  end: Offset(0, 0),
                ).animate(animation);
                return SlideTransition(position: inAnimation, child: child);
              },
              child: stepCard(buildStepContent()),
            ),
            SizedBox(height: 24),
            _isLoading
                ? CircularProgressIndicator(color: Colors.blue.shade600)
                : Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                if (_currentStep > 0)
                  ElevatedButton(
                    onPressed: previousStep,
                    style: _buttonStyle(Colors.blue.shade300),
                    child: Text("Back", style: TextStyle(color: Colors.white)),
                  ),
                ElevatedButton(
                  onPressed: nextStep,
                  style: _buttonStyle(Colors.blue.shade600),
                  child: Text(_currentStep == 2 ? "Signup" : "Next",
                      style: TextStyle(color: Colors.white)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  ButtonStyle _buttonStyle(Color color) {
    return ElevatedButton.styleFrom(
      backgroundColor: color,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      minimumSize: Size(120, 45),
    );
  }
}
