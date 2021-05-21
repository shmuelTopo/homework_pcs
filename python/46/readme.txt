Files from last night's class have been committed to Git and uploaded to Dropbox.
For homework:

1 - Create a "die" class (FYI a die is the singular of dice). The class should allow the developer to decide how many sides it should have when creating it.
Normal dice have 6 sides, but there are some games with weirdly shaped dice that have more sides, The die should have a method "roll" that when rolled picks a random number between 1 and
the number of sides so a 6 sided die returns a number between 1 and 6, a 12 sided
die a number between 1 and 12

2 - Since 6 sided dice are so common, make a subclass SixSidedDie that always
has 6 sides.

3 - Implement a selection sort in Python. 
As you should already be familiar with from when you did this in Java, the basic algorithm is as follows:
1. divide the list into 2 parts - sorted and unsorted (where divide means keep
track of the position where the sorted portion ends and the unsorted portion
begins - not actually create two separate lists)
2. Find the smallest item in the unsorted part and swap it with the item at the first
position in the unsorted portion of the list. Move the boundary between the
sorted and unsorted portions, one element to the right
3. Keep doing this until there are no more unsorted elements.
