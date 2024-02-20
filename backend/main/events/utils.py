from datetime import datetime

italian_month_names = {
    1: 'Gennaio', 2: 'Febbraio', 3: 'Marzo', 4: 'Aprile',
    5: 'Maggio', 6: 'Giugno', 7: 'Luglio', 8: 'Agosto',
    9: 'Settembre', 10: 'Ottobre', 11: 'Novembre', 12: 'Dicembre'
}

def format_datetime(datetime_obj):
    if datetime_obj:
        return {
            'date': datetime.strftime(datetime_obj, '%d') + ' ' + italian_month_names[datetime_obj.month] + ' ' + datetime.strftime(datetime_obj, '%Y'),
            'time': datetime.strftime(datetime_obj, '%H:%M')
        }
    return {'date' : None, 'time' : None}