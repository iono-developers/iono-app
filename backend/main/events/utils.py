from datetime import datetime
from babel import dates


def format_time(datetime_obj):
    if datetime_obj is None:
        return None
    return datetime.strftime(datetime_obj, '%H:%M')

def format_date(datetime_obj, format_type='long'):
    if datetime_obj is None:
        return None
    return dates.format_date(datetime_obj, format=format_type, locale = 'it_IT')

def format_how_long_ago(datetime_obj):
    if datetime_obj is None:
        return None
    difference = datetime.now() - datetime_obj.replace(tzinfo=None)
    return dates.format_timedelta(difference, locale = 'it_IT')