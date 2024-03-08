from datetime import datetime
from babel import dates


def format_time(datetime_obj):
    return datetime.strftime(datetime_obj, '%H:%M')

def format_date(datetime_obj):
    return dates.format_date(datetime_obj, format='full', locale = 'it_IT')

def format_how_long_ago(datatime_obj):
    difference = datetime.now() - datatime_obj.replace(tzinfo=None)
    return dates.format_timedelta(difference, locale = 'it_IT')