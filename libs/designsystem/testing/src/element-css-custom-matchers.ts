import { ColorHelper, ThemeColorDefinition } from '@kirbydesign/core';
import jasmine from 'jasmine-core';
import { TestHelper } from './test-helper';

import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import MatchersUtil = jasmine.MatchersUtil;

export const ElementCssCustomMatchers: CustomMatcherFactories = {
  toHaveComputedStyle: (util: MatchersUtil) => cssPropertyMatcher(util),
};

function cssPropertyMatcher(util: MatchersUtil) {
  return {
    compare: (
      element: Element,
      expectedStyles: { [cssProperty: string]: string | ThemeColorDefinition },
      pseudoElt?: string
    ) => {
      let allPassed = Object.keys(expectedStyles).length !== 0;
      const messages = [];
      Object.keys(expectedStyles).forEach((cssProperty) => {
        const expectedValue = expectedStyles[cssProperty];
        const { expectedStringValue, expectedValueAlias } = getExpectedStringValueAndAlias(
          cssProperty,
          expectedValue
        );
        const { pass, message } = compareCssProperty(
          util,
          element,
          cssProperty,
          expectedStringValue,
          expectedValueAlias,
          pseudoElt
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
  element: Element,
  cssProperty: string,
  expectedValue: string,
  expectedValueAlias?: string,
  pseudoElt?: string
): CustomMatcherResult {
  const actualValue = TestHelper.getCssProperty(element, cssProperty, pseudoElt);
  const pass = util.equals(actualValue, expectedValue) || !!compareSize(actualValue, expectedValue);
  const message = pass
    ? null
    : getErrorMessage(
        element,
        cssProperty,
        actualValue,
        expectedValue,
        expectedValueAlias,
        pseudoElt
      );
  const result = {
    pass: pass,
    message: message,
  };
  return result;
}

function compareSize(actualValue: string, expectedValue: string): boolean | void {
  if (!expectedValue.startsWith('<') && !expectedValue.startsWith('>')) return;

  const matches = expectedValue.match(/(?<operator>\<\=|\<|\>\=|\>)(?<value>\d*)px/);
  if (matches && matches.groups) {
    const actualValueNumber = parseInt(actualValue);
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
  expectedValueAlias?: string,
  pseudoElt?: string
) {
  const expectedColorNameSuffix = expectedValueAlias ? ` (${expectedValueAlias})` : '';
  return `Expected [${cssProperty}] of ${element.tagName}${
    pseudoElt ?? ''
  } '${actualValue}' to be '${expectedValue}'${expectedColorNameSuffix}`;
}
