import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IHistory } from 'src/app/models/ihistory';
import { IRate } from 'src/app/models/irate';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {


  /* #region Variables */

  alert: any;
  rates: IRate[];
  form: FormGroup = null!;
  result: string = '';
  defaultFrom: string = 'EUR';
  defaultTo: string = 'USD';

  /* #endregion */

  /* #region Constructor */

  constructor(private service: ConverterService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  /* #endregion */

  /* #region Events */

  ngOnInit(): void {
    this.createForm();
    this.getPairs(true);
  }
  onKeyup() {
    this.getPairs(false);
  }
  onSelect() {
    this.getPairs(false);
  }
  /* #endregion */

  /* #region Functions */

  getPairs(isInit: boolean) {
    this.service.showSpinner();
    this.service.getCurrencyPairs().subscribe((data) => {
      if (data != null) {
        const entries = Object.entries(data.rates);
        this.rates = [];
        entries.forEach((item: any) => {
          this.rates.push({ name: item[0], rate: item[1] })
        })
        if (!this.form.value.fromCurrency && this.defaultFrom) {
          this.form.controls.fromCurrency.setValue(this.defaultFrom);
        }
        if (!this.form.value.toCurrency && this.defaultTo) {
          this.form.controls.toCurrency.setValue(this.defaultTo);
        }
        this.mathResult(isInit);
        this.service.hideSpinner();
      }
    }, err => {
      //console.log('err',err)
      this.service.hideSpinner();
      this.toastr.error(err, '');
    });
  }


  createForm(): void {
    this.form = this.fb.group({
      fromCurrency: new FormControl(null, [Validators.required]),
      toCurrency: new FormControl(null, [Validators.required]),
      amount: new FormControl(1, [Validators.required]),
    });
  }

  mathResult(isInit: boolean) {
    let fromCurrency = this.rates.find(x => x.name == this.form.value.fromCurrency);
    let toCurrency = this.rates.find(x => x.name == this.form.value.toCurrency);
    if (fromCurrency && toCurrency) {
      let convertedAmount = ((this.form.value.amount / fromCurrency.rate) * toCurrency.rate);
      this.result = `${Number(this.form.value.amount).toFixed(2)} ${fromCurrency.name
        } = ${convertedAmount.toFixed(2)} ${toCurrency.name}`;

      if (!isInit) {
        const history: IHistory = {
          amount: Number(this.form.value.amount),
          fromCurrency: fromCurrency,
          toCurrency: toCurrency,
          result: this.result
        }
        this.service.addHistory(history);
      }

    } else {
      this.result = '';
    }
  }

  /* #endregion */

}
