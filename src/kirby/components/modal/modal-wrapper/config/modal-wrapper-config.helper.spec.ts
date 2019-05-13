import { ModalWrapperConfigHelper } from './modal-wrapper-config.helper';
import { ModalWrapperConfig } from './modal-wrapper-config';

describe('ModalWrapperConfigHelper', () => {
  let mockModalWrapperConfig: ModalWrapperConfig;

  beforeEach(() => {
    mockModalWrapperConfig = {
      title: 'test',
      component: undefined,
    };
  });

  it('should fill missing optional fields', () => {
    let updatedModalConfig = ModalWrapperConfigHelper.processOptionalValues(mockModalWrapperConfig);
    expect(updatedModalConfig.dim).toEqual(0.5);
    expect(updatedModalConfig.titleHorizontalAlignment).toEqual('center');
    expect(updatedModalConfig.closeIconName).toEqual('close');
  });

  it('should not overwrite provided optional fields', () => {
    mockModalWrapperConfig.dim = 0.1;
    mockModalWrapperConfig.titleHorizontalAlignment = 'left';
    mockModalWrapperConfig.closeIconName = 'arrow-back';
    let updatedModalConfig = ModalWrapperConfigHelper.processOptionalValues(mockModalWrapperConfig);
    expect(updatedModalConfig.dim).not.toEqual(0.5);
    expect(updatedModalConfig.titleHorizontalAlignment).not.toEqual('center');
    expect(updatedModalConfig.closeIconName).not.toEqual('close');
  });
});
