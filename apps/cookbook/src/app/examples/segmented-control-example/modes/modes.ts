import { Component } from '@angular/core';

const config = {
  template: `<kirby-segmented-control
  [items]="chipItems"
  [selectedIndex]="0"
  mode="chip"
  size="sm"
></kirby-segmented-control>

<kirby-segmented-control
  [items]="compactChipItems"
  [selectedIndex]="0"
  mode="compactChip"
  size="sm"
></kirby-segmented-control>`,
  codeSnippetChipItems: "chipItems = [...'123456'].map((i) => ({ text: `Chip-${i}`, id: i }));",
  codeSnippetCompactChipItems:
    "compactChipItems = [...'12345678'].map((i) => ({ text: `c${i}`, id: i }));",
};
@Component({
  selector: 'cookbook-segmented-control-example-modes',
  template: config.template,
  styleUrls: ['./modes.scss'],
})
export class SegmentedControlExampleModesComponent {
  template = config.template;
  codeSnippet = config.codeSnippetChipItems + '\n\n' + config.codeSnippetCompactChipItems;

  chipItems = [...'123456'].map((i) => ({ text: `Chip-${i}`, id: i }));

  // Showcase compact chips with less chararcters but more chips
  compactChipItems = [...'12345678'].map((i) => ({ text: `c${i}`, id: i }));
}
