'use client'
import { DateToDDMMYYYY } from "@/app/components/DatumHelper";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";


interface Props {
    data: FinTransactieModel[]
}
const Overzicht = ({data}:Props) => {

  return (
    <>
    <div className="w-full m-3 p-3 rounded-xl dark:bg-slate-800">Totaal: {(data.reduce((accumulator, current) => accumulator + Number(current.bedrag), 0)).toFixed(2)}</div>
    <Table aria-label="Overzicht transacties">
        <TableHeader>
            <TableColumn key="1">Datum</TableColumn>
            <TableColumn key="2">Datum</TableColumn>
            <TableColumn key="3">Datum</TableColumn>
        </TableHeader>
        <TableBody items={data}>
            {(item)=>(
                <TableRow key={item.id}>
                    <TableCell>
                        {DateToDDMMYYYY(item.datum)}
                    </TableCell>
                    <TableCell>
                        {item.bedrag}
                    </TableCell>
                    <TableCell>
                        {item.mededeling}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
    </>
  )
}

export default Overzicht