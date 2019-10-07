export class ModalHelper {
  public static blurNativeWrapper(nativeElement: any) {
    setTimeout(() => {
      nativeElement.focus();
      nativeElement.blur();
    }, 50);
  }
}
