import { ModalConfigHelper } from './modal-config.helper';
import { ModalConfig } from './modal-config';

describe('ModalConfigHelper', () => {
  let mockModalConfig: ModalConfig;

  beforeEach(() => {
    mockModalConfig = {
      title: 'test',
      component: undefined,
    };
  });

  it('should fill missing optional fields', () => {
    let updatedModalConfig = ModalConfigHelper.processOptionalValues(mockModalConfig);
    expect(updatedModalConfig.dim).toEqual(0.5);
    expect(updatedModalConfig.closeBtnPosition).toEqual('inside');
    expect(updatedModalConfig.closeIconName).toEqual('close');
    expect(updatedModalConfig.titleHorizontalAlignment).toEqual('left');
  });

  it('should not overwrite provided optional fields', () => {
    mockModalConfig.dim = 0.1;
    mockModalConfig.closeBtnPosition = 'outside';
    mockModalConfig.closeIconName = 'arrow-back';
    mockModalConfig.titleHorizontalAlignment = 'center';
    let updatedModalConfig = ModalConfigHelper.processOptionalValues(mockModalConfig);
    expect(updatedModalConfig.dim).not.toEqual(0.5);
    expect(updatedModalConfig.closeBtnPosition).not.toEqual('inside');
    expect(updatedModalConfig.closeIconName).not.toEqual('close');
    expect(updatedModalConfig.titleHorizontalAlignment).not.toEqual('left');
  });
});
