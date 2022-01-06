#include <algorithm>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

const int BASE = 100;

class bigint {
private:
    static const int base = BASE;
    int digit_len = []() {
        int val = (base - 1) / 10;
        int res = 1;

        while (val > 0) {
            res += 1;
            val /= 10;
        }
        return res;
    }();
    std::vector<int> digits;

    void init(const int str_size) {
        const int initialSize =
            str_size / digit_len + static_cast<int>(str_size % digit_len != 0);
        digits.reserve(initialSize);
    }

    static std::string trim_zeros(const std::string &s) {
        // delimiting non-value zeros
        int start = 0;
        int str_size = static_cast<int>(s.size());

        for (int i = 0; i < str_size - 1 && str_size != 1; ++i) {
            if (s[i] == '0') {
                start++;
            } else {
                break;
            }
        }

        return s.substr(start, s.size() - start);
    }

    void construct_bigint_from_string(const std::string &s) {
        if (s.empty()) {
            return;
        }

        std::string cur = trim_zeros(s);
        std::reverse(begin(cur), end(cur));

        // resizing array
        int cur_size = static_cast<int>(cur.size());
        init(cur_size);

        // extructing digits depending on base
        for (int i = 0; i < cur_size; i += digit_len) {
            std::string digit;

            for (int k = i; k < std::min(i + digit_len, cur_size); k++) {
                digit += cur[k];
            }

            std::reverse(begin(digit), end(digit));

            int val = std::stoi(digit);
            digits.push_back(val);
        }
    }

    // cppcheck-suppress unusedPrivateFunction
    [[maybe_unused]] static int compare(const bigint &num1,
                                        const bigint &num2) {
        // returns:
        // -1: num1 < num2
        //  0: num1 == num2
        //  1: num1 > num2

        int size1 = num1.size();
        int size2 = num2.size();

        if (size1 < size2) {
            return -1;
        } else if (size1 > size2) {
            return 1;
        }

        int res = 0;

        const auto &d1 = num1.digits;
        const auto &d2 = num2.digits;

        for (int i = size1 - 1; i >= 0; i--) {
            if (d1[i] < d2[i]) {
                res = -1;
                break;
            } else if (d1[i] > d2[i]) {
                res = 1;
                break;
            }
        }

        return res;
    }

    // modifying num1
    static void make_sum_inplace(bigint &num1, const bigint &num2) {
        auto &d1 = num1.digits;
        const auto &d2 = num2.digits;

        // making sizes of both vectors equal
        while (d1.size() < d2.size()) {
            d1.push_back(0);
        }

        // making summ of 2 arrays
        int prev = 0;
        int i = 0;
        for (; i < static_cast<int>(d2.size()); ++i) {
            int a = d1[i];
            int b = d2[i];

            d1[i] = (a + b + prev) % bigint::base;
            prev = (a + b + prev) / bigint::base;
        }

        // while prev is still more than 0
        while (i < static_cast<int>(d1.size()) && prev > 0) {
            int a = d1[i];
            d1[i] = (a + prev) % bigint::base;
            prev = (a + prev) / bigint::base;

            i++;
        }

        if (prev > 0) {
            d1.push_back(prev);
        }
    }

    // modifying num1
    static void make_subtraction_inplace(bigint &num1, const bigint &num2) {
        auto &d1 = num1.digits;
        const auto &d2 = num2.digits;

        // making sizes of both vectors equal
        while (d1.size() < d2.size()) {
            d1.push_back(0);
        }

        // making substruction of 2 numbers
        int next = 0;
        int i = 0;
        for (; i < static_cast<int>(d2.size()); ++i) {
            int a = d1[i];
            int b = d2[i];

            bool is_less = false;
            if (a < b + next) {
                is_less = true;
                a += base;
            }

            d1[i] = a - b - next;

            next = is_less ? 1 : 0;
        }

        // while next order is not 0
        while (i < static_cast<int>(d1.size()) && next > 0) {
            int a = d1[i];

            bool is_less = false;
            if (a < next) {
                is_less = true;
                a += base;
            }

            d1[i] = a - next;

            next = is_less ? 1 : 0;

            i++;
        }

        while (static_cast<int>(d1.size()) > 1 && d1.back() == 0) {
            d1.pop_back();
        }
    }

public:
    // operators
    friend bool operator==(const bigint &num1, const bigint &num2);
    friend bool operator<(const bigint &num1, const bigint &num2);
    friend bool operator<=(const bigint &num1, const bigint &num2);
    friend bool operator>(const bigint &num1, const bigint &num2);
    friend bool operator>=(const bigint &num1, const bigint &num2);
    friend bool operator!=(const bigint &num1, const bigint &num2);
    explicit operator unsigned int() const {
        unsigned int num = 0;
        unsigned int order = 1;

        for (unsigned int digit : digits) {
            num += digit * order;
            order *= base;
        }

        return num;
    }
    friend bigint &operator+=(bigint &num1, const bigint &num2);
    friend bigint &operator-=(bigint &num1, const bigint &num2);
    friend std::istream &operator>>(std::istream &is, const bigint &num);

