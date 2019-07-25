import { TouchGestureEventData, TouchAction } from 'tns-core-modules/ui/gestures/gestures';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';

export class ButtonHelper {
  onPressAndHold(args: TouchGestureEventData, setHighlighted: (value: boolean) => void) {
    const action = args.action;
    const button = <GridLayout>args.object;
    switch (action) {
      case TouchAction.cancel:
        break;
      case TouchAction.down:
        setHighlighted(true);
        break;
      case TouchAction.up:
        setHighlighted(false);
        break;
      default:
        break;
    }
  }
}
