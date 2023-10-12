# TODO

while True:
    try:
        pyramid_height = int(input("Enter Height: "))
        if pyramid_height > 0 and pyramid_height <= 8:
            break
        else:
            print("Value entered is not a positive integer or exceeding 8")
    except ValueError:
        print("Value entered is not an integer")


for blocks in range(1, pyramid_height + 1):
    print(" " * (pyramid_height - blocks), end="")
    print("#" * blocks, end="  ")
    print("#" * blocks)
