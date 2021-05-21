def selection_sort(list):

    for outer_index in range(len(list)):
        lowest_index = outer_index
        for iner_index in range(outer_index, len(list)-1):
            if list[iner_index + 1] < list[lowest_index]:
                lowest_index = iner_index + 1

        # swap the numbers
        temp = list[outer_index]
        list[outer_index] = list[lowest_index]
        list[lowest_index] = temp


list = [5, 8, 2, 26, 45, 9, 34, 1, 6, 49, 8, 0, 99, 1, 23]
print(list)
selection_sort(list)
print(list)
