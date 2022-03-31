#include "image.h"

int main(int argc, char *argv[]) {
    try {
        if (argc != 8) {
            throw std::runtime_error("Missing arguments");
        }

        std::string input(argv[2]);
        lab_bmp::image img(input);

        int x = std::stoi(argv[4]);
        int y = std::stoi(argv[5]);

        int w = std::stoi(argv[6]);
        int h = std::stoi(argv[7]);

        img.crop(x, y, w, h);
        img.rotate();

        std::string output(argv[3]);
        img.write(output);
    } catch (const std::exception &err) {
        std::cerr << err.what() << std::endl;
        return 1;
    }

    return 0;
}

/*

Usage:

./executable crop-rotate path/to/image.bmp new-image-name.bmp x y w h
x, y - where to start cropping
w, h - size of rectangle to crop

*/