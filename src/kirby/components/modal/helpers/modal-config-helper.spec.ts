import { ModalConfigHelper } from './modal-config-helper';
import { ModalConfig } from '../config/modal-config';

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
    expect(updatedModalConfig.titleHorizontalAlignment).toEqual('center');
    expect(updatedModalConfig.closeIcon).toEqual('close');
  });

  it('should not overwrite provided optional fields', () => {
    mockModalConfig.dim = 0.1;
    mockModalConfig.titleHorizontalAlignment = 'left';
    mockModalConfig.closeIcon = 'arrow';
    let updatedModalConfig = ModalConfigHelper.processOptionalValues(mockModalConfig);
    expect(updatedModalConfig.dim).not.toEqual(0.5);
    expect(updatedModalConfig.titleHorizontalAlignment).not.toEqual('center');
    expect(updatedModalConfig.closeIcon).not.toEqual('close');
  });
});
