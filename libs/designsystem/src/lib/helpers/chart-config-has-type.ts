import { ChartConfiguration, ChartConfigurationCustomTypesPerDataset } from 'chart.js';

/* 
  Type guard is needed as of chart.js@3.8.1. The config type has been updated to a union type, 
  and the newly added type 'ChartConfigurationCustomTypesPerDataset' does not contain the 'type' property.
  Typescript will throw an error, when trying to access a property that doesn't exist on all union types,
  unless a type guard is used. 
*/

export const chartConfigHasType = (
  config: ChartConfiguration | ChartConfigurationCustomTypesPerDataset
): config is ChartConfiguration => {
  return 'type' in config;
};
