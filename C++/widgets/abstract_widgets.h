#ifndef ABSTRACT_WIDGETS_H_
#define ABSTRACT_WIDGETS_H_

#include <cassert>

namespace widgets {
struct container;

// guards parent property from being changed from the outside of struct
struct parent_guard {
    friend container;

private:
    explicit parent_guard() = default;
};

// NOLINTNEXTLINE(cppcoreguidelines-special-member-functions)
struct widget {
    [[nodiscard]] virtual int width() const = 0;
    [[nodiscard]] virtual int height() const = 0;

    widget(const widget &) = delete;
    widget(widget &&) = delete;
    widget &operator=(const widget &) = delete;
    widget &operator=(widget &&) = delete;

    [[nodiscard]] virtual ::widgets::widget *child_at(const int x,
                                                      const int y) {
        const int w = this->width();
        const int h = this->height();

        // if pixel is inside the widget
        if ((0 <= x && x < w) && (0 <= y && y < h)) {
            return this;
        } else {
            return nullptr;
        }
    }

    void set_parent(widgets::container *parent, const widgets::parent_guard &) {
        this->m_parent = parent;
    }

    [[nodiscard]] widgets::container *parent() const {
        return this->m_parent;
    }

    virtual ~widget() = default;

protected:
    widget() = default;

private:
    widgets::container *m_parent = nullptr;
};

struct container : widget {
    virtual void update_layout() = 0;

protected:
    void add_parent(widgets::widget *child) {
        child->set_parent(this, widgets::container::m_parent_guard);
    }

    static void remove_parent(widgets::widget *child) {
        child->set_parent(nullptr, widgets::container::m_parent_guard);
    }

private:
    static const widgets::parent_guard m_parent_guard;
};

inline const widgets::parent_guard widgets::container::m_parent_guard{};

}  // namespace widgets

#endif  // ABSTRACT_WIDGETS_H_
