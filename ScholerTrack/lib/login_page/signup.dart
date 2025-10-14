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
        const SnackBar(content: Text("Please fill all required fields")),
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

    final url =
    Uri.parse("https://scholar-zceo.onrender.com/api/user/studentsignup");

    try {
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(data),
      );

      setState(() => _isLoading = false);

      if (response.statusCode == 200 || response.statusCode == 201) {
        final responseData = jsonDecode(response.body);
        final token = responseData['token'];

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Signup successful! Redirecting..."),
            backgroundColor: Colors.green,
          ),
        );

        Future.delayed(const Duration(seconds: 1), () {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => MainPage(token: token)),
          );
        });
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
        color: Colors.grey.shade200, // grey card
        elevation: 8,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        child: Container(
          width: 350,
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
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
          key: const ValueKey(0),
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              "Create Account",
              style: const TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 24),
            _buildTextField(fullnameController, "Full Name"),
            const SizedBox(height: 16),
            _buildTextField(emailController, "Email",
                keyboardType: TextInputType.emailAddress),
            const SizedBox(height: 16),
            _buildPasswordField(),
          ],
        );

      case 1:
        return Column(
          key: const ValueKey(1),
          mainAxisSize: MainAxisSize.min,
          children: [
            _stepTitle("Personal Info"),
            const SizedBox(height: 24),
            _buildDropdown(
                "Caste", selectedCast, ["BC", "OC", "SC", "ST", "Other"],
                    (val) => selectedCast = val),
            const SizedBox(height: 16),
            _buildTextField(phoneController, "Phone Number",
                keyboardType: TextInputType.number, maxLength: 10),
            const SizedBox(height: 16),
            _buildDropdown(
                "Gender", selectedGender, ["Male", "Female", "Other"],
                    (val) => selectedGender = val),
          ],
        );

      case 2:
        return Column(
          key: const ValueKey(2),
          mainAxisSize: MainAxisSize.min,
          children: [
            _stepTitle("Education Details"),
            const SizedBox(height: 24),
            _buildDropdown("Institution Type", selectedInstitutionType,
                ["School", "College"], (val) => selectedInstitutionType = val),
            const SizedBox(height: 16),
            _buildTextField(institutionController, "Institution Name"),
            const SizedBox(height: 16),
            _buildDropdown("Education Level", selectedEducation,
                ["UG", "PG", "Diploma", "Other"], (val) => selectedEducation = val),
            const SizedBox(height: 16),
            _buildTextField(percentageController, "Percentage (%)",
                keyboardType: TextInputType.numberWithOptions(decimal: true)),
          ],
        );

      default:
        return Container();
    }
  }

  Widget _stepTitle(String title) => Text(
    title,
    style: const TextStyle(
        fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black),
  );

  Widget _buildTextField(TextEditingController controller, String label,
      {TextInputType keyboardType = TextInputType.text, int? maxLength}) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      maxLength: maxLength,
      style: const TextStyle(color: Colors.black),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: Colors.grey.shade700),
        counterText: "",
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        focusedBorder: OutlineInputBorder(
          borderSide: const BorderSide(color: Colors.black),
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      validator: (value) => value!.isEmpty ? "Enter $label" : null,
    );
  }

  Widget _buildPasswordField() {
    return TextFormField(
      controller: passwordController,
      obscureText: _obscurePassword,
      style: const TextStyle(color: Colors.black),
      decoration: InputDecoration(
        labelText: "Password",
        labelStyle: TextStyle(color: Colors.grey.shade700),
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        focusedBorder: OutlineInputBorder(
          borderSide: const BorderSide(color: Colors.black),
          borderRadius: BorderRadius.circular(12),
        ),
        suffixIcon: IconButton(
          icon: Icon(
              _obscurePassword ? Icons.visibility_off : Icons.visibility,
              color: Colors.grey.shade700),
          onPressed: () {
            setState(() => _obscurePassword = !_obscurePassword);
          },
        ),
      ),
      validator: (value) =>
      value!.length < 8 ? "Password must be 8+ characters" : null,
    );
  }

  Widget _buildDropdown(String label, String? selectedValue,
      List<String> options, Function(String?) onChanged) {
    return DropdownButtonFormField<String>(
      value: selectedValue,
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: Colors.grey.shade700),
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        focusedBorder: OutlineInputBorder(
          borderSide: const BorderSide(color: Colors.black),
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      items:
      options.map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
      onChanged: (val) => setState(() => onChanged(val)),
      validator: (value) => value == null ? "Select $label" : null,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white, // white background
      body: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedSwitcher(
              duration: const Duration(milliseconds: 400),
              transitionBuilder: (child, animation) {
                final inAnimation = Tween<Offset>(
                    begin: Offset(_isNext ? 1 : -1, 0), end: Offset.zero)
                    .animate(animation);
                return SlideTransition(position: inAnimation, child: child);
              },
              child: stepCard(buildStepContent()),
            ),
            const SizedBox(height: 24),
            _isLoading
                ? const CircularProgressIndicator(color: Colors.black)
                : Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                if (_currentStep > 0)
                  ElevatedButton(
                    onPressed: previousStep,
                    style: _buttonStyle(Colors.grey.shade700),
                    child: const Text("Back",
                        style:
                        TextStyle(color: Colors.white, fontSize: 16)),
                  ),
                ElevatedButton(
                  onPressed: nextStep,
                  style: _buttonStyle(Colors.black),
                  child: Text(
                      _currentStep == 2 ? "Signup" : "Next",
                      style: const TextStyle(
                          color: Colors.white, fontSize: 16)),
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
      minimumSize: const Size(120, 45),
    );
  }
}
