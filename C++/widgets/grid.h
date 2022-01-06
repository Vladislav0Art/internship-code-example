#ifndef GRID_H_
#define GRID_H_

#include <iostream>
#include <memory>
#include <vector>
#include "abstract_widgets.h"

namespace widgets {

struct grid final : widgets::container {
    explicit grid(const int rows, const int columns) {
        this->m_rows = rows;
        this->m_columns = columns;
        this->m_width = 0;
        this->m_height = 0;

        // resizing matrix
        this->m_matrix.resize(rows);

        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                m_matrix[row].emplace_back(nullptr);
            }
        }

        // resizing vectors of row heights and columns widths
        this->m_row_heights.resize(rows);
        this->m_column_widths.resize(columns);
    }

    [[nodiscard]] int width() const final {
        return this->m_width;
    }

    [[nodiscard]] int height() const final {
        return this->m_height;
    }

    [[nodiscard]] ::widgets::widget *child_at(const int x, const int y) final {
        int current_x = x;
        int current_y = y;

        int current_row = 0;
        int current_column = 0;

        const int total_rows = this->rows();
        const int total_columns = this->columns();

        // going through rows
        for (; current_row < total_rows &&
               current_y - this->m_row_heights[current_row] >= 0;
             current_row++) {
            current_y -= this->m_row_heights[current_row];
        }

        // going through columns
        for (; current_column < total_columns &&
               current_x - this->m_column_widths[current_column] >= 0;
             current_column++) {
            current_x -= this->m_column_widths[current_column];
        }

        ::widgets::widget *result_child = nullptr;

        // retrieving result child
        if (current_row < total_rows && current_column < total_columns) {
            const auto &found_cell =
                this->m_matrix[current_row][current_column];

            if (found_cell != nullptr) {
                result_child = found_cell->child_at(current_x, current_y);
            }
        }

        return result_child;
    }

    // update_layout
    void update_layout() final {
        this->m_width = this->calculate_grid_width();
        this->m_height = this->calculate_grid_height();
    }

    [[nodiscard]] int rows() const {
        return this->m_rows;
    }

    [[nodiscard]] int columns() const {
        return this->m_columns;
    }

    [[nodiscard]] widgets::widget *get(const int row, const int column) const {
        return this->m_matrix[row][column].get();
    }

    widgets::widget *add(std::unique_ptr<widgets::widget> child,
                         const int row,
                         const int column) {
        this->m_matrix[row][column] = std::move(child);

        // setting parent
        this->add_parent(this->m_matrix[row][column].get());

        // updating layout
        this->update_layout();

        return this->m_matrix[row][column].get();
    }

    std::unique_ptr<widgets::widget> remove(const int row, const int column) {
        // creating pointer to the child
        auto removed_child = std::move(this->m_matrix[row][column]);

        // removing parent from child
        if (removed_child != nullptr) {
            widgets::container::remove_parent(removed_child.get());
        }

        // removing child from martix
        this->m_matrix[row][column] = nullptr;

        // updating layout
        this->update_layout();

        return removed_child;
    }

private:
    // setting provided height to a row
    void set_row_height(const int row, const int height) {
        this->m_row_heights[row] = height;
    }

    // setting provided width to a column
    void set_column_width(const int column, const int width) {
        this->m_column_widths[column] = width;
    }

    [[nodiscard]] int calculate_grid_height() {
        const int total_rows = this->rows();
        const int total_columns = this->columns();

        int grid_height = 0;

        for (int row = 0; row < total_rows; row++) {
            int max_height_of_row = 0;

            // counting max height in each row
            for (int column = 0; column < total_columns; column++) {
                if (this->m_matrix[row][column].get() == nullptr) {
                    continue;
                }
                int cell_height = this->m_matrix[row][column]->height();
                max_height_of_row = std::max(max_height_of_row, cell_height);
            }

            grid_height += max_height_of_row;
            // setting max height of the current row
            this->set_row_height(row, max_height_of_row);
        }

        return grid_height;
    }

    [[nodiscard]] int calculate_grid_width() {
        const int total_rows = this->rows();
        const int total_columns = this->columns();

        int grid_width = 0;

        for (int column = 0; column < total_columns; column++) {
            int max_width_of_column = 0;

            for (int row = 0; row < total_rows; row++) {
                if (this->m_matrix[row][column].get() == nullptr) {
                    continue;
                }
                int cell_width = this->m_matrix[row][column]->width();
                max_width_of_column = std::max(max_width_of_column, cell_width);
            }

            grid_width += max_width_of_column;
            // setting max width of the current column
            this->set_column_width(column, max_width_of_column);
        }

        return grid_width;
    }
    // NOLINTNEXTLINE(readability-redundant-access-specifiers)
private:
    // NOLINTNEXTLINE(readability-redundant-access-specifiers)
private:
    int m_width;
    int m_height;
    int m_rows;
    int m_columns;
    std::vector<std::vector<std::unique_ptr<widgets::widget>>> m_matrix;
    std::vector<int> m_row_heights;
    std::vector<int> m_column_widths;
};

inline std::unique_ptr<widgets::grid> make_grid(const int rows,
                                                const int columns) {
    return std::make_unique<widgets::grid>(rows, columns);
}

}  // namespace widgets

#endif  // GRID_H_