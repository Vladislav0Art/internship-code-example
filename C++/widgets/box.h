#ifndef BOX_H_
#define BOX_H_

#include <memory>
#include <vector>
#include "abstract_widgets.h"

namespace widgets {
struct box final : widgets::container {
    enum class kind { HORIZONTAL = 0, VERTICAL };

    explicit box(widgets::box::kind type) {
        this->m_type = type;
        this->m_width = 0;
        this->m_height = 0;
    }

    [[nodiscard]] int width() const final {
        return this->m_width;
    }

    [[nodiscard]] int height() const final {
        return this->m_height;
    }

    ::widgets::widget *child_at(const int x, const int y) final {
        const int box_width = this->width();
        const int box_height = this->height();

        int current_x = x;
        int current_y = y;

        ::widgets::widget *found_child = nullptr;

        for (const auto &child : this->m_children) {
            const int child_width = child != nullptr ? child->width() : 0;
            const int child_height = child != nullptr ? child->height() : 0;

            // HORIZONTAL box type
            if (this->m_type == widgets::box::kind::HORIZONTAL) {
                // current child is the candidate
                if (current_x - child_width < 0) {
                    found_child = child.get();
                    const int offset_y = (box_height - child_height) /
                                         2;  // centering child by Y axis
                    // calling child_at() mehtod on child
                    found_child =
                        found_child->child_at(current_x, current_y - offset_y);
                    // stopping the loop
                    break;
                } else {
                    current_x -= child_width;
                }
            }
            // VERTICAL box type
            else {
                // current child is the candidate
                if (current_y - child_height < 0) {
                    found_child = child.get();
                    const int offset_x = (box_width - child_width) /
                                         2;  // centering child by X axis
                    // calling child_at() mehtod on child
                    found_child =
                        found_child->child_at(current_x - offset_x, current_y);
                    // stopping the loop
                    break;
                } else {
                    current_y -= child_height;
                }
            }
        }

        return found_child;
    }

    void update_layout() final {
        int new_height = 0;
        int new_width = 0;

        // calculating new height and width
        for (const auto &child : this->m_children) {
            // if box type is HORIZONTAL: h = max, w = sum
            if (this->m_type == widgets::box::kind::HORIZONTAL) {
                new_height = std::max(new_height, child->height());
                new_width += child->width();
            }
            // if box type is VERTICAL: h = sum, w = max
            else {
                new_height += child->height();
                new_width = std::max(new_width, child->width());
            }
        }

        // setting calculated values
        this->m_height = new_height;
        this->m_width = new_width;
    }

    [[nodiscard]] int size() const {
        return static_cast<int>(this->m_children.size());
    }

    [[nodiscard]] widgets::widget *get(const int index) const {
        return this->m_children[index].get();
    }

    widgets::widget *add(std::unique_ptr<widgets::widget> child) {
        this->m_children.emplace_back(std::move(child));

        // setting parent
        this->add_parent(this->m_children.back().get());

        // updating layout
        this->update_layout();

        return this->m_children.back().get();
    }

    std::unique_ptr<widgets::widget> remove(const int index) {
        // creating pointer to the child
        auto removed_child = std::move(this->m_children[index]);

        // removing parent from child
        widgets::container::remove_parent(removed_child.get());

        // removing child from children vector
        this->m_children.erase(this->m_children.begin() + index);

        // updating layout
        this->update_layout();

        return removed_child;
    }

private:
    kind m_type;
    int m_width, m_height;

    // vector with children widgets
    std::vector<std::unique_ptr<widgets::widget>> m_children;
};

inline std::unique_ptr<widgets::box> make_box(widgets::box::kind type) {
    return std::make_unique<widgets::box>(type);
}

}  // namespace widgets

#endif  // BOX_H_