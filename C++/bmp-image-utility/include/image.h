#ifndef IMAGE_H_
#define IMAGE_H_

#include <cassert>
#include <cstdint>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

namespace lab_bmp {

#pragma pack(push, 1)

struct BMPFileHeader {
    std::uint16_t file_type = 0;
    std::uint32_t file_size = 0;
    std::uint16_t reserved1 = 0;
    std::uint16_t reserved2 = 0;
    std::uint32_t offset_data = 0;

    inline static const std::uint16_t REQUIRED_FILE_TYPE = 0x4D42;
};

struct BMPInfoHeader {
    std::uint32_t size = 0;
    std::int32_t width = 0;
    std::int32_t height = 0;
    std::uint16_t planes = 1;
    std::uint16_t bit_count = 0;
    std::uint32_t compression = 0;
    std::uint32_t size_image = 0;
    std::int32_t xpixels_per_meter = 0;
    std::int32_t ypixels_per_meter = 0;
    std::uint32_t colors_used = 0;
    std::uint32_t colors_important = 0;

    inline static const std::uint16_t REQUIRED_BIT_COUNT = 24;
};

#pragma pack(pop)

struct image {
    explicit image(const std::string &filename);

    void read(const std::string &filename);

    void write(const std::string &filename);

    void crop(int x_px, int y_px, int w_px, int h_px);

    void rotate();

private:
    std::vector<std::uint8_t> data;
    BMPFileHeader file_header;
    BMPInfoHeader bmp_info_header;
};

}  // namespace lab_bmp

#endif  // IMAGE_H_