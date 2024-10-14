interface PostTransactieSpaarboekModel {
  userId: string;
  datum: number;
  bedrag: number;
  mededeling: string;
}

interface SpaarboekTransactie {
  id:number,
  voornaam: string;
  naam: string;
  bedrag: number;
  datum: Date;
  mededeling?: string;
}

interface FinTransactie {
  id:number,
  userId:string,
  voornaam: string;
  naam: string;
  bedrag: number;
  datum: Date;
  mededeling?: string;
}