import os

from datetime import datetime
from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""

    # CALL SQL TABLE TO GET PORTFOLIO DATA
    portfolio_data = db.execute(
        """
        SELECT symbol,
               SUM(num_shares) as num_shares
        FROM buy_transactions
        WHERE purchase_user_id = ?
        GROUP BY symbol HAVING SUM(num_shares) > 0
    """,
        session["user_id"]["id"],
    )
    data = []
    total_value = 0
    cash = get_cash()

    # FILTER REQUIRED DATA AND ERROR HANDLING
    for row in portfolio_data:
        symbol = row["symbol"]
        quote = lookup(symbol)  # Lookup the current price for the symbol
        if quote:
            price = quote["price"]
            name = quote["name"]
        else:
            price = None  # where symbol is not found
            name = None
        # APPEND TO A TEMP ARRAY
        data.append(
            {
                "symbol": symbol,
                "Name": name,
                "num_shares": row["num_shares"],
                "price": price,
            }
        )
        print(data)
        total_value += price * row["num_shares"]
    return render_template(
        "index.html",
        data=data,
        cash=round(cash[0]["cash"], 2),
        total_value=round(total_value, 2),
    )


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    user_cash = get_cash()

    # CHECK REQUEST METHOD
    if request.method == "POST":
        symbol = request.form.get("symbol").upper()
        shares = request.form.get("shares")
        # Error Handling
        if not symbol:
            return apology("Must Provide Symbol", 400)
        elif not shares or not shares.isdigit() or int(shares) <= 0:
            return apology("Must enter valid integer number of shares")

        # Get Symbol Data
        quote = lookup(symbol)
        if quote is None:
            return apology("Symbol not found")

        # Filter price from Data
        price = quote["price"]
        total_cost = round(int(shares) * price, 2)

        # VERIFY & VALIDATE THAT THE USER CAN CREATE SUCH TRANSACTION
        if total_cost <= user_cash[0]["cash"]:
            new_purchase = db.execute(
                "INSERT INTO buy_transactions(created_at, symbol, num_shares, purchase_user_id, price) VALUES (?, ?, ?, ?, ?);",
                datetime.now(),
                symbol,
                shares,
                session["user_id"]["id"],
                price,
            )
            new_balance = user_cash[0]["cash"] - total_cost
            deduct_balance = db.execute(
                "UPDATE users SET cash = ? WHERE id = ?;",
                new_balance,
                session["user_id"]["id"],
            )
            deduct_balance
            new_purchase
            flash("Bought!", "success")
            return redirect("/", code=303)
        else:
            return apology("Cannot afford this value")

    return render_template("buy.html", cash=round(user_cash[0]["cash"], 2))


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    # GET PORTFOLIO DATA SORT BY TIME CREATED
    portfolio_history = db.execute(
        """
            SELECT * FROM buy_transactions
            WHERE purchase_user_id = ?
            ORDER BY created_at
                                   """,
        session["user_id"]["id"],
    )
    data = []
    # APPEND TO TEMP ARRAY FOR FRONT END DISPLAY
    for row in portfolio_history:
        data.append(
            {
                "symbol": row["symbol"],
                "num_shares": row["num_shares"],
                "price": row["price"],
                "created_at": row["created_at"],
            }
        )
    return render_template("history.html", data=data)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?;", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    if request.method == "POST":
        symbol = request.form.get("symbol")
        # SEARCH FOR SYMBOL
        print(symbol)
        quote = lookup(symbol)
        if not quote:
            return apology("Not found", 400)
        return render_template("quote.html", quote=quote)

    return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 400)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 400)

        # Ensure Confirmation was submitted
        elif not request.form.get("confirmation"):
            return apology("must provide confirmation", 400)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?;", request.form.get("username")
        )

        if request.form.get("password") != request.form.get("confirmation"):
            return apology("passwords must match", 400)

        hash = generate_password_hash(request.form.get("password"))
        if len(rows) == 0:
            db.execute(
                "INSERT INTO users(username, hash) VALUES(?,?);",
                request.form.get("username"),
                hash,
            )
            user_id = db.execute(
                "SELECT * FROM users WHERE username = ?;", request.form.get("username")
            )
            print("User Registered")
            session["user_id"] = user_id[0]
            return redirect("/")
        else:
            return apology("Duplicate User")

    return render_template("register.html")


@app.route("/account", methods=["GET", "POST"])
@login_required
def account():
    """Manage Accounts"""
    if request.method == "POST":
        curr_password = request.form.get("curr-password")
        new_password = request.form.get("new-password")
        print("new-pass:", new_password)
        conf_password = request.form.get("conf-password")
        print("conf-pass:", conf_password)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE id = ?;", session["user_id"]["id"])

        # Ensure username exists and password is correct
        if not check_password_hash(rows[0]["hash"], curr_password):
            return apology("Invalid Current password", 403)

        if new_password is None or conf_password is None:
            return apology("Fill in both fields")
        elif new_password == conf_password:
            hash_pass = generate_password_hash(conf_password)
            db.execute(
                "UPDATE users SET hash = ? WHERE id = ?",
                hash_pass,
                session["user_id"]["id"],
            )
            flash("Password Changed!", "success")
            return redirect("/")

        else:
            return apology("Passwords do not match")

    return render_template("account.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    get_stocks = db.execute(
        "SELECT DISTINCT(symbol) FROM buy_transactions WHERE purchase_user_id = ? GROUP BY symbol HAVING SUM(num_shares) > 0",
        session["user_id"]["id"],
    )
    user_cash = get_cash()

    if request.method == "POST":
        # ALL PRINTS FOR DEBUG PURPOSE AND CHECK
        print("ROWS", len(get_stocks))

        shares_qty = int(request.form.get("shares"))
        symbol = request.form.get("symbol")
        if symbol is not None:
            selected_share = lookup(symbol)
            if selected_share is None:
                return apology("Please Select a Symbol")
            # Process SALE TRANSACTION
            else:
                selected_share = lookup(symbol)
                print(selected_share["price"])

                stock_price = selected_share["price"]
                total_value = shares_qty * stock_price

                available_shares_of_selected_stock = db.execute(
                    "SELECT SUM(num_shares) AS total_shares FROM buy_transactions WHERE purchase_user_id = ? AND symbol = ?",
                    session["user_id"]["id"],
                    symbol,
                )
                total_shares = available_shares_of_selected_stock[0]["total_shares"]
                print("Shares QTY: ", shares_qty)
                print("Total Value: ", total_value)
                # Check if the user has enough shares to sell
                if shares_qty > 0 and shares_qty <= total_shares:
                    # Update the user's cash balance
                    remaining_balance = round(user_cash[0]["cash"] + total_value, 2)
                    shares_qty = -abs(shares_qty)
                    db.execute(
                        "INSERT INTO buy_transactions(created_at, symbol, num_shares, purchase_user_id, price) VALUES (?, ?, ?, ?, ?);",
                        datetime.now(),
                        symbol,
                        shares_qty,
                        session["user_id"]["id"],
                        stock_price,
                    )

                    print("New Balance: ", remaining_balance)
                    db.execute(
                        "UPDATE users SET cash = ? WHERE id = ?;",
                        remaining_balance,
                        session["user_id"]["id"],
                    )

                    # Perform the sale transaction and update the database accordingly

                    return redirect("/")
                else:
                    return apology("Invalid number of shares to sell")
        else:
            return apology("Please choose VALID Symbol")

    return render_template("sell.html", get_stocks=get_stocks)


def get_cash():
    user_cash = db.execute(
        "SELECT cash FROM users WHERE id = ?;", session["user_id"]["id"]
    )
    return user_cash
