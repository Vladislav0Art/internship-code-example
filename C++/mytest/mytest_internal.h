#ifndef MY_TEST_INTERNAL_H_
#define MY_TEST_INTERNAL_H_

#include <algorithm>
#include <functional>
#include <string>
#include <vector>

namespace mytest {

struct FunctionSaver;
struct SubcaseInitializer;

::std::vector<::std::pair<::std::string, ::std::function<void()>>>
    &getTestCases();

void addTestCase(const ::std::string &name,
                 const ::std::function<void()> &func);

void sortTestCases(
    ::std::vector<::std::pair<::std::string, ::std::function<void()>>>
        &testCases);

bool runTests();

::std::unordered_map<int, bool> &getMapOfFailureStatuses();

bool hasFailedOnPassedLevel(int nestingLevel);

void setFailureStatusOnPassedLevel(int nestingLevel);

bool hasFailedAny();

void clearMapOfFailureStatuses();

void setDefaultValues();

bool hasInExecutedSubcases(int subcaseId);

int countNestedSubcasesOnEveryLevel(int subcaseId,
                                    int nestingLevel,
                                    int result);

}  // namespace mytest

#endif
