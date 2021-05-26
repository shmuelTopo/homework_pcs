import math


class Vehicle:
    def __init__(self, color):
        self.color = color

    def go(self, speed):
        print(f'Vehicel running at speed {speed} Mph')
        self.speed = speed

    def __str__(self):
        return f'Color: {self.color}, Current speed {self.speed}MPH'

class Plane(Vehicle):
    def __go__(self, speed):
        print(f'Plane currently flying at speed {speed} Mph')
        self.speed = speed

car = Vehicle('Red')
plane = Plane('Gray')

car.go(80)
print(car)

plane.go(400)
print(plane)

for num in range(1, 100):
    if num % 3 == 0 and num % 5 == 0:
        print('FizzBuzz')
    elif num % 3 == 0:
        print('Fizz')
    elif num % 5 == 0:
        print('Buzz')
    else:
        print(num)
