#ifndef SHARED_PTR_H_
#define SHARED_PTR_H_

#include <cassert>
#include <utility>

namespace ptrs::shared {

template <typename T>
struct shared_ptr {
    // default ctor
    shared_ptr() : object(nullptr), counter(nullptr) {
    }

    // raw pointer ctor
    explicit shared_ptr(T *object)
        : object(std::move(object)), counter(nullptr) {
        // if set object is not nullptr, then start counting
        if (this->object != nullptr) {
            this->counter = new int(1);
        }
    }

    // nullptr_t ctor
    // cppcheck-suppress noExplicitConstructor
    shared_ptr(std::nullptr_t) : object(nullptr), counter(nullptr) {
    }

    // copy ctor
    shared_ptr(const shared_ptr &other)
        :  // cppcheck-suppress copyCtorPointerCopying
          object(other.object),
          // cppcheck-suppress copyCtorPointerCopying
          counter(other.counter) {
        // if provided object is not nullptr then increase counter
        if (this->object != nullptr) {
            (*this->counter)++;
        }
    }

    // copy assignment operator
    shared_ptr &operator=(const shared_ptr &other) {
        // if objects are different
        if (this->object != other.object) {
            // unbinding from previous state
            this->unbindFromCurrentObject();

            // setting new state
            this->object = other.object;
            this->counter = other.counter;

            // if object is not null, then increment count of sharing pointers
            if (this->object != nullptr) {
                (*this->counter)++;
            }
        }

        return *this;
    }

    // move ctor
    shared_ptr(shared_ptr &&other)
        : object(std::exchange(other.object, nullptr)),
          counter(std::exchange(other.counter, nullptr)) {
    }

    // move assignment operator
    shared_ptr &operator=(shared_ptr &&other) {
        // if not self assigning
        if (this != &other) {
            // unbinding ownership from current object
            this->unbindFromCurrentObject();

            // moving values from other shared pointer
            this->object = std::exchange(other.object, nullptr);
            this->counter = std::exchange(other.counter, nullptr);
        }
        return *this;
    }

    // dtor
    ~shared_ptr() {
        // unbinding ownership from current object
        this->unbindFromCurrentObject();
    }

    // methods

    [[nodiscard]] T *get() const {
        return this->object;
    }

    friend void swap(shared_ptr<T> &first, shared_ptr<T> &second) {
        std::swap(first.object, second.object);
        std::swap(first.counter, second.counter);
    }

    void reset() {
        // unbinding owning from current object
        this->unbindFromCurrentObject();

        // setting current pointer to default state
        this->object = nullptr;
        this->counter = nullptr;
    }

    void reset(T *other) {
        // if not resetting with the same object
        if (this->object != other) {
            // unbinding ownership from current object
            this->unbindFromCurrentObject();

            // starting owning provided object
            this->object = std::move(other);

            // if provided object is not nullptr
            if (this->object != nullptr) {
                this->counter = new int(1);
            } else {
                // keeping invariant: object == nullptr <=> counter == nullptr
                this->counter = nullptr;
            }
        }
    }

    // operators
    [[nodiscard]] T &operator*() const {
        return *(this->object);
    }

    [[nodiscard]] T *operator->() const {
        return this->object;
    }

    [[nodiscard]] explicit operator bool() const {
        return this->object != nullptr;
    }

    [[nodiscard]] bool operator==(const shared_ptr &other) const {
        return this->object == other.object;
    }

    [[nodiscard]] bool operator!=(const shared_ptr &other) const {
        return this->object != other.object;
    }

private:  // methods
    void unbindFromCurrentObject() {
        if (this->counter != nullptr) {
            // decrementing count of shared pointers of current object
            (*this->counter)--;

            // asserting counter is non-negative
            assert(*this->counter >= 0);

            // if current shared pointer is the last one that owns the object
            if (*this->counter == 0) {
                delete this->object;
                delete this->counter;
            } else {
                // if current shared pointer is not the last one, then set its
                // pointers to nullptr
                this->object = nullptr;
                this->counter = nullptr;
            }
        }
    }

    // NOLINTNEXTLINE(readability-redundant-access-specifiers)
private:  // methods end
          // NOLINTNEXTLINE(readability-redundant-access-specifiers)
private:
    T *object;
    // cppcheck-suppress unsafeClassCanLeak
    // NOLINTNEXTLINE(modernize-use-default-member-init)
    int *counter;
};

}  // namespace ptrs::shared

#endif  // SHARED_PTR_H_