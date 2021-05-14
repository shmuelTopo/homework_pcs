from datetime import date


def days_in_feb(year=0):
    todays_date = date.today()
    try:
        if year > 0:
            pass
        else:
            year = todays_date.year
    except TypeError:
        year = todays_date.year

    if ((year % 400 == 0) or ((year % 4 == 0) and (year % 100 != 0))):
        return 29
    else:
        return 28

def get_month_from_num(month_num):
    months = ('does_not_exists', 'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December')
    if month_num > 0 and month_num <= 12:
        return months[month_num]
    else:
        return 'Fake news'
