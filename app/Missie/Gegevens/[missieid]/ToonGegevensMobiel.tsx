"use client";
import { DateToDDMMYYYY } from "@/app/components/DatumHelper";

interface Props {
  missieData: MissieModel;
  currentUser: MissieDeelnemerModel;
}
const ToonGegevensMobiel = ({ missieData, currentUser }: Props) => {
  return (
    <>
      <div className="p-3">
        <table>
          <tbody>
            <tr className="pb-2">
              <th className="pb-2 pe-2 text-left">Omschrijving</th>
              <td className="pb-2 ps-2">{missieData.omschrijving}</td>
            </tr>
            <tr className="pb-2">
              <th className="pb-2 pe-2 text-left">Locatie</th>
              <td className="pb-2 ps-2">{missieData.locatie}</td>
            </tr>
            <tr>
              <th className="pb-2 pe-2 text-left">Afbeelding</th>
              <td className="pb-2 ps-2">
              {missieData.afbeelding ? (
                  <p>Bekijk afbeelding</p>
                ) : (
                  "Nog geen afbeelding"
                )}
              </td>
            </tr>
            <tr>
              <th className="pb-2 pe-2 text-left">Startdatum</th>
              <td className="pb-2 ps-2">{DateToDDMMYYYY(missieData.startDatum)}</td>
            </tr>
            <tr>
              <th className="pb-2 pe-2 text-left">Einddatum</th>
              <td className="pb-2 ps-2">{DateToDDMMYYYY(missieData.eindDatum)}</td>
            </tr>
          </tbody>
        </table>
      </div>
</>
  );
};

export default ToonGegevensMobiel;
