import { View } from 'tns-core-modules/ui/page/page';

export class SlideButtonIos extends UIView {
  public textLabel: UILabel;
  public thumnailImageView: UIImageView;
  public sliderHolderView: UIView;
  public draggedView: UIView;
  public view: UIView;

  constructor(rect: CGRect) {
    super({ frame: rect });
    this.setupView();
  }

  private setupView() {
    this.view = UIView.alloc().init();
    this.textLabel = UILabel.alloc().init();

    this.thumnailImageView = UIImageView.alloc().init();
    // const img = UIImage.alloc().init();
    // this.thumnailImageView = new MTRoundImageView({ image: img });
    this.thumnailImageView.userInteractionEnabled = true;
    this.thumnailImageView.contentMode = UIViewContentMode.Center;

    this.sliderHolderView = UIView.alloc().init();
    this.draggedView = UIView.alloc().init();

    console.log('Called on view loaded');

    this.view.addSubview(this.thumnailImageView);
    this.view.addSubview(this.sliderHolderView);
    this.view.addSubview(this.draggedView);
    this.sliderHolderView.addSubview(this.textLabel);
    this.view.bringSubviewToFront(this.thumnailImageView);
    this.setupConstraint();

    // setStyle()
    // Add pan gesture
    // panGestureRecognizer = UIPanGestureRecognizer(target: self, action: #selector(self.handlePanGesture(_:)))
    // panGestureRecognizer.minimumNumberOfTouches = 1
    //thumnailImageView.addGestureRecognizer(panGestureRecognizer)
  }

  // MARK: Public properties
  public delegate: any; // TODO create type

  private _animationVelocity = 0.2;
  public get animationVelocity(): number {
    return this._animationVelocity;
  }
  public set animationVelocity(v: number) {
    this._animationVelocity = v;
    this.layoutIfNeeded();
  }

  private _sliderViewTopDistance: number = 8.0;
  public get sliderViewTopDistance(): number {
    return this._sliderViewTopDistance;
  }
  public set sliderViewTopDistance(v: number) {
    this._sliderViewTopDistance = v;
    this.layoutIfNeeded();
  }

  private _thumbnailViewTopDistance: number = 0.0;
  public get thumbnailViewTopDistance(): number {
    return this._thumbnailViewTopDistance;
  }
  public set thumbnailViewTopDistance(thumbnailViewTopDistance: number) {
    this.topThumbnailViewConstraint.constant = thumbnailViewTopDistance;
    this._thumbnailViewTopDistance = thumbnailViewTopDistance;
    this.layoutIfNeeded();
  }

  private _thumbnailViewStartingDistance: number = 0.0;
  public get thumbnailViewStartingDistance(): number {
    return this._thumbnailViewStartingDistance;
  }
  public set thumbnailViewStartingDistance(thumbnailViewStartingDistance: number) {
    this.leadingThumbnailViewConstraint.constant = thumbnailViewStartingDistance;
    this.trailingDraggedViewConstraint.constant = thumbnailViewStartingDistance;
    this._thumbnailViewStartingDistance = thumbnailViewStartingDistance;
    this.setNeedsLayout();
  }

  private _textLabelLeadingDistance: number = 0;
  public get textLabelLeadingDistance(): number {
    return this._textLabelLeadingDistance;
  }
  public set textLabelLeadingDistance(textLabelLeadingDistance: number) {
    this.leadingTextLabelConstraint.constant = textLabelLeadingDistance;
    this._textLabelLeadingDistance = textLabelLeadingDistance;
    this.setNeedsLayout();
  }

  private _isEnabled: boolean;
  public get isEnabled(): boolean {
    return this._isEnabled;
  }
  public set isEnabled(isEnabled: boolean) {
    this._isEnabled = isEnabled;
    this.animationChangedEnabledBlock(isEnabled);
  }

  public animationChangedEnabledBlock: (Bool) => void;
  // MARK: Default styles

  private _sliderCornerRadious: number;
  public get sliderCornerRadious(): number {
    return this._sliderCornerRadious;
  }
  public set sliderCornerRadious(sliderCornerRadious: number) {
    this._sliderCornerRadious = sliderCornerRadious;
    this.sliderHolderView.layer.cornerRadius = sliderCornerRadious;
    this.draggedView.layer.cornerRadius = sliderCornerRadious;
  }

