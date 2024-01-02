import { IRate } from "./irate";

export interface IHistory {
    amount: number;
    fromCurrency: IRate;
    toCurrency: IRate;
    result: string;
}


