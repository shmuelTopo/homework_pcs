import random


class Die:
    def __init__(self, num_of_sides):
        self._num_of_sides = num_of_sides

    def roll(self):
        return random.randint(1, self._num_of_sides)


class SixSidedDie(Die):
    def __init__(self):
        super().__init__(6)


die1 = SixSidedDie()
while True:
    try:
        times = int(input('How many times do you want to roll the die? '))
        break
    except ValueError:
        print('Please enter a valid number!!')


for num in range(times):
    print(f'roll num {num}: {die1.roll()}')

