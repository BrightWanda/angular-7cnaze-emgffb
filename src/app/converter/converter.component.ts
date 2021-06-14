import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MetricService } from './../metric.service';
import { Metric } from '../metric';
import { Output } from '../output';
import { Input } from '../input';

@Component({
  selector: 'app-name-editor',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  form: FormGroup;
  tempForm: FormGroup;
  lengthForm: FormGroup;
  massForm: FormGroup;
  areaForm: FormGroup;
  volumeForm: FormGroup;

  celcius = new FormControl('');
  fahrenheit = new FormControl('');

  kilometer = new FormControl('');
  mile = new FormControl('');

  kilogram = new FormControl('');
  pound = new FormControl('');

  squareMeter = new FormControl('');
  squareFeet = new FormControl('');

  litre = new FormControl('');
  gallon = new FormControl('');

  public show: boolean = false;
  data!: any;

  input: Input = { value: 0.0, unit: 'C', metric: 'temp' };
  output: Output = { value: 0.0, unit: 'C' };

  newMetric: Metric = { metric: 'temp', metricUnit: 'C', imperialUnit: 'F' };

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private metric: MetricService
  ) {
    this.metric.getData().subscribe(data => {
      this.data = data;
    });

    this.form = this.fb.group({
      name: ['']
    });

    
    this.tempForm = this.fb.group({
      fahrenheit: [''],
      celcius: ['']
    });

    this.lengthForm = this.fb.group({
      kilometer: [''],
      mile: ['']
    });

    this.massForm = this.fb.group({
      kilogram: [''],
      pound: ['']
    });

    this.areaForm = this.fb.group({
      squareMeter: [''],
      squareFeet: ['']
    });

    this.volumeForm = this.fb.group({
      litre: [''],
      gallon: ['']
    });
  }

  ngOnInit() {}

  onChangeCategorySelect(event) {
    let value = event.target.value;

    for (let item of this.data) {
      //console.log("Here Here!!");
      if (item.metric == value) {
        this.newMetric = item;
        //alert(item.metricUnit);
      }
    }
  }

  onChangeTempCelciusSelect(event) {
    let value = event.target.value;
    this.tempForm.setValue({ celcius: value, fahrenheit: 0 });
  }

  onChangeTempFahrenheitSelect(event) {
    let value = event.target.value;
    this.tempForm.setValue({ celcius: 0, fahrenheit: value });
  }

  onChangeLengthKmSelect(event) {
    let value = event.target.value;
    this.lengthForm.setValue({ kilometer: value, mile: 0 });
  }

  onChangeLengthFtSelect(event) {
    let value = event.target.value;
    this.lengthForm.setValue({ kilometer: 0, mile: value });
  }

  onChangeMassKgSelect(event) {
    let value = event.target.value;
    this.massForm.setValue({ kilogram: value, pound: 0 });
  }

  onChangeMassLbSelect(event) {
    let value = event.target.value;
    this.massForm.setValue({ kilogram: 0, pound: value });
  }

  onChangeAreaM2Select(event) {
    let value = event.target.value;
    this.areaForm.setValue({ squareMeter: value, squareFeet: 0 });
  }

  onChangeAreaFt2Select(event) {
    let value = event.target.value;
    this.areaForm.setValue({ squareMeter: 0, squareFeet: value });
  }

  onChangeVolumeLSelect(event) {
    let value = event.target.value;
    this.volumeForm.setValue({ litre: value, gallon: 0 });
  }

  onChangeVolumeGalSelect(event) {
    let value = event.target.value;
    this.volumeForm.setValue({ litre: 0, gallon: value });
  }

  submitTempForm() {

    console.log(this.tempForm);

    if(this.tempForm.get('celcius')!.value != 0){
      this.input = {
      value: this.tempForm.get('celcius')!.value,
      unit: 'C',
      metric: this.newMetric.metric
      };

      this.metric.doConversion(this.input).subscribe(data => {
        this.output = data;
        this.tempForm.patchValue({
          fahrenheit: this.output.value
        });
      });

    }else {
      this.input = {
      value: this.tempForm.get('fahrenheit')!.value,
      unit: 'F',
      metric: this.newMetric.metric
      };

      this.metric.doConversion(this.input).subscribe(data => {
        this.output = data;
        this.tempForm.patchValue({
          celcius: this.output.value
        });
      });
    }
  }

  submitLengthForm() {

    if(this.lengthForm.get('kilometer')!.value != 0){
      this.input = {
      value: this.lengthForm.get('kilometer')!.value,
      unit: 'km',
      metric: this.newMetric.metric
      };

      this.metric.doConversion(this.input).subscribe(data => {
        this.output = data;
        this.lengthForm.patchValue({
          mile: this.output.value
        });
      });

    }else {
      this.input = {
      value: this.lengthForm.get('mile')!.value,
      unit: 'mi',
      metric: this.newMetric.metric
      };

      this.metric.doConversion(this.input).subscribe(data => {
        this.output = data;
        this.lengthForm.patchValue({
          kilometer: this.output.value
        });
      });
    }
  }

  submitMassForm() {

    if(this.massForm.get('kilogram')!.value != 0){
      this.input = {
      value: this.massForm.get('kilogram')!.value,
      unit: 'kg',
      metric: this.newMetric.metric
      };

      this.metric.doConversion(this.input).subscribe(data => {
        this.output = data;
        this.massForm.patchValue({
          pound: this.output.value
        });
      });

    }else {
      this.input = {
      value: this.massForm.get('pound')!.value,
      unit: 'lb',
      metric: this.newMetric.metric
      };

      this.metric.doConversion(this.input).subscribe(data => {
        this.output = data;
        this.massForm.patchValue({
          kilogram: this.output.value
        });
      });
    }
  }

  submitAreaForm() {

    if(this.areaForm.get('squareMeter')!.value != 0){
      this.input = {
      value: this.areaForm.get('squareMeter')!.value,
      unit: 'm^2',
      metric: this.newMetric.metric
      };

      this.metric.doConversion(this.input).subscribe(data => {
        this.output = data;
        this.areaForm.patchValue({
          squareFeet: this.output.value
        });
      });

    }else {
      this.input = {
      value: this.areaForm.get('squareFeet')!.value,
      unit: 'ft^2',
      metric: this.newMetric.metric
      };

      this.metric.doConversion(this.input).subscribe(data => {
        this.output = data;
        this.areaForm.patchValue({
          squareMeter: this.output.value
        });
      });
    }
  }

  submitVolumeForm() {

    if(this.volumeForm.get('litre')!.value != 0){
      this.input = {
      value: this.volumeForm.get('litre')!.value,
      unit: 'l',
      metric: this.newMetric.metric
      };

      this.metric.doConversion(this.input).subscribe(data => {
        this.output = data;
        this.volumeForm.patchValue({
          gallon: this.output.value
        });
      });

    }else {
      this.input = {
      value: this.volumeForm.get('gallon')!.value,
      unit: 'gal',
      metric: this.newMetric.metric
      };

      this.metric.doConversion(this.input).subscribe(data => {
        this.output = data;
        this.volumeForm.patchValue({
          litre: this.output.value
        });
      });
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
