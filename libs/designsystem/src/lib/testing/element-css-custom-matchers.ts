import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import MatchersUtil = jasmine.MatchersUtil;

import { ColorHelper } from '../helpers/color-helper';
import { ThemeColorDefinition } from '../helpers/design-token-helper';

import { TestHelper } from './test-helper';

export const ElementCssCustomMatchers: CustomMatcherFactories = {
  toHaveComputedStyle: (util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]) =>
    cssPropertyMatcher(util, customEqualityTesters),
};

function cssPropertyMatcher(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]) {
  return {
    compare: (
      element: Element,
      expectedStyles: { [cssProperty: string]: string | ThemeColorDefinition }
    ) => {
      let allPassed = Object.keys(expectedStyles).length !== 0;
      let messages = [];
      Object.keys(expectedStyles).forEach((cssProperty) => {
        const expectedValue = expectedStyles[cssProperty];
        const { expectedStringValue, expectedValueAlias } = getExpectedStringValueAndAlias(
          cssProperty,
          expectedValue
        );
        const { pass, message } = compareCssProperty(
          util,
          customEqualityTesters,
          element,
          cssProperty,
          expectedStringValue,
          expectedValueAlias
        );
        allPassed = allPassed && pass;
        if (message) {
          messages.push(message);
        }
      });
      const result = {
        pass: allPassed,
        message: messages.join('\n'),
      };
      return result;
    },
  };
}

function getExpectedStringValueAndAlias(
  cssProperty: string,
  expectedValue: string | ThemeColorDefinition
) {
  let expectedStringValue: string;
  let expectedValueAlias: string;

  if (typeof expectedValue === 'string') {
    expectedStringValue = expectedValue;
    // Check of css property is a color:
    if (
      cssProperty.indexOf('color') > -1 ||
      expectedValue.startsWith('rgb') ||
      expectedValue.startsWith('#')
    ) {
      // Check if css property is a css variable:
      // Css variable values are hex when getting computed style, all other property values are rgb:
      if (!cssProperty.startsWith('--')) {
        // Not a css variable, convert color to rgb:
        expectedStringValue = ColorHelper.colorStringToRgbString(expectedValue);
      }
    }
  } else {
    // Check if css property is a css variable:
    // Css variable values are hex when getting computed style, all other property values are rgb:
    expectedStringValue = cssProperty.startsWith('--') ? expectedValue.hex : expectedValue.value;
    expectedValueAlias = expectedValue.fullname;
  }

  return {
    expectedStringValue,
    expectedValueAlias,
  };
}

function compareCssProperty(
  util: MatchersUtil,
  customEqualityTesters: CustomEqualityTester[],
  element: Element,
  cssProperty: string,
  expectedValue: string,
  expectedValueAlias?: string
): CustomMatcherResult {
  const actualValue = TestHelper.getCssProperty(element, cssProperty);
  if (expectedValue.startsWith('<') || expectedValue.startsWith('>')) {
    customEqualityTesters.push(compareSize);
  }
  const pass = util.equals(actualValue, expectedValue, customEqualityTesters);
  const message = pass
    ? null
    : getErrorMessage(element, cssProperty, actualValue, expectedValue, expectedValueAlias);
  const result = {
    pass: pass,
    message: message,
  };
  return result;
}

function compareSize(first: string, second: string): boolean | void {
  const matches = second.match(/(?<operator>\<\=|\<|\>\=|\>)(?<value>\d*)px/);
  if (matches && matches.groups) {
    const actualValueNumber = parseInt(first);
    const operator = matches.groups['operator'];
    const expectedValueNumber = parseInt(matches.groups['value']);
    switch (operator) {
      case '<':
        return actualValueNumber < expectedValueNumber;
      case '<=':
        return actualValueNumber <= expectedValueNumber;
      case '>':
        return actualValueNumber > expectedValueNumber;
      case '>=':
        return actualValueNumber >= expectedValueNumber;
      default:
        break;
    }
  }
}

function getErrorMessage(
  element: Element,
  cssProperty: string,
  actualValue: string,
  expectedValue: string,
  expectedValueAlias?: string
) {
  const expectedColorNameSuffix = expectedValueAlias ? ` (${expectedValueAlias})` : '';
  return `Expected [${cssProperty}] of ${element.tagName} '${actualValue}' to be '${expectedValue}'${expectedColorNameSuffix}`;
}
