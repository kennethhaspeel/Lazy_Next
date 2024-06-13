import {format,parse,parseISO} from 'date-fns'

export const DateToDDMMYYYY = (datum) => {
    return format(datum, "dd/MM/yyyy")
}