from datetime import datetime

italian_month_names = {
    1: 'Gennaio', 2: 'Febbraio', 3: 'Marzo', 4: 'Aprile',
    5: 'Maggio', 6: 'Giugno', 7: 'Luglio', 8: 'Agosto',
    9: 'Settembre', 10: 'Ottobre', 11: 'Novembre', 12: 'Dicembre'
}

def format_datetime(datetime_obj):
    if not datetime_obj:
        return {'date': None, 'time': None}
    
    formatted_date = datetime.strftime(datetime_obj, '%d %B %Y')
    formatted_time = datetime.strftime(datetime_obj, '%H:%M')
    
    return {'date': formatted_date, 'time': formatted_time}
