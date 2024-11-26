import { format, parse, parseISO } from "date-fns";
import { formatInTimeZone, toZonedTime, zonedTimeToUtc } from 'date-fns-tz'


Date.prototype.addDay = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const GetDatumAlgemeen = (datum, dagenverschil = -1) => {
  return datum.addDay(dagenverschil);
};

export const GetMissieDagen = (startDatum, eindDatum) => {
  let dagen = new Array();
  let start = new Date(startDatum);
  let einde = new Date(eindDatum);

  let cDate = start.addDay(-1);
  while (cDate <= einde) {
    dagen.push(new Date(cDate));
    cDate = cDate.addDay(1);
  }
  return dagen;
};

export const DatumVoorbij = (datum) => {
  let dat = new Date(datum);
  let vandaag = new Date();
  return dat < vandaag ? true : false;
};

export const HHMM_To_date = (datum, tijd) => {
  let date = parse(datum, "dd/MM/yyyy", new Date());
  let times = tijd.split(":");
  date.setHours(times[0]);
  date.setMinutes(times[1]);
  return date;
};

export const GetTijdFromDate = (datum) => {
  const date = datum.length > 0 ? new Date(datum) : new Date();
  return `${("0" + date.getHours()).slice(-2)}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;
};
export const CompareDates = (date1, date2) => {
  let datum1 = format(new Date(date1), "ddMMyyyy");
  let datum2 = format(parseISO(date2), "ddMMyyyy");
  return datum1 === datum2 ? true : false;
};

export const DateToDDMMYYYY = (datum, metTijd = false) => { 
  const d = toZonedTime(datum,"Europe/Brussels")
  return metTijd ? format(d,"dd/MM/yyyy HH:mm"): format(d, "dd/MM/yyyy");
};

export const DateToYYYYMMDDstring = (datum) => {
  return format(datum, "yyyy-MM-dd");
};

export const GMTtoDate = (datum) => {
  let jaar = datum.getFullYear();
  let maand = datum.getMonth() + 1;
  let dag = datum.getDate();
  let dat = `${jaar}-${String(maand).padStart(2, "0")}-${String(dag).padStart(2, "0")}`;
  return dat;
};

export const YYYYMMDDtoDate = (datumstring) => {
  return parse(datumstring, "yyyy-MM-dd", new Date());
};

export const DDMMYYYYtoDate = (datumstring) => {
  return parse(datumstring, "dd/MM/yyyy", new Date());
};


export const ExifDatumNaarString=(datumstring,InclusiefTijd)=>{
  const datumdelen = datumstring.split(' ')
  const datumonderdelen = datumdelen[0].split(':')
 return `${datumonderdelen[2]}/${datumonderdelen[1]}/${datumonderdelen[0]} ${datumdelen[1].substring(0,5)}`

}

export const ExifDatumNaarDatum=(datumstring)=>{
  return parse(datumstring, "yyyy:MM:dd HH:mm:ss", new Date());
}