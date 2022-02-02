#ifndef UNIQUE_PTR_H_
#define UNIQUE_PTR_H_

#include <memory>
#include <utility>

namespace ptrs::unique {

template <typename T>
struct DefaultDeleter {
    void operator()(T *object) {
        delete object;
    }
};

template <typename T, typename Deleter = DefaultDeleter<T> >
struct unique_ptr {
    // default ctor
    unique_ptr() : object(nullptr) {
    }

    // std::nullptr_t ctor
    // cppcheck-suppress noExplicitConstructor
    unique_ptr(std::nullptr_t) : object(nullptr) {
    }

    // ctor with raw pointer
    explicit unique_ptr(T *object) : object(std::move(object)) {
    }

    // ctor with raw pointer and deleter (copying deleter)
    unique_ptr(T *object, const Deleter &deleter)
        : object(std::move(object)), deleter(deleter) {
    }

    // ctor with raw pointer and deleter (moving deleter)
    unique_ptr(T *object, Deleter &&deleter)
        : object(std::move(object)), deleter(std::move(deleter)) {
    }

    // move ctor
    unique_ptr(unique_ptr &&other)
        : object(std::exchange(other.object, nullptr)),
          deleter(std::move(other.deleter)) {
    }

    // copy ctor
    unique_ptr(const unique_ptr &other) = delete;

    // move assignment
    unique_ptr &operator=(unique_ptr &&other) {
        if (this != &other) {
            // if object is not nullptr then free memory
            if (this->object != nullptr) {
                // calling self deletor to free used memory in current unique
                // ptr
                this->deleter(this->object);
            }

            this->object = std::exchange(other.object, nullptr);
            this->deleter = std::move(other.deleter);
        }
        return *this;
    }

    // copy assignment
    unique_ptr &operator=(const unique_ptr &other) = delete;

    // dtor
    ~unique_ptr() {
        if (this->object != nullptr) {
            this->deleter(this->object);
        }
    }

    // methods

    [[nodiscard]] T *get() const {
        return this->object;
    }

    friend void swap(unique_ptr<T, Deleter> &first,
                     unique_ptr<T, Deleter> &second) {
        // swapping pointes
        std::swap(first.object, second.object);
        // swapping deleters
        std::swap(first.deleter, second.deleter);
    }

    void reset() {
        // if object is not nullptr already
        if (this->object != nullptr) {
            // free memory
            this->deleter(this->object);
            // setting pointer to nullptr (to avoid double-free issue)
            this->object = nullptr;
        }
    }

    void reset(T *other) {
        if (this->object != other) {
            // free memory in object is not nullptr
            if (this->object != nullptr) {
                this->deleter(this->object);
            }
            // start owning memory of other pointer
            this->object = std::move(other);
        }
    }

    T *release() {
        return std::exchange(this->object, nullptr);
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

    [[nodiscard]] bool operator==(const unique_ptr &other) const {
        return this->object == other.object;
    }

    [[nodiscard]] bool operator!=(const unique_ptr &other) const {
        return this->object != other.object;
    }

private:
    T *object;
    Deleter deleter;
};

}  // namespace ptrs::unique

#endif  // UNIQUE_PTR_H_