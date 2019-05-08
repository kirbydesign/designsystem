import { ModalConfigHelper } from './modal-window-config.helper';
import { ModalWindowConfig } from './modal-window-config';

describe('ModalConfigHelper', () => {
  let mockModalConfig: ModalWindowConfig;

  beforeEach(() => {
    mockModalConfig = {
      title: 'test',
      component: undefined,
    };
  });

  it('should fill missing optional fields', () => {
    let updatedModalConfig = ModalConfigHelper.processOptionalValues(mockModalConfig);
    expect(updatedModalConfig.dim).toEqual(0.5);
    expect(updatedModalConfig.titleHorizontalAlignment).toEqual('center');
    expect(updatedModalConfig.closeIconName).toEqual('close');
  });

  it('should not overwrite provided optional fields', () => {
    mockModalConfig.dim = 0.1;
    mockModalConfig.titleHorizontalAlignment = 'left';
    mockModalConfig.closeIconName = 'arrow-back';
    let updatedModalConfig = ModalConfigHelper.processOptionalValues(mockModalConfig);
    expect(updatedModalConfig.dim).not.toEqual(0.5);
    expect(updatedModalConfig.titleHorizontalAlignment).not.toEqual('center');
    expect(updatedModalConfig.closeIconName).not.toEqual('close');
  });
});
