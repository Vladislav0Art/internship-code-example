#include "bank.h"

namespace bank {

transfer_error::transfer_error(const std::string &message)
    : std::runtime_error(message) {
}

not_enough_funds_error::not_enough_funds_error(const int available_funds_xts,
                                               const int requested_funds_xts)
    : transfer_error("Not enough funds: " +
                     std::to_string(available_funds_xts) + " XTS available, " +
                     std::to_string(requested_funds_xts) + " XTS requested") {
}

self_transfer_error::self_transfer_error(const std::string &message)
    : transfer_error(message) {
}

negative_amount_xts_transaction_error::negative_amount_xts_transaction_error(
    const int amount_xts)
    : transfer_error("Cannot transfer negative amount XTS | provided: " +
                     std::to_string(amount_xts)) {
}

transaction::transaction(const user *const counterparty,
                         const int balance_delta,
                         std::string comment)
    : counterparty(counterparty),
      balance_delta_xts(balance_delta),
      comment(std::move(comment)) {
}

user_transactions_iterator::user_transactions_iterator(
    const user *target,
    const std::size_t transactions_size)
    : m_target(target), m_current_index(transactions_size) {
}

transaction user_transactions_iterator::wait_next_transaction() {
    std::unique_lock ul(m_target->m_mutex);

    while (m_target->m_transactions.size() <= m_current_index) {
        m_target->m_transaction_notifier.wait(ul);
    }

    return m_target->m_transactions[m_current_index++];
}

user::user(const std::string &name) : m_name(name) {
    std::unique_lock l(m_mutex);
    create_and_save_transaction_held(nullptr, user::INITIAL_BALANCE,
                                     "Initial deposit for " + name);
}

std::string user::name() const noexcept {
    return m_name;
}

int user::balance_xts() const {
    std::unique_lock l(m_mutex);
    return m_balance;
}

void user::transfer(user &counterparty,
                    const int amount_xts,
                    const std::string &comment) {
    if (&counterparty == this) {
        // self-transfering
        throw self_transfer_error("Counter party must be another user.");
    }

    if (amount_xts < 0) {
        throw negative_amount_xts_transaction_error(amount_xts);
    }

    std::scoped_lock l(m_mutex, counterparty.m_mutex);
    if (m_balance < amount_xts) {
        throw not_enough_funds_error(m_balance, amount_xts);
    }

    create_and_save_transaction_held(&counterparty, -amount_xts, comment);
    counterparty.create_and_save_transaction_held(this, amount_xts, comment);
}

user_transactions_iterator user::monitor() const {
    std::unique_lock l(m_mutex);
    return user_transactions_iterator(this, this->m_transactions.size());
}

void user::create_and_save_transaction_held(const user *counterparty,
                                            const int amount_xts,
                                            std::string comment) {
    m_transactions.emplace_back(counterparty, amount_xts, std::move(comment));
    m_balance += amount_xts;

    m_transaction_notifier.notify_all();
}

user &ledger::get_or_create_user(const std::string &name) & {
    std::unique_lock l(m_mutex);

    if (m_users.count(name) == 0U) {
        // cppcheck-suppress stlFindInsert
        m_users.emplace(name, name);
    }

    return m_users.at(name);
}

}  // namespace bank