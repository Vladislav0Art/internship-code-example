#include "mytest.h"
#include "mytest_internal.h"

namespace mytest {

// struct FunctionSaver
FunctionSaver::FunctionSaver(const ::std::string &name,
                             const ::std::function<void()> &func) {
    addTestCase(name, func);
}

// struct SubcaseDto
SubcaseDto::SubcaseDto() = default;

SubcaseDto::SubcaseDto(::std::string subcaseName)
    : name(std::move(subcaseName)) {
}

::std::string mytest::SubcaseDto::getName() const {
    return this->name;
}

// struct SubcaseInitializer
// NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
int SubcaseInitializer::idOfCurrentSubcase = 0;
// NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
bool SubcaseInitializer::isExecutedSubcaseChosen = false;
// NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
bool SubcaseInitializer::skippedSubcase = false;
// NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
::std::set<int> mytest::SubcaseInitializer::executedSubcases;

// NOLINTNEXTLINE(cppcoreguidelines-macro-usage)
#define mIntAlias ::std::map<int, int>
// NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
mIntAlias mytest::SubcaseInitializer::executableSubcaseOnNestingLevel;

// NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
int SubcaseInitializer::currentNestingLevel = -1;

// NOLINTNEXTLINE(cppcoreguidelines-macro-usage)
#define umSetAlias ::std::unordered_map<int, ::std::set<int>>
// NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
umSetAlias mytest::SubcaseInitializer::nestedSubcases;

// NOLINTNEXTLINE(cppcoreguidelines-macro-usage)
#define umIntAlias ::std::unordered_map<int, int>
// NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
umIntAlias mytest::SubcaseInitializer::countOfExecutedNestedSubcases;

// NOLINTNEXTLINE(cppcoreguidelines-avoid-non-const-global-variables)
::std::vector<mytest::SubcaseDto> mytest::SubcaseInitializer::subcasesTrace;

// all logic related to subcases located in SubcaseInitializer struct
SubcaseInitializer::SubcaseInitializer() {
    this->isNextOneToBeExecuted = false;
    this->id = -1;
};

SubcaseInitializer::SubcaseInitializer(const ::std::string &name) {
    this->isNextOneToBeExecuted = false;
    this->name = name;

    // setting id of subcase
    this->id = SubcaseInitializer::idOfCurrentSubcase;
    // increasing id of next subcase
    SubcaseInitializer::idOfCurrentSubcase++;

    // increasing nesting level
    mytest::SubcaseInitializer::currentNestingLevel++;
    const int currNestingLevel = SubcaseInitializer::currentNestingLevel;

    // inserting id of current subcase in set of its parent, if parent exists
    if (SubcaseInitializer::executableSubcaseOnNestingLevel.count(
            currNestingLevel - 1) > 0UL) {
        const int parentId = SubcaseInitializer::executableSubcaseOnNestingLevel
            [currNestingLevel - 1];
        SubcaseInitializer::nestedSubcases[parentId].insert(this->id);
    }

    // if not failed on current evel and not executed before
    if (!hasFailedOnPassedLevel(currNestingLevel) &&
        !hasInExecutedSubcases(this->id)) {
        // if next executed subcase is not chosen on current nesting level
        if (SubcaseInitializer::executableSubcaseOnNestingLevel.count(
                currNestingLevel) == 0UL) {
            // setting current subcase to be executed on current level
            SubcaseInitializer::executableSubcaseOnNestingLevel
                [currNestingLevel] = this->id;

            // setting mark that current subcase has to be executed
            this->isNextOneToBeExecuted = true;

            // inserting subcase dto in subcases trace
            const SubcaseDto subcaseDto(name);
            SubcaseInitializer::subcasesTrace.emplace_back(subcaseDto);
        }
        // if next subcase to execute was set
        else {
            SubcaseInitializer::skippedSubcase = true;
        }
    }
}

SubcaseInitializer::~SubcaseInitializer() {
    const int subcaseNestingLevel = SubcaseInitializer::currentNestingLevel;
    // decreasing current nesting level
    SubcaseInitializer::currentNestingLevel--;

    const int countNestedSubcases =
        countNestedSubcasesOnEveryLevel(this->id, subcaseNestingLevel, 0);

    // if current subcase is not the one that was executed
    if (!this->isNextOneToBeExecuted) {
        // increasing id of next subcase
        SubcaseInitializer::idOfCurrentSubcase += countNestedSubcases;
    } else {
        // increasing count of executed nested subcase of parent subcase, if
        // parent exists
        if (SubcaseInitializer::executableSubcaseOnNestingLevel.count(
                subcaseNestingLevel - 1) != 0UL) {
            const int parentId = SubcaseInitializer::
                executableSubcaseOnNestingLevel[subcaseNestingLevel - 1];
            SubcaseInitializer::countOfExecutedNestedSubcases[parentId]++;
        }

        // if count of executed nested subcases equals to count of all nested
        // subcases of current subcase, then put current subcase in set of
        // executed subcases
        const int countOfExecutedSubcases =
            SubcaseInitializer::countOfExecutedNestedSubcases[this->id];
        const int countOfNestedSubcases = static_cast<int>(
            SubcaseInitializer::nestedSubcases[this->id].size());

        if (countOfExecutedSubcases == countOfNestedSubcases) {
            SubcaseInitializer::executedSubcases.insert(this->id);
        }
    }
}

SubcaseInitializer::operator bool() const {
    return this->isNextOneToBeExecuted;
}

// helper functions

bool hasInExecutedSubcases(const int subcaseId) {
    return SubcaseInitializer::executedSubcases.find(subcaseId) !=
           SubcaseInitializer::executedSubcases.end();
}

// returns map with status of failure of all nesting levels by link
::std::unordered_map<int, bool> &getMapOfFailureStatuses() {
    static ::std::unordered_map<int, bool> mapOfFailureStatuses;
    return mapOfFailureStatuses;
}

void clearMapOfFailureStatuses() {
    getMapOfFailureStatuses().clear();
}

// checks failure status of passed level
bool hasFailedOnPassedLevel(const int nestingLevel) {
    return static_cast<bool>(getMapOfFailureStatuses().count(nestingLevel));
}

// sets failure status on passed level in map
void setFailureStatusOnPassedLevel(const int nestingLevel) {
    getMapOfFailureStatuses()[nestingLevel] = true;
}

// checks failure statuses of all nesting levels
bool hasFailedAny() {
    bool result = false;
    const ::std::unordered_map<int, bool> &failedStatusInfo =
        getMapOfFailureStatuses();

    for (const auto &p : failedStatusInfo) {
        const bool failedStatus = p.second;
        result |= failedStatus;

        if (result) {
            break;
        }
    }

    return result;
}

void setDefaultValues() {
    // setting skipped flag to false
    SubcaseInitializer::skippedSubcase = false;
    // setting id to default 0 value
    SubcaseInitializer::idOfCurrentSubcase = 0;
    // next one to be executed is not chosen by default
    SubcaseInitializer::isExecutedSubcaseChosen = false;

    // clearing subcases that were being executed
    SubcaseInitializer::executableSubcaseOnNestingLevel.clear();
    // clearing subcases trace
    SubcaseInitializer::subcasesTrace.clear();
    // setting current nesting level to default value
    SubcaseInitializer::currentNestingLevel = -1;
}

// counts all nested subcases of passed subcase recursively
// NOLINTNEXTLINE(misc-no-recursion)
int countNestedSubcasesOnEveryLevel(const int subcaseId,
                                    int nestingLevel,
                                    int result) {
    // set of nested subcases
    const auto &nestedSubcases = SubcaseInitializer::nestedSubcases[subcaseId];

    for (const auto &nestedSubcaseId : nestedSubcases) {
        result = countNestedSubcasesOnEveryLevel(nestedSubcaseId,
                                                 nestingLevel + 1, result);
        result++;
    }
    return result;
}

::std::vector<::std::pair<::std::string, ::std::function<void()>>>
    &getTestCases() {
    static ::std::vector<::std::pair<::std::string, ::std::function<void()>>>
        testCases;
    return testCases;
}

void addTestCase(const ::std::string &name,
                 const ::std::function<void()> &func) {
    getTestCases().emplace_back(name, func);
}

void sortTestCases(
    ::std::vector<::std::pair<::std::string, ::std::function<void()>>>
        &testCases) {
    ::std::sort(
        ::std::begin(testCases), ::std::end(testCases),
        [](const auto &p1, const auto &p2) { return p1.first < p2.first; });
}

// sets failed status to true
// cppcheck-suppress unusedFunction
[[maybe_unused]] void printOnError(bool shouldPrintErr,
                                   const ::std::string &expr,
                                   const ::std::string &filePath,
                                   const int line,
                                   const ::std::optional<std::string> &msg) {
    if (!shouldPrintErr) {
        return;
    }

    ::std::cerr << "CHECK(" << expr << ")"
                << " at " << filePath << ":" << line << " failed!"
                << ::std::endl;

    if (msg.has_value()) {
        ::std::cerr << "    message: " << msg.value() << ::std::endl;
    }

    // printing subcases trace
    for (const auto &subcaseDto : mytest::SubcaseInitializer::subcasesTrace) {
        ::std::cerr << "    in subcase " << subcaseDto.getName() << ::std::endl;
    }

    // setting failure status
    setFailureStatusOnPassedLevel(SubcaseInitializer::currentNestingLevel);
}

// returns 1 if all passed successfully, otherwise returns zero
bool runTests() {
    auto &testCases = getTestCases();
    sortTestCases(testCases);

    int totalCountOfTests = static_cast<int>(testCases.size());
    int passedTests = totalCountOfTests;

    for (const auto &testCasePair : testCases) {
        const auto &name = testCasePair.first;
        const auto &function = testCasePair.second;

        ::std::cerr << "Running " << '"' << name << '"' << "..." << ::std::endl;

        // choosing subcase to execute while all of them are not executed
        do {
            // reseting all SubcaseInitializer variables
            setDefaultValues();

            // calling TEST_CASE function
            function();

            // if there are more than 1 subcase and none failed on previous
            // iteration
            if (SubcaseInitializer::skippedSubcase && !hasFailedAny()) {
                ::std::cerr << "...another subcase..." << ::std::endl;
            }

            // running while has skipped subcases and error did not occur
        } while (SubcaseInitializer::skippedSubcase && !hasFailedAny());

        // clearing
        SubcaseInitializer::executedSubcases.clear();
        SubcaseInitializer::nestedSubcases.clear();
        SubcaseInitializer::countOfExecutedNestedSubcases.clear();

        // if any failed
        if (hasFailedAny()) {
            passedTests--;
        }
        clearMapOfFailureStatuses();
    }

    ::std::cerr << "===== Tests passed: " << passedTests << "/"
                << totalCountOfTests << " =====" << ::std::endl;

    return passedTests == totalCountOfTests;
}

}  // namespace mytest