  private _defaultSliderBackgroundColor: UIColor = new UIColor({
    red: 0.1,
    green: 0.61,
    blue: 0.84,
    alpha: 0.1,
  });
  public get defaultSliderBackgroundColor(): UIColor {
    return this._defaultSliderBackgroundColor;
  }
  public set defaultSliderBackgroundColor(defaultSliderBackgroundColor: UIColor) {
    this._defaultSliderBackgroundColor = defaultSliderBackgroundColor;
    this.sliderHolderView.backgroundColor = defaultSliderBackgroundColor;
  }

  private _defaultSlidingColor: UIColor = new UIColor({
    red: 25.0 / 255,
    green: 155.0 / 255,
    blue: 215.0 / 255,
    alpha: 0.7,
  });
  public get defaultSlidingColor(): UIColor {
    return this._defaultSlidingColor;
  }
  public set defaultSlidingColor(defaultSlidingColor: UIColor) {
    this._defaultSlidingColor = defaultSlidingColor;
    this.draggedView.backgroundColor = defaultSlidingColor;
  }

  private _defaultThumbnailColor: UIColor = new UIColor({
    red: 25.0 / 255,
    green: 155.0 / 255,
    blue: 215.0 / 255,
    alpha: 1,
  });
  public get defaultThumbnailColor(): UIColor {
    return this._defaultThumbnailColor;
  }
  public set defaultThumbnailColor(defaultThumbnailColor: UIColor) {
    this._defaultThumbnailColor = defaultThumbnailColor;
    this.thumnailImageView.backgroundColor = defaultThumbnailColor;
  }

  private _defaultLabelText: string = 'Swipe to open';
  public get defaultLabelText(): string {
    return this._defaultLabelText;
  }
  public set defaultLabelText(defaultLabelText: string) {
    this._defaultLabelText = defaultLabelText;
    this.textLabel.text = defaultLabelText;
  }

  // MARK: Private Properties
  leadingThumbnailViewConstraint: NSLayoutConstraint;
  leadingTextLabelConstraint: NSLayoutConstraint;
  topSliderConstraint: NSLayoutConstraint;
  topThumbnailViewConstraint: NSLayoutConstraint;
  trailingDraggedViewConstraint: NSLayoutConstraint;
  xPositionInThumbnailView = 0;

  private isFinished = false;

  private panGestureRecognizer: UIPanGestureRecognizer;

  private setupConstraint() {
    this.view.translatesAutoresizingMaskIntoConstraints = false;
    this.thumnailImageView.translatesAutoresizingMaskIntoConstraints = false;
    this.sliderHolderView.translatesAutoresizingMaskIntoConstraints = false;
    this.textLabel.translatesAutoresizingMaskIntoConstraints = false;
    this.draggedView.translatesAutoresizingMaskIntoConstraints = false;
    // Setup for view
    this.view.leadingAnchor.constraintEqualToAnchor(this.leadingAnchor).active = true;
    this.view.trailingAnchor.constraintEqualToAnchor(this.trailingAnchor).active = true;
    this.view.topAnchor.constraintEqualToAnchor(this.topAnchor).active = true;
    this.view.bottomAnchor.constraintEqualToAnchor(this.bottomAnchor).active = true;
    // Setup for circle View
    this.leadingThumbnailViewConstraint = this.thumnailImageView.leadingAnchor.constraintEqualToAnchor(
      this.view.leadingAnchor
    );
    this.leadingThumbnailViewConstraint.active = true;
    this.topThumbnailViewConstraint = this.thumnailImageView.topAnchor.constraintEqualToAnchorConstant(
      this.view.topAnchor,
      this.thumbnailViewTopDistance
    );
    this.topThumbnailViewConstraint.active = true;
    this.thumnailImageView.centerYAnchor.constraintEqualToAnchor(
      this.view.centerYAnchor
    ).active = true;
    this.thumnailImageView.heightAnchor.constraintEqualToAnchor(
      this.thumnailImageView.widthAnchor
    ).active = true;
    // Setup for slider holder view
    this.topSliderConstraint = this.sliderHolderView.topAnchor.constraintEqualToAnchorConstant(
      this.view.topAnchor,
      this.sliderViewTopDistance
    );
    this.topSliderConstraint.active = true;
    this.sliderHolderView.centerYAnchor.constraintEqualToAnchor(
      this.view.centerYAnchor
    ).active = true;
    this.sliderHolderView.leadingAnchor.constraintEqualToAnchor(
      this.view.leadingAnchor
    ).active = true;
    this.sliderHolderView.centerXAnchor.constraintEqualToAnchor(
      this.view.centerXAnchor
    ).active = true;
    // Setup for textLabel
    this.textLabel.topAnchor.constraintEqualToAnchor(this.sliderHolderView.topAnchor).active = true;
    this.textLabel.centerYAnchor.constraintEqualToAnchor(
      this.sliderHolderView.centerYAnchor
    ).active = true;
    this.leadingTextLabelConstraint = this.textLabel.leadingAnchor.constraintEqualToAnchorConstant(
      this.sliderHolderView.leadingAnchor,
      this.textLabelLeadingDistance
    );
    this.leadingTextLabelConstraint.active = true;
    this.textLabel.trailingAnchor.constraintEqualToAnchorConstant(
      this.view.trailingAnchor,
      -8
    ).active = true;
    // Setup for Dragged View
    this.draggedView.leadingAnchor.constraintEqualToAnchor(
      this.sliderHolderView.leadingAnchor
    ).active = true;
    this.draggedView.topAnchor.constraintEqualToAnchor(
      this.sliderHolderView.topAnchor
    ).active = true;
    this.draggedView.centerYAnchor.constraintEqualToAnchor(
      this.sliderHolderView.centerYAnchor
    ).active = true;
    this.trailingDraggedViewConstraint = this.draggedView.trailingAnchor.constraintEqualToAnchorConstant(
      this.thumnailImageView.trailingAnchor,
      this.thumbnailViewStartingDistance
    );
    this.trailingDraggedViewConstraint.active = true;
  }

