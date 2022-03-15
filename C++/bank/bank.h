#ifndef BANK_H_
#define BANK_H_

#include <condition_variable>
#include <mutex>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

namespace bank {
struct user;

struct transfer_error : std::runtime_error {
    explicit transfer_error(const std::string &message);
};

struct not_enough_funds_error : transfer_error {
    explicit not_enough_funds_error(int available_funds_xts,
                                    int requested_funds_xts);
};

struct self_transfer_error : transfer_error {
    explicit self_transfer_error(const std::string &message);
};

struct negative_amount_xts_transaction_error : transfer_error {
    explicit negative_amount_xts_transaction_error(int amount_xts);
};

struct transaction {
    const user *const counterparty = nullptr;
    const int balance_delta_xts = 0;
    const std::string comment;

    transaction(const user *counterparty,
                int balance_delta,
                std::string comment);
};

struct user_transactions_iterator {
    explicit user_transactions_iterator(const user *target,
                                        std::size_t transactions_size);
    transaction wait_next_transaction();

private:
    const user *m_target;
    std::size_t m_current_index;
};

struct user {
    friend user_transactions_iterator;

    user() = delete;

    explicit user(const std::string &name);

    std::string name() const noexcept;

    int balance_xts() const;

    template <typename T>
    user_transactions_iterator snapshot_transactions(const T &functor) const {
        std::unique_lock l(m_mutex);
        functor(m_transactions, m_balance);

        return user_transactions_iterator(this, this->m_transactions.size());
    }

    void transfer(user &counterparty,
                  int amount_xts,
                  const std::string &comment);

    user_transactions_iterator monitor() const;

private:  // methods
    void create_and_save_transaction_held(const user *counterparty,
                                          int amount_xts,
                                          std::string comment);

private:  // members
    mutable std::mutex m_mutex;
    mutable std::condition_variable m_transaction_notifier;
    const std::string m_name;
    int m_balance = 0;
    std::vector<transaction> m_transactions;

    inline static const int INITIAL_BALANCE = 100;
};

struct ledger {
    user &get_or_create_user(const std::string &name) &;

private:
    std::unordered_map<std::string, user> m_users;
    std::mutex m_mutex;
};

}  // namespace bank

#endif  // BANK_H_