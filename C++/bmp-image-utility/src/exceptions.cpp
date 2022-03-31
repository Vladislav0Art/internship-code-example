#include "exceptions.h"

namespace lab_bmp {

// cppcheck-suppress passedByValue;
// NOLINTNEXTLINE(performance-unnecessary-value-param)
bmp_exception::bmp_exception(std::string msg) : std::runtime_error(msg) {
}

invalid_file_type_exception::invalid_file_type_exception()
    : bmp_exception("Invalid file type") {
}

missing_arguments_exception::missing_arguments_exception()
    : bmp_exception("Missing arguments") {
}

// cppcheck-suppress passedByValue;
// NOLINTNEXTLINE(performance-unnecessary-value-param)
opening_file_exception::opening_file_exception(std::string filename)
    : bmp_exception("Unable to open file \"" + filename + "\"") {
}

invalid_version_exception::invalid_version_exception(
    std::uint32_t expected_hdr_size,
    std::uint32_t provided_hdr_size)
    : bmp_exception("Invalid BMP: expected version 3 and header size" +
                    std::to_string(expected_hdr_size) +
                    ", but header size is " +
                    std::to_string(provided_hdr_size)) {
}

invalid_height_exception::invalid_height_exception(const int height)
    : bmp_exception("Invalid BMP: expected positive biHeight, got " +
                    std::to_string(height)) {
}

invalid_bit_count_exception::invalid_bit_count_exception(int expected_bits,
                                                         int provided_bits)
    : bmp_exception("Invalid BMP: expected " + std::to_string(expected_bits) +
                    " bits per pixel, got " + std::to_string(provided_bits)) {
}

color_palette_exception::color_palette_exception()
    : bmp_exception("Invalid BMP: color palette is unsupported") {
}

cropping_bounds_exception::cropping_bounds_exception()
    : bmp_exception("The requested area is not a subimage") {
}

insufficient_memory_exception::insufficient_memory_exception()
    : bmp_exception("Insufficient memory") {
}

}  // namespace lab_bmp