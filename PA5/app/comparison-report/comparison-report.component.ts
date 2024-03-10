import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comparison-report',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Comparison Report
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="comparison-item">
        <ion-label>{{comparisonResult.max_speed.bestCar.model}} Max Speed:</ion-label>
        <ion-note slot="end">{{ comparisonResult.max_speed.max }} km/h</ion-note>
      </div>
      <div class="comparison-item">
        <ion-label>{{comparisonResult.max_speed.worstCar.model}} Max Speed:</ion-label>
        <ion-note slot="end">{{ comparisonResult.max_speed.min }} km/h</ion-note>
      </div>
      <div class="comparison-item" id="better">
        <ion-label>Best Max-Speed:</ion-label>
        <ion-note slot="end">{{ comparisonResult.max_speed.bestCar.make }} {{ comparisonResult.max_speed.bestCar.model }}</ion-note>
      </div>
      <div class="comparison-item" id="worse">
        <ion-label>Worst Max-Speed:</ion-label>
        <ion-note slot="end">{{ comparisonResult.max_speed.worstCar.make }} {{ comparisonResult.max_speed.worstCar.model }}</ion-note>
      </div>
      <div class="comparison-item">
        <ion-label>{{comparisonResult.year_from.bestCar.model}} Year:</ion-label>
        <ion-note slot="end">{{ comparisonResult.year_from.max }}</ion-note>
      </div>
      <div class="comparison-item">
        <ion-label>{{comparisonResult.year_from.worstCar.model}} Year:</ion-label>
        <ion-note slot="end">{{ comparisonResult.year_from.min }}</ion-note>
      </div>
      <div class="comparison-item" id="better">
        <ion-label>Newest Car</ion-label>
        <ion-note slot="end">{{ comparisonResult.year_from.bestCar.make }} {{ comparisonResult.year_from.bestCar.model }}</ion-note>
      </div>
      <div class="comparison-item" id="worse">
        <ion-label>Oldest Car</ion-label>
        <ion-note slot="end">{{ comparisonResult.year_from.worstCar.make }} {{ comparisonResult.year_from.worstCar.model }}</ion-note>
      </div>

      <ion-button expand="full" (click)="closeModal()">Close</ion-button>
    </ion-content>
  `,
  styleUrls: ['./comparison-report.component.scss']
})
export class ComparisonReportComponent {
  @Input() comparisonResult: any;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}
