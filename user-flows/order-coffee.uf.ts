import { UserFlowContext, UserFlowInteractionsFn, UserFlowProvider } from '@push-based/user-flow';

const interactions: UserFlowInteractionsFn = async (ctx: UserFlowContext): Promise<any> => {
  const { flow, collectOptions } = ctx;
  const { url } = collectOptions;

  await flow.navigate(url, {
    stepName: 'Navigate to list',
  });
};

const userFlowProvider: UserFlowProvider = {
  flowOptions: { name: 'Bootstrap' },
  interactions,
};

module.exports = userFlowProvider;
