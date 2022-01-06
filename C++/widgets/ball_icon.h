#ifndef BALL_ICON_H_
#define BALL_ICON_H_

#include <memory>
#include "abstract_widgets.h"

namespace widgets {
struct ball_icon final : widgets::widget {
    explicit ball_icon(int radius_) : m_radius(radius_) {
    }

    [[nodiscard]] int radius() const {
        return this->m_radius;
    }

    [[nodiscard]] int width() const final {
        return 2 * this->m_radius + 1;
    }

    [[nodiscard]] int height() const final {
        return 2 * this->m_radius + 1;
    }

    // sets new radius
    void radius(int new_radius_) {
        this->m_radius = new_radius_;
    }

    [[nodiscard]] ::widgets::widget *child_at(const int x, const int y) final {
        const int r = this->radius();
        const int square_dist = (x - r) * (x - r) + (y - r) * (y - r);

        // if distance is not greater than radius
        if (square_dist <= r * r) {
            return this;
        } else {
            return nullptr;
        }
    }

private:
    int m_radius;
};

inline std::unique_ptr<::widgets::ball_icon> make_ball_icon(int radius_) {
    return std::make_unique<::widgets::ball_icon>(radius_);
}
}  // namespace widgets

#endif  // BALL_ICON_H_