  //     private func setStyle() {
  //         thumnailImageView.backgroundColor = defaultThumbnailColor
  //         textLabel.text = defaultLabelText
  //         textLabel.font = UIFont.systemFont(ofSize: 15.0)
  //         textLabel.textColor = UIColor(red:0.1, green:0.61, blue:0.84, alpha:1)
  //         textLabel.textAlignment = .center
  //         sliderHolderView.backgroundColor = defaultSliderBackgroundColor
  //         sliderHolderView.layer.cornerRadius = sliderCornerRadious
  //         draggedView.backgroundColor = defaultSlidingColor
  //         draggedView.layer.cornerRadius = sliderCornerRadious
  //     }

  //     private func isTapOnThumbnailViewWithPoint(_ point: CGPoint) -> Bool{
  //         return self.thumnailImageView.frame.contains(point)
  //     }

  //     private func updateThumbnailXPosition(_ x: CGFloat) {
  //         leadingThumbnailViewConstraint?.constant = x
  //         setNeedsLayout()
  //     }

  //     // MARK: UIPanGestureRecognizer
  //     @objc private func handlePanGesture(_ sender: UIPanGestureRecognizer) {
  //         if isFinished || !isEnabled {
  //             return
  //         }
  //         let translatedPoint = sender.translation(in: view).x
  //         switch sender.state {
  //         case .began:
  //             break
  //         case .changed:
  //             if translatedPoint >= xEndingPoint {
  //                 updateThumbnailXPosition(xEndingPoint)
  //                 return
  //             }
  //             if translatedPoint <= thumbnailViewStartingDistance {
  //                 textLabel.alpha = 1
  //                 updateThumbnailXPosition(thumbnailViewStartingDistance)
  //                 return
  //             }
  //             updateThumbnailXPosition(translatedPoint)
  //             textLabel.alpha = (xEndingPoint - translatedPoint) / xEndingPoint
  //             break
  //         case .ended:
  //             if translatedPoint >= xEndingPoint {
  //                 textLabel.alpha = 0
  //                 updateThumbnailXPosition(xEndingPoint)
  //                 // Finish action
  //                 isFinished = true
  //                 delegate?.mtSlideToOpenDelegateDidFinish(self)
  //                 return
  //             }
  //             if translatedPoint <= thumbnailViewStartingDistance {
  //                 textLabel.alpha = 1
  //                 updateThumbnailXPosition(thumbnailViewStartingDistance)
  //                 return
  //             }
  //             UIView.animate(withDuration: animationVelocity) {
  //                 self.leadingThumbnailViewConstraint?.constant = self.thumbnailViewStartingDistance
  //                 self.textLabel.alpha = 1
  //                 self.layoutIfNeeded()
  //             }
  //             break
  //         default:
  //             break
  //         }
  //     }
  //     // Others
  //     public func resetStateWithAnimation(_ animated: Bool) {
  //         let action = {
  //             self.leadingThumbnailViewConstraint?.constant = self.thumbnailViewStartingDistance
  //             self.textLabel.alpha = 1
  //             self.layoutIfNeeded()
  //             //
  //             self.isFinished = false
  //         }
  //         if animated {
  //             UIView.animate(withDuration: animationVelocity) {
  //                action()
  //             }
  //         } else {
  //             action()
  //         }
  //     }
}
