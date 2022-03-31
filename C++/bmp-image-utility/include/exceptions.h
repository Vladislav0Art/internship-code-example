#ifndef EXCEPTIONS_H_
#define EXCEPTIONS_H_

#include <cstdint>
#include <stdexcept>
#include <string>

namespace lab_bmp {

struct bmp_exception : std::runtime_error {
    explicit bmp_exception(std::string msg);
};

struct invalid_file_type_exception : bmp_exception {
    invalid_file_type_exception();
};

struct missing_arguments_exception : bmp_exception {
    missing_arguments_exception();
};

struct opening_file_exception : bmp_exception {
    explicit opening_file_exception(std::string filename);
};

struct invalid_version_exception : bmp_exception {
    explicit invalid_version_exception(std::uint32_t expected_hdr_size,
                                       std::uint32_t provided_hdr_size);
};

struct invalid_height_exception : bmp_exception {
    explicit invalid_height_exception(int height);
};

struct invalid_bit_count_exception : bmp_exception {
    explicit invalid_bit_count_exception(int expected_bits, int provided_bits);
};

struct color_palette_exception : bmp_exception {
    color_palette_exception();
};

struct cropping_bounds_exception : bmp_exception {
    cropping_bounds_exception();
};

struct insufficient_memory_exception : bmp_exception {
    insufficient_memory_exception();
};

}  // namespace lab_bmp

#endif  // EXCEPTIONS_H_