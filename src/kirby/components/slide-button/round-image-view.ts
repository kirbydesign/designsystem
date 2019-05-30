export class MTRoundImageView extends UIImageView {
  layoutSubviews() {
    super.layoutSubviews();
    let radius = this.bounds.size.width / 2.0;
    this.layer.cornerRadius = radius;
  }
}
