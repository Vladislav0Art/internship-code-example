#ifndef MY_TEST_H_
#define MY_TEST_H_

#include <functional>
#include <iostream>
#include <map>
#include <optional>
#include <set>
#include <string>
#include <unordered_map>

namespace mytest {

struct FunctionSaver {
    FunctionSaver(const ::std::string &name,
                  const ::std::function<void()> &func);
};

struct SubcaseDto {  // data transfer object for subcase
private:
    ::std::string name;

public:
    SubcaseDto();
    explicit SubcaseDto(::std::string subcaseName);
    [[nodiscard]] ::std::string getName() const;
};

struct SubcaseInitializer {
private:
    int id = -1;
    bool isNextOneToBeExecuted = false;
    ::std::string name;

public:
    // NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
    static int idOfCurrentSubcase;
    // NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
    static bool isExecutedSubcaseChosen;
    // NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
    static bool skippedSubcase;
    // NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
    static ::std::set<int> executedSubcases;
    // NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
    static ::std::map<int, int> executableSubcaseOnNestingLevel;
    // { nesting level: id of subcase to execute }

    // NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
    static int currentNestingLevel;
    // NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
    static ::std::unordered_map<int, ::std::set<int>> nestedSubcases;
    // { subcase id: set of its nested subcases (only first nesting level) }

    // NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
    static ::std::unordered_map<int, int> countOfExecutedNestedSubcases;
    // { subcase id: count of its executed nested subcases (only first nestint
    // level) }

    // NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
    static ::std::vector<SubcaseDto> subcasesTrace;
    // array of subcases that are being executed

    // constructors
    SubcaseInitializer();
    explicit SubcaseInitializer(const ::std::string &name);

    SubcaseInitializer(const SubcaseInitializer &) = delete;
    SubcaseInitializer(SubcaseInitializer &&) = delete;
    SubcaseInitializer &operator=(const SubcaseInitializer &) = delete;
    SubcaseInitializer &operator=(SubcaseInitializer &&) = delete;

    // destructors
    ~SubcaseInitializer();

    explicit operator bool() const;
};

void printOnError(bool shouldPrintErr,
                  const ::std::string &expr,
                  const ::std::string &filePath,
                  int line,
                  const ::std::optional<std::string> &msg);

}  // namespace mytest

// macros

// NOLINTNEXTLINE(cppcoreguidelines-macro-usage)
#define CHECK(expr) \
    ::mytest::printOnError((!(expr)), #expr, __FILE__, __LINE__, ::std::nullopt)

// NOLINTNEXTLINE(cppcoreguidelines-macro-usage)
#define CHECK_MESSAGE(expr, msg) \
    ::mytest::printOnError((!(expr)), #expr, __FILE__, __LINE__, msg)

// NOLINTNEXTLINE(cppcoreguidelines-macro-usage)
#define MYTEST_INTERNAL_CONCAT_INTERNAL_LAYER(x, y) x##_##y

// NOLINTNEXTLINE(cppcoreguidelines-macro-usage)
#define MYTEST_INTERNAL_CONCAT(x, y) MYTEST_INTERNAL_CONCAT_INTERNAL_LAYER(x, y)

// NOLINTNEXTLINE(cppcoreguidelines-macro-usage)
#define TEST_CASE(name)                                                \
    static void MYTEST_INTERNAL_CONCAT(mytest_func, __LINE__)();       \
    const ::mytest::FunctionSaver MYTEST_INTERNAL_CONCAT(mytest_saver, \
                                                         __LINE__)(    \
        name, MYTEST_INTERNAL_CONCAT(mytest_func, __LINE__));          \
    void MYTEST_INTERNAL_CONCAT(mytest_func, __LINE__)()

// NOLINTNEXTLINE(cppcoreguidelines-macro-usage)
#define SUBCASE(name)                                                       \
    if (::mytest::SubcaseInitializer MYTEST_INTERNAL_CONCAT(mytest_subcase, \
                                                            __LINE__){name})

#endif
