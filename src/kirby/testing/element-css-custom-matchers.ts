import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import MatchersUtil = jasmine.MatchersUtil;

import { TestHelper } from './test-helper';
import { ColorHelper } from '../helpers/color-helper';
import { ThemeColor } from '../helpers/theme-color.type';

export const ElementCssCustomMatchers: CustomMatcherFactories = {
  toHaveColor: function(
    util: MatchersUtil,
    customEqualityTesters: CustomEqualityTester[]
  ): CustomMatcher {
    return {
      compare: (element: Element, expectedColor: string): CustomMatcherResult =>
        compareCssProperty(
          util,
          customEqualityTesters,
          element,
          'color',
          ColorHelper.colorStringToRgbString(expectedColor)
        ),
    };
  },
  toHaveBackgroundColor: function(
    util: MatchersUtil,
    customEqualityTesters: CustomEqualityTester[]
  ): CustomMatcher {
    return {
      compare: (element: Element, expectedColor: string): CustomMatcherResult =>
        compareCssProperty(
          util,
          customEqualityTesters,
          element,
          'background-color',
          ColorHelper.colorStringToRgbString(expectedColor)
        ),
    };
  },
  toHaveBorderColor: function(
    util: MatchersUtil,
    customEqualityTesters: CustomEqualityTester[]
  ): CustomMatcher {
    return {
      compare: (element: Element, expectedColor: string): CustomMatcherResult =>
        compareCssProperty(
          util,
          customEqualityTesters,
          element,
          'border-color',
          ColorHelper.colorStringToRgbString(expectedColor)
        ),
    };
  },
  toHaveThemeColor: (
    util: MatchersUtil,
    customEqualityTesters: CustomEqualityTester[]
  ): CustomMatcher => themeColorMatcher(util, customEqualityTesters, 'color'),
  toHaveThemeBackgroundColor: (
    util: MatchersUtil,
    customEqualityTesters: CustomEqualityTester[]
  ): CustomMatcher => themeColorMatcher(util, customEqualityTesters, 'background-color'),
  toHaveThemeBorderColor: (
    util: MatchersUtil,
    customEqualityTesters: CustomEqualityTester[]
  ): CustomMatcher => themeColorMatcher(util, customEqualityTesters, 'border-color'),
};

function themeColorMatcher(
  util: MatchersUtil,
  customEqualityTesters: CustomEqualityTester[],
  cssProperty: string
): CustomMatcher {
  return {
    compare: (
      element: Element,
      expectedColorName: ThemeColor | 'black' | 'semi-light' | 'semi-dark',
      expectedVariant?: 'shade' | 'tint' | 'contrast'
    ): CustomMatcherResult => {
      const variantSuffix = expectedVariant ? `-${expectedVariant}` : '';
      const expectedColorVariant = `${expectedColorName}${variantSuffix}`;
      const expectedColor = ColorHelper.getThemeColorRgbString(expectedColorVariant);
      if (expectedColor === undefined) {
        throw new Error(`'${expectedColorName}' is not a Kirby Theme Color!!!`);
      }
      return compareCssProperty(
        util,
        customEqualityTesters,
        element,
        cssProperty,
        expectedColor,
        expectedColorVariant
      );
    },
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
  return `Expected [${cssProperty}] of ${
    element.tagName
  } '${actualValue}' to equal '${expectedValue}'${expectedColorNameSuffix}`;
}
