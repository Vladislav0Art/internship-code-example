#include "image.h"
#include "exceptions.h"

namespace lab_bmp {

image::image(const std::string &filename) {
    read(filename);
}

void image::read(const std::string &filename) {
    std::ifstream file(filename, std::fstream::in | std::fstream::binary);

    if (!file.is_open()) {
        throw opening_file_exception(filename);
    }

    // file header
    file.read(reinterpret_cast<char *>(&file_header), sizeof(file_header));

    if (file_header.file_type != BMPFileHeader::REQUIRED_FILE_TYPE) {
        throw invalid_file_type_exception();
    }

    // info header
    file.read(reinterpret_cast<char *>(&bmp_info_header),
              sizeof(bmp_info_header));

    if (bmp_info_header.size != sizeof(BMPInfoHeader)) {
        throw invalid_version_exception(sizeof(BMPInfoHeader),
                                        bmp_info_header.size);
    }

    if (bmp_info_header.height <= 0) {
        throw invalid_height_exception(bmp_info_header.height);
    }

    if (bmp_info_header.bit_count != BMPInfoHeader::REQUIRED_BIT_COUNT) {
        throw invalid_bit_count_exception(BMPInfoHeader::REQUIRED_BIT_COUNT,
                                          bmp_info_header.bit_count);
    }

    if (bmp_info_header.colors_used != 0U) {
        throw color_palette_exception();
    }

    // find pixel data location
    file.seekg(file_header.offset_data, std::ifstream::beg);

    // bytes count of each row without padding
    const auto row_in_bytes =
        bmp_info_header.width * bmp_info_header.bit_count / 8U;
    const auto padding = (4 - row_in_bytes % 4) % 4;

    data.resize((row_in_bytes + padding) * bmp_info_header.height);

    try {
        file.read(reinterpret_cast<char *>(data.data()),
                  static_cast<std::streamsize>(data.size()));
    } catch (const std::bad_alloc &) {
        throw insufficient_memory_exception();
    }
}

void image::write(const std::string &filename) {
    std::ofstream file(filename, std::ofstream::out | std::ofstream::binary);

    file.write(reinterpret_cast<char *>(&file_header), sizeof(file_header));
    file.write(reinterpret_cast<char *>(&bmp_info_header),
               sizeof(bmp_info_header));

    file.write(reinterpret_cast<char *>(data.data()),
               static_cast<std::streamsize>(data.size()));
}

void image::crop(int x_px, int y_px, int w_px, int h_px) {
    const auto bytes_in_px = bmp_info_header.bit_count / 8;
    const auto bytes_in_row = bmp_info_header.width * bytes_in_px;

    const auto prev_padding = (4 - bytes_in_row % 4) % 4;

    const auto new_padding_bytes = (4 - w_px * bytes_in_px % 4) % 4;
    const auto size_bytes = (w_px * bytes_in_px + new_padding_bytes) * h_px;

    std::vector<std::uint8_t> cropped_data;
    cropped_data.reserve(size_bytes);

    const auto w_bytes = w_px * bytes_in_px;

    if (!(0 <= x_px && x_px < x_px + w_px &&
          x_px + w_px <= bmp_info_header.width) ||
        !(0 <= y_px && y_px < y_px + h_px &&
          y_px + h_px <= bmp_info_header.height)) {
        throw cropping_bounds_exception();
    }

    for (auto line_px = h_px; line_px > 0; line_px--) {
        const auto pos = (bmp_info_header.height - y_px - line_px) *
                             (bytes_in_row + prev_padding) +
                         x_px * bytes_in_px;

        for (auto i = pos; i < pos + w_bytes; i++) {
            cropped_data.push_back(data[i]);
        }

        for (auto i = 0; i < new_padding_bytes; i++) {
            cropped_data.push_back(0);
        }
    }

    data = std::move(cropped_data);

    bmp_info_header.height = h_px;
    bmp_info_header.width = w_px;
    bmp_info_header.size_image = static_cast<std::uint32_t>(data.size());

    file_header.file_size = sizeof(bmp_info_header) + sizeof(file_header) +
                            static_cast<std::uint32_t>(data.size());
}

void image::rotate() {
    const auto bytes_in_px = bmp_info_header.bit_count / 8;

    const auto h_px = bmp_info_header.height;
    const auto w_px = bmp_info_header.width;

    const auto w_bytes = w_px * bytes_in_px;
    const auto prev_padding = (4 - w_bytes % 4) % 4;

    [[maybe_unused]] const auto new_padding = (4 - h_px * bytes_in_px % 4) % 4;

    std::vector<std::uint8_t> rotated_data;
    rotated_data.reserve(data.size());

    for (int i = 0; i < w_px; i++) {
        const auto row_offset = w_bytes - (i + 1) * bytes_in_px;

        for (int j = 0; j < h_px; j++) {
            const auto row = (w_bytes + prev_padding) * j;

            for (int k = 0; k < bytes_in_px; k++) {
                rotated_data.push_back(data[row + row_offset + k]);
            }
        }

        for (auto k = 0; k < new_padding; k++) {
            rotated_data.push_back(0);
        }
    }

    data = std::move(rotated_data);

    bmp_info_header.height = w_px;
    bmp_info_header.width = h_px;
}

}  // namespace lab_bmp