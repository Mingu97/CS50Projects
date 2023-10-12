# Simulate a sports tournament
# import time
import csv
import sys
import random

# start_time = time.perf_counter()

# Number of simluations to run
N = 1000


def main():
    # Ensure correct usage
    if len(sys.argv) != 2:
        sys.exit("Usage: python tournament.py FILENAME")

    teams = []

    # TODO: Read teams into memory from file
    with open(sys.argv[1], "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            row["rating"] = int(row["rating"])
            teams.append(row)

    counts = {}
    # TODO: Simulate N tournaments and keep track of win counts
    count = 0
    while count < 1000:
        winning_team = simulate_tournament(teams)
        # print(winning_team)
        counts[winning_team] = counts.get(winning_team, 0) + 1
        count += 1
        # print(counts)

    # Print each team's chances of winning, according to simulation
    for team in sorted(counts, key=lambda team: counts[team], reverse=True):
        print(f"{team}: {counts[team] * 100 / N:.1f}% chance of winning")


def simulate_game(team1, team2):
    """Simulate a game. Return True if team1 wins, False otherwise."""
    rating1 = team1["rating"]
    rating2 = team2["rating"]
    probability = 1 / (1 + 10 ** ((rating2 - rating1) / 600))
    return random.random() < probability


def simulate_round(teams):
    """Simulate a round. Return a list of winning teams."""
    winners = []

    # Simulate games for all pairs of teams
    for i in range(0, len(teams), 2):
        if simulate_game(teams[i], teams[i + 1]):
            winners.append(teams[i])
        else:
            winners.append(teams[i + 1])

    return winners


def simulate_tournament(teams):
    """Simulate a tournament. Return name of winning team."""
    # TODO
    round_winners = []
    round_winners.append(simulate_round(teams))
    round = 0

    while len(round_winners[-1]) > 1:
        last_rd = simulate_round(round_winners[-1])
        round_winners.append(last_rd)
        round += 1
    tournamentWinner = {}
    tournamentWinner["Winner"] = round_winners[-1][0]
    # print(tournamentWinner['Winner']['team'])
    # print(tournamentWinner)
    return tournamentWinner["Winner"]["team"]


if __name__ == "__main__":
    main()

# end_time = time.perf_counter()
# elapsed_time = end_time - start_time
# print("{:.3f}".format(elapsed_time))
