#include <boost/asio.hpp>
#include <cstdlib>
#include <fstream>
#include <functional>
#include <iostream>
#include <sstream>
#include <string>
#include <thread>
#include <unordered_map>
#include <vector>
#include "bank.h"

using boost::asio::ip::tcp;

struct cmd_handler {
    enum class command { UNDEFINED_, BALANCE, TRANSACTIONS, MONITOR, TRANSFER };

    using parse_return_value =
        std::pair<cmd_handler::command, std::vector<std::string>>;

    static parse_return_value parse_input(const std::string &input) {
        std::string cmd_str;
        std::vector<std::string> tokens;

        std::stringstream ss(input);
        ss >> cmd_str;

        cmd_handler::command cmd = cmd_handler::command::UNDEFINED_;

        if (cmd_handler::command_ids.count(cmd_str) != 0U) {
            cmd = cmd_handler::command_ids.at(cmd_str);
        }

        int max_tokens_count = 2;
        std::string token;
        while ((max_tokens_count--) != 0 && ss >> token) {
            tokens.emplace_back(token);
        }

        if (cmd == cmd_handler::command::TRANSFER) {
            // retrieving comment
            std::getline(ss, token);
            // deleting starting whitespace in comment
            tokens.emplace_back(token.substr(1));
        }

        return {cmd, tokens};
    }

private:
    inline static const std::unordered_map<std::string, cmd_handler::command>
        command_ids = {
            {"balance", cmd_handler::command::BALANCE},
            {"transactions", cmd_handler::command::TRANSACTIONS},
            {"monitor", cmd_handler::command::MONITOR},
            {"transfer", cmd_handler::command::TRANSFER},
    };
};

void send_client_last_n_transactions(
    tcp::iostream &client,
    int n,
    const std::vector<bank::transaction> &transactions) {
    const int size = static_cast<int>(transactions.size());
    const int start = std::max(size - n, 0);

    client << "CPTY\tBAL\tCOMM" << std::endl;

    for (std::size_t i = start; i < static_cast<std::size_t>(size); i++) {
        const auto &tr = transactions[i];
        client << (tr.counterparty != nullptr ? tr.counterparty->name() : "-")
               << '\t';
        client << tr.balance_delta_xts << '\t';
        client << tr.comment << std::endl;
    }
}

void client_handler(bank::ledger &global_ledger, tcp::socket s) {
    std::cout << "Connected " << s.remote_endpoint() << " --> "
              << s.local_endpoint() << std::endl;

    tcp::iostream client(std::move(s));

    // authorization
    client << "What is your name?" << std::endl;
    std::string username;

    if (!(client >> username)) {
        std::cout << "Disconnected " << client.socket().remote_endpoint()
                  << " --> " << client.socket().local_endpoint() << std::endl;
        return;
    }

    client << "Hi " << username << std::endl;
    bank::user &account = global_ledger.get_or_create_user(username);

    while (client) {
        std::string input;
        if (!std::getline(client, input)) {
            break;
        }

        cmd_handler::command cmd;
        std::vector<std::string> tokens;

        tie(cmd, tokens) = cmd_handler::parse_input(input);

        switch (cmd) {
            case cmd_handler::command::BALANCE: {
                client << account.balance_xts() << std::endl;
                break;
            }
            case cmd_handler::command::TRANSACTIONS:
            case cmd_handler::command::MONITOR: {
                int n = std::stoi(tokens[0]);
                std::vector<bank::transaction> transactions;
                int balance_xts = 0;

                bank::user_transactions_iterator itr =
                    account.snapshot_transactions([&](auto &data,
                                                      const int blnc_xts) {
                        transactions = std::vector(data.begin(), data.end());
                        balance_xts = blnc_xts;
                    });

                send_client_last_n_transactions(client, n, transactions);
                client << "===== BALANCE: " << balance_xts
                       << " XTS =====" << std::endl;

                if (cmd == cmd_handler::command::MONITOR) {
                    while (client) {
                        const auto &tr = itr.wait_next_transaction();
                        client << (tr.counterparty != nullptr
                                       ? tr.counterparty->name()
                                       : "-")
                               << '\t';
                        client << tr.balance_delta_xts << '\t';
                        client << tr.comment << std::endl;
                    }
                }

                break;
            }

            case cmd_handler::command::TRANSFER: {
                bank::user &counterparty =
                    global_ledger.get_or_create_user(tokens[0]);
                int amount_xts = std::stoi(tokens[1]);
                std::string comment = tokens[2];

                try {
                    account.transfer(counterparty, amount_xts, comment);
                    client << "OK" << std::endl;
                } catch (const bank::transfer_error &err) {
                    client << err.what() << std::endl;
                }

                break;
            }

            case cmd_handler::command::UNDEFINED_: {
                std::stringstream ss(input);
                std::string str;
                while (ss >> str) {
                    client << "Unknown command: '" << str << "'" << std::endl;
                }
            }
        }
    }

    std::cout << "Disconnected " << client.socket().remote_endpoint() << " --> "
              << client.socket().local_endpoint() << std::endl;
}

int main(int argc, char *argv[]) {
    if (argc != 3) {
        std::cerr << "Usage: bank_server <port> <port-file>" << std::endl;
        return 1;
    }

    try {
        // NOLINTNEXTLINE(cppcoreguidelines-pro-bounds-pointer-arithmetic)
        const auto port = static_cast<unsigned short>(std::atoi(argv[1]));

        boost::asio::io_context io_context;
        tcp::acceptor acceptor(io_context, tcp::endpoint(tcp::v4(), port));

        std::cout << "Listening at " << acceptor.local_endpoint() << std::endl;

        // NOLINTNEXTLINE(cppcoreguidelines-pro-bounds-pointer-arithmetic)
        std::string filename = std::string(argv[2]);
        std::ofstream file(filename);

        if (!file.is_open()) {
            std::cerr << "Unable to store port to file " + filename
                      << std::endl;
        } else {
            file << acceptor.local_endpoint().port();
        }
        file.close();

        bank::ledger global_ledger;

        while (true) {
            tcp::socket s = acceptor.accept();
            std::thread(client_handler, std::ref(global_ledger), std::move(s))
                .detach();
        }
    } catch (const std::exception &err) {
        std::cerr << err.what() << std::endl;
    }

    return 0;
}