    // prefix increment
    bigint &operator++() {
        bigint::make_sum_inplace(*this, 1);
        return *this;
    }

    // postfix increment
    bigint operator++(int) {
        bigint unmodified_num = *this;
        bigint::make_sum_inplace(*this, 1);
        return unmodified_num;
    }

    // prefix decrement
    bigint &operator--() {
        bigint::make_subtraction_inplace(*this, 1);
        return *this;
    }

    // postfix decrement
    bigint operator--(int) {
        bigint unmodified_num = *this;
        bigint::make_subtraction_inplace(*this, 1);
        return unmodified_num;
    }

    bigint() {
        digits.push_back(0);
    };

    // cppcheck-suppress noExplicitConstructor
    explicit bigint(const std::string &s) {
        construct_bigint_from_string(s);
    }

    // cppcheck-suppress noExplicitConstructor
    bigint(const unsigned int num) {
        const std::string s = std::to_string(num);
        construct_bigint_from_string(s);
    }

    [[nodiscard]] std::string to_string() const {
        std::string num;

        int digits_size = static_cast<int>(digits.size());
        for (int i = 0; i < digits_size; ++i) {
            int el = digits[i];
            std::string elem = std::to_string(el);
            std::string symbol;

            // insert zeros in front of digit if it length is less than BASE
            int forward_zeros_count = digit_len - static_cast<int>(elem.size());
            for (int k = 0; k < forward_zeros_count && i != digits_size - 1;
                 k++) {
                symbol += "0";
            }
            symbol += elem;
            std::reverse(begin(symbol), end(symbol));

            num += symbol;
        }

        std::reverse(begin(num), end(num));
        return num;
    }

    [[nodiscard]] int size() const {
        return static_cast<int>(digits.size());
    }
};

bool operator==(const bigint &num1, const bigint &num2) {
    return (bigint::compare(num1, num2) == 0);
}

bool operator!=(const bigint &num1, const bigint &num2) {
    return static_cast<bool>(bigint::compare(num1, num2) != 0);
}

bool operator<(const bigint &num1, const bigint &num2) {
    return static_cast<bool>(bigint::compare(num1, num2) == -1);
}

bool operator<=(const bigint &num1, const bigint &num2) {
    int res = bigint::compare(num1, num2);
    return static_cast<bool>(res == -1 || res == 0);
}

bool operator>(const bigint &num1, const bigint &num2) {
    int res = bigint::compare(num1, num2);
    return static_cast<bool>(res == 1);
}

bool operator>=(const bigint &num1, const bigint &num2) {
    int res = bigint::compare(num1, num2);
    return static_cast<bool>(res == 1 || res == 0);
}

bigint operator+(const bigint &num1, const bigint &num2) {
    bigint res = num1;
    res += num2;

    return res;
}

bigint &operator+=(bigint &num1, const bigint &num2) {
    bigint::make_sum_inplace(num1, num2);
    return num1;
}

bigint operator-(const bigint &num1, const bigint &num2) {
    bigint res = num1;
    res -= num2;

    return res;
}

bigint &operator-=(bigint &num1, const bigint &num2) {
    bigint::make_subtraction_inplace(num1, num2);
    return num1;
}

std::ostream &operator<<(std::ostream &os, const bigint &num) {
    os << num.to_string();
    return os;
}

std::istream &operator>>(std::istream &is, bigint &num) {
    std::string s;
    is >> s;
    num = bigint(s);
    return is;
}