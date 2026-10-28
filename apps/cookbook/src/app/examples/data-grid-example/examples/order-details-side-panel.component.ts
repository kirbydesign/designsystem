import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';

export type ReconciliationStatus = 'Needs review' | 'Reconciled';

export interface ShipmentEvent {
  date: string;
  description: string;
}

export interface OrderLineItem {
  sku: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface ReconciliationOrder {
  id: string;
  orderNumber: string;
  customer: string;
  fulfillmentCenter: string;
  status: ReconciliationStatus;
  total: number;
  trackingNumber: string;
  lineItems: OrderLineItem[];
  shipmentEvents: ShipmentEvent[];
}

export interface OrderCorrection {
  orderId: string;
  amount: number;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

@Component({
  selector: 'cookbook-order-details-side-panel',
  template: `
    <kirby-card class="order-details-panel-card" variant="outlined" [hasPadding]="true">
      <aside
        class="order-details-panel"
        [attr.aria-labelledby]="order() ? 'order-details-heading' : 'order-details-empty-heading'"
      >
        @if (order(); as activeOrder) {
          <header class="order-details-panel-header">
            <div class="order-details-panel-heading">
              <p class="order-details-panel-eyebrow kirby-text-xsmall">ORDER DETAILS</p>
              <h2 id="order-details-heading" class="kirby-text-large">
                {{ activeOrder.orderNumber }}
              </h2>
              <p class="order-details-panel-customer kirby-text-small">
                {{ activeOrder.customer }}
              </p>
            </div>
            <button
              kirby-button
              size="sm"
              attentionLevel="3"
              [noDecoration]="true"
              [showIconOnly]="true"
              type="button"
              aria-label="Close order details"
              (click)="closed.emit()"
            >
              <kirby-icon name="close"></kirby-icon>
            </button>
          </header>

          <div class="order-details-panel-status">
            <kirby-badge [themeColor]="activeOrder.status === 'Reconciled' ? 'success' : 'warning'">
              {{ activeOrder.status }}
            </kirby-badge>
          </div>

          <dl class="order-details-panel-summary">
            <div>
              <dt>Fulfillment center</dt>
              <dd>{{ activeOrder.fulfillmentCenter }}</dd>
            </div>
            <div>
              <dt>Tracking number</dt>
              <dd>{{ activeOrder.trackingNumber }}</dd>
            </div>
            <div class="order-details-panel-total">
              <dt>Order total</dt>
              <dd>{{ formatCurrency(activeOrder.total) }}</dd>
            </div>
          </dl>

          <section class="order-details-panel-section">
            <h3 class="kirby-text-medium">Line items</h3>
            <ul class="order-details-panel-line-items">
              @for (item of activeOrder.lineItems; track item.sku) {
                <li>
                  <span>{{ item.quantity }} × {{ item.description }}</span>
                  <span>{{ formatCurrency(item.quantity * item.unitPrice) }}</span>
                </li>
              }
            </ul>
          </section>

          <section class="order-details-panel-section">
            <h3 class="kirby-text-medium">Shipment history</h3>
            <ol class="order-details-panel-events">
              @for (event of activeOrder.shipmentEvents; track event.date) {
                <li>
                  <time class="kirby-text-small">{{ event.date }}</time>
                  <span>{{ event.description }}</span>
                </li>
              }
            </ol>
          </section>

          <form
            class="order-details-panel-correction"
            (submit)="submitCorrection($event, activeOrder.id, correction.valueAsNumber)"
          >
            <h3 class="kirby-text-medium">Apply correction</h3>
            <label class="kirby-text-small" [for]="'correction-' + activeOrder.id">
              Adjustment (USD)
            </label>
            <div class="order-details-panel-correction-controls">
              <input
                #correction
                [id]="'correction-' + activeOrder.id"
                type="number"
                step="0.01"
                required
              />
              <button kirby-button size="sm" type="submit">Apply</button>
            </div>
          </form>
        } @else {
          <div class="order-details-panel-empty">
            <h2 id="order-details-empty-heading" class="kirby-text-large">Order details</h2>
            <p class="kirby-text-small">
              Open an order to inspect its items, shipment history, and total.
            </p>
          </div>
        }
      </aside>
    </kirby-card>
  `,
  styleUrls: ['./order-details-side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, ButtonComponent, CardComponent, IconComponent],
})
export class OrderDetailsSidePanelComponent {
  readonly order = input<ReconciliationOrder | null>(null);
  readonly closed = output<void>();
  readonly correctionApplied = output<OrderCorrection>();

  formatCurrency(amount: number) {
    return currencyFormatter.format(amount);
  }

  submitCorrection(event: Event, orderId: string, amount: number) {
    event.preventDefault();
    if (!Number.isFinite(amount) || amount === 0) return;

    this.correctionApplied.emit({ orderId, amount });
    (event.currentTarget as HTMLFormElement).reset();
  }
}
