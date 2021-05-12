"""
- Create variables for your name and address as well a list of names of your children/siblings/friends/whomever. 
- Use formatted strings to print the variables out to the screen (the list can just be printed as a list, no need to print each name separately).
- Use string slicing to print every third character in the name variable.
- Print out from the second character through the second to last character (inclusive) in the name of the second to last person in the children/siblings/friends/whomever list
- Write a Python script to print out the times tables from 1 to 10. (1,2,3, etc... 2,4,6, etc... 3,6,9, etc...)
Write a guess the number game. Computer picks a number and asks the user to guess it. User keeps trying until they get it right.
Extra credit to tell the user if they guessed too low or too high. Also, extra credit to handle bad input from the user (e.g. non numeric characters). You can hard code the picked number - or import the random module (like we imported the math module) and use random.randint to get a random number, e.g., random.randint(1, 101) # pick a number between 1 and 100
"""
import random
name = 'Shmuel Toporowitch'
address = 'Arlington Ave Lakewood NJ'
siblings = ['Rachel', 'Yechiel', 'Chaya',
            'Mali', 'Benny', 'Motty', 'Chani', 'Tehila']
print(f'Name: {name}, Address: {address}, siblings {siblings}')
print(name[2::3])
print(siblings[-2][1:-1])

for x in range(1, 11):
    for y in range(1, 11):
        print(f"{y * x:2d}", end=' ')
    print()


computer_num = random.randint(1, 101)
num_of_tries = 8
number_picked = set()
print("Let's play a number guessing game\nI am going to thing of a number between 1 and 100 try to guess the number...")
while num_of_tries > 0:
    try:
        guess = int(input(
            f"Plese think of a nubmer between 1-100, you have {num_of_tries} tries left... "))
    except ValueError:
        print('Print enter a valid number...')
        continue
    if guess < 1 or guess > 100:
        print('Please pick a number between the range of 1-100')
        continue
    if guess in number_picked:
        print(
            f'You already tried to guessed {guess}, here is the list of number you already guessed\n {number_picked}')
        continue
    num_of_tries -= 1
    number_picked.add(guess)

    if guess > computer_num:
        print('Your guess is too high, try again...')
    elif guess < computer_num:
        print('Your guess is too low, try again...')
    else:  # guess == computer_num:
        print(f'You won the game in {8-num_of_tries} tries')
        break
else:
    print(f'You ran out of tries, the number I picked was {computer_num}')

print(f'here is the list of number you already guessed\n {number_picked}')
