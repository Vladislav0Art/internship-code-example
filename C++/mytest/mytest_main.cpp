#include "mytest.h"
#include "mytest_internal.h"

int main() {
    bool allPassed = ::mytest::runTests();

    if (allPassed) {
        return 0;
    } else {
        return 1;
    }
}
