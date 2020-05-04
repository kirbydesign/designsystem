import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import MatchersUtil = jasmine.MatchersUtil;

import { TestHelper } from './test-helper';
import { ColorHelper } from '../helpers/color-helper';
import { ThemeColorDefinition } from '../helpers/design-token-helper';

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
  let expectedStringValue;
  let expectedValueAlias;

  if (typeof expectedValue === 'string') {
    expectedStringValue = expectedValue;
    if (cssProperty.indexOf('color') != -1) {
      expectedValueAlias = expectedValue;
      expectedStringValue = ColorHelper.colorStringToRgbString(expectedValue);
      if (expectedValue === expectedValueAlias) {
        expectedValueAlias = undefined;
      }
    }
  } else {
    expectedStringValue = expectedValue.value;
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

function getErrorMessage(
  element: Element,
  cssProperty: string,
  actualValue: string,
  expectedValue: string,
  expectedValueAlias?: string
) {
  const expectedColorNameSuffix = expectedValueAlias ? ` (${expectedValueAlias})` : '';
  return `Expected [${cssProperty}] of ${element.tagName} '${actualValue}' to equal '${expectedValue}'${expectedColorNameSuffix}`;
}
