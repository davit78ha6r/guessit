#include <iostream>
#include <fstream>
#include <unordered_set>
#include <random>
#include <string>
#include <iomanip>

std::string generateCode(std::mt19937& rng) {
    std::uniform_int_distribution<int> dist(0, 9);
    std::string code;
    for (int i = 0; i < 12; ++i) {
        code += std::to_string(dist(rng));
    }
    return code;
}

int main() {
    const int numCodes = 1000000;
    std::unordered_set<std::string> codes;
    std::random_device rd;
    std::mt19937 rng(rd());

    // Generate unique codes
    while (codes.size() < numCodes) {
        std::string code = generateCode(rng);
        codes.insert(code);
    }

    // Write to JSON file
    std::ofstream file("code.json");
    if (!file) {
        std::cerr << "Error opening file for writing.\n";
        return 1;
    }

    file << "{\n";
    for (auto it = codes.begin(); it != codes.end(); ++it) {
        file << "  \"" << *it << "\": true";
        if (std::next(it) != codes.end()) {
            file << ",";
        }
        file << "\n";
    }
    file << "}\n";

    file.close();
    std::cout << "Code generation complete and saved to code.json.\n";
    return 0;
}

