import chalk from 'chalk';
import dedent from 'dedent';
import invariant from 'tiny-invariant';
import logger from '../../logger';
import type { ApiProvider, TestCase } from '../../types';
import { HARM_PLUGINS, PII_PLUGINS } from '../constants';
import { BflaPlugin } from './bfla';
import { BolaPlugin } from './bola';
import { CompetitorPlugin } from './competitors';
import { ContractPlugin } from './contracts';
import { DebugAccessPlugin } from './debugAccess';
import { ExcessiveAgencyPlugin } from './excessiveAgency';
import { HallucinationPlugin } from './hallucination';
import { getHarmfulTests } from './harmful';
import { HijackingPlugin } from './hijacking';
import { ImitationPlugin } from './imitation';
import { OverreliancePlugin } from './overreliance';
import { getPiiLeakTestsForCategory } from './pii';
import { PolicyPlugin } from './policy';
import { PoliticsPlugin } from './politics';
import { RbacPlugin } from './rbac';
import { ShellInjectionPlugin } from './shellInjection';
import { SqlInjectionPlugin } from './sqlInjection';
import { SsrfPlugin } from './ssrf';

export interface Plugin {
  key: string;
  action: (
    provider: ApiProvider,
    purpose: string,
    injectVar: string,
    n: number,
    config?: Record<string, any>,
  ) => Promise<TestCase[]>;
}

export const Plugins: Plugin[] = [
  {
    key: 'competitors',
    action: (provider, purpose, injectVar, n, config) =>
      new CompetitorPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'contracts',
    action: (provider, purpose, injectVar, n, config) =>
      new ContractPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'excessive-agency',
    action: (provider, purpose, injectVar, n, config) =>
      new ExcessiveAgencyPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'hallucination',
    action: (provider, purpose, injectVar, n, config) =>
      new HallucinationPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  ...(Object.keys(HARM_PLUGINS).map((category) => ({
    key: category,
    action: (provider, purpose, injectVar, n, config) =>
      getHarmfulTests(provider, purpose, injectVar, [category], n),
  })) as Plugin[]),
  {
    key: 'hijacking',
    action: (provider, purpose, injectVar, n, config) =>
      new HijackingPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'imitation',
    action: (provider, purpose, injectVar, n, config) =>
      new ImitationPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'overreliance',
    action: (provider, purpose, injectVar, n, config) =>
      new OverreliancePlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'sql-injection',
    action: (provider, purpose, injectVar, n, config) =>
      new SqlInjectionPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'shell-injection',
    action: (provider, purpose, injectVar, n, config) =>
      new ShellInjectionPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'debug-access',
    action: (provider, purpose, injectVar, n, config) =>
      new DebugAccessPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'rbac',
    action: (provider, purpose, injectVar, n, config) =>
      new RbacPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'politics',
    action: (provider, purpose, injectVar, n, config) =>
      new PoliticsPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  ...(PII_PLUGINS.map((category) => ({
    key: category,
    action: (provider, purpose, injectVar, n, config) =>
      getPiiLeakTestsForCategory(provider, purpose, injectVar, category, n),
  })) as Plugin[]),
  {
    key: 'policy',
    action: (provider, purpose, injectVar, n, config) => {
      invariant(config?.policy, 'Policy plugin requires a config');
      return new PolicyPlugin(
        provider,
        purpose,
        injectVar,
        config as { policy: string; language?: string },
      ).generateTests(n);
    },
  },
  {
    key: 'bola',
    action: (provider, purpose, injectVar, n, config) =>
      new BolaPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'bfla',
    action: (provider, purpose, injectVar, n, config) =>
      new BflaPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
  {
    key: 'ssrf',
    action: (provider, purpose, injectVar, n, config) =>
      new SsrfPlugin(provider, purpose, injectVar, config).generateTests(n),
  },
];

export function validatePlugins(
  plugins: { id: string; numTests: number; config?: Record<string, any> }[],
): void {
  const invalidPlugins = plugins.filter((plugin) => !Plugins.map((p) => p.key).includes(plugin.id));
  if (invalidPlugins.length > 0) {
    const validPluginsString = Plugins.map((p) => p.key).join(', ');
    const invalidPluginsString = invalidPlugins.map((p) => p.id).join(', ');
    logger.error(
      dedent`Invalid plugin(s): ${invalidPluginsString}. 
          
          ${chalk.green(`Valid plugins are: ${validPluginsString}`)}`,
    );
    process.exit(1);
  }
  const pluginsWithoutNumTests = plugins.filter(
    (plugin) => !Number.isSafeInteger(plugin.numTests) || plugin.numTests <= 0,
  );
  if (pluginsWithoutNumTests.length > 0) {
    const pluginsWithoutNumTestsString = pluginsWithoutNumTests.map((p) => p.id).join(', ');
    throw new Error(`Plugins without a numTests: ${pluginsWithoutNumTestsString}`);
  }
}
