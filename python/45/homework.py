import utilities


def print_days_in_month_lists():

    months = ['January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December']

    days_of_months = [31, utilities.days_in_feb(), 31, 30, 31, 30, 31,
                      31, 30, 31, 30, 31]

    for month, day in zip(months, days_of_months):
        print(f'{month} -> {day} days')


print('Printing days in months using list')
print_days_in_month_lists()


def print_days_in_month_tuples():
    months = ('January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December')

    days_of_months = (31, utilities.days_in_feb(), 31, 30, 31,
                      30, 31, 31, 30, 31, 30, 31)

    for month, day in zip(months, days_of_months):
        print(f'{month} -> {day} days')


print('Printing days in months using tuple')
print_days_in_month_tuples()


def print_days_in_month_dict():
    months = {
        'January': 31,
        'February': utilities.days_in_feb(),
        'March': 31,
        'April': 30,
        'May': 31,
        'June': 30,
        'July': 31,
        'August': 31,
        'September': 30,
        'October': 31,
        'November': 30,
        'December': 31
    }
    for month, days in months.items():
        print(f'{month} -> {days} days')


print('Printing days in months using dictonary')
print_days_in_month_dict()


def get_days_in_month(month, year=0):
    try:
        month = utilities.get_month_from_num(int(month))
    except ValueError:
        pass

    month = month[:3].capitalize()
    months = {
        'Jan': 31,
        'Feb': utilities.days_in_feb(year),
        'Mar': 31,
        'Apr': 30,
        'May': 31,
        'Jun': 30,
        'Jul': 31,
        'Aug': 31,
        'Sep': 30,
        'Oct': 31,
        'Nov': 30,
        'Dec': 31
    }
    if month in months:
        print(f'{month} -> {months[month]} days')
        return months[month]
    else:
        print('Print enter a proper month')


get_days_in_month(2)
get_days_in_month('march still going to work only checking the first 3 characters')
get_days_in_month('Febuary', 2024)
get_days_in_month('Unknown')
get_days_in_month(34)

