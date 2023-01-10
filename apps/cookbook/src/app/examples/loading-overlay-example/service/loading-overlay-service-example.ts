export const loadingOverlayServiceExample = `import { LoadingOverlayService } from '@kirbydesign/designsystem';

@Component({
 ...
})
export class myComponent {
   constructor(private loadingOverlayService: LoadingOverlayService) {}
   
    public showFullscreenLoadingOverlay(showBackdrop: boolean, hideContent: boolean) {
        this.loadingOverlayService.showLoadingOverlay(showBackdrop, hideContent);
    }

    public hideFullscreenLoadingOverlay() {
        this.loadingOverlayService.hideLoadingOverlay()
    }
}
`;
