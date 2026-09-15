# Modal Keyboard Lab

Native iOS reproduction for [designsystem issue #4646](https://github.com/kirbydesign/designsystem/issues/4646), based on the supplied StackBlitz.

The app uses published Kirby `11.8.0` through the `@kirbydesign/designsystem-repro` npm alias. This keeps the reproduction independent of local design-system build output.

## Change Kirby version

Change only the version at the end of this dependency in `package.json`:

```json
"@kirbydesign/designsystem-repro": "npm:@kirbydesign/designsystem@11.8.0"
```

For example, replace `11.8.0` with `11.11.0`, then update the installation and rebuild:

```sh
npm install --workspace @repo/text-resize-lab --ignore-scripts --legacy-peer-deps
npm run ios --workspace @repo/text-resize-lab
```

The alias name remains unchanged, so no TypeScript imports need to be edited when comparing versions.

## Open on iOS

From the repository root:

```sh
npm install --workspace @repo/text-resize-lab --ignore-scripts --legacy-peer-deps
npm run ios --workspace @repo/text-resize-lab
```

In Xcode:

1. Select the `App` target and choose a signing team.
2. Select a connected iPhone as the run destination.
3. Press Run.

The bundle identifier is `design.kirby.modalkeyboardlab` and the deployment target is iOS 15.

## Reproduce

1. Tap **Open modal**.
2. Focus the first input to open the software keyboard.
3. Use the keyboard's **Next** action or try to scroll to the remaining inputs.
4. Check whether the lower inputs can be focused and scrolled above the keyboard.

Capacitor Keyboard uses native resize mode, and Kirby receives the native keyboard show/hide events.
