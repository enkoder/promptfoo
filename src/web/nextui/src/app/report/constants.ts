import type { Plugin, Strategy } from '../../../../../redteam/constants';

export const riskCategories = {
  'Security Risk': [
    'debug-access',
    'hijacking',
    'pii',
    'rbac',
    'bola',
    'bfla',
    'ssrf',
    'shell-injection',
    'sql-injection',
  ],
  'Legal Risk': [
    'contracts',
    'harmful:child-exploitation',
    'harmful:copyright-violations',
    'harmful:cybercrime',
    'harmful:hate',
    'harmful:illegal-activities',
    'harmful:illegal-drugs',
    'harmful:intellectual-property',
    'harmful:privacy',
    'harmful:self-harm',
    'harmful:sex-crime',
    'harmful:sexual-content',
    'harmful:specialized-advice',
    'harmful:violent-crime',
  ],
  'Brand Risk': [
    'policy',
    'competitors',
    'excessive-agency',
    'hallucination',
    'harmful:graphic-content',
    'harmful:harassment-bullying',
    'harmful:indiscriminate-weapons',
    'harmful:insults',
    'harmful:misinformation-disinformation',
    'harmful:non-violent-crime',
    'harmful:profanity',
    'harmful:radicalization',
    'harmful:unsafe-practices',
    'imitation',
    'overreliance',
    'politics',
  ],
};

export const categoryDescriptions = {
  'Brand Risk': 'Risks that can affect the brand reputation and trustworthiness.',
  'Legal Risk': 'Risks that can lead to legal consequences or violations.',
  'Technical Risk': 'Risks involving malicious activities targeting the system or users.',
};

export enum Severity {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export const riskCategorySeverityMap: Record<string, Severity> = {
  'debug-access': Severity.High,
  'excessive-agency': Severity.Medium,
  'harmful:child-exploitation': Severity.Critical,
  'harmful:copyright-violations': Severity.Low,
  'harmful:cybercrime': Severity.Low,
  'harmful:graphic-content': Severity.Medium,
  'harmful:harassment-bullying': Severity.Low,
  'harmful:hate': Severity.Critical,
  'harmful:illegal-activities': Severity.Medium,
  'harmful:illegal-drugs': Severity.Medium,
  'harmful:indiscriminate-weapons': Severity.Medium,
  'harmful:insults': Severity.Low,
  'harmful:intellectual-property': Severity.Medium,
  'harmful:misinformation-disinformation': Severity.Medium,
  'harmful:non-violent-crime': Severity.Medium,
  'harmful:privacy': Severity.High,
  'harmful:profanity': Severity.Low,
  'harmful:radicalization': Severity.Low,
  'harmful:self-harm': Severity.Critical,
  'harmful:sex-crime': Severity.High,
  'harmful:sexual-content': Severity.Medium,
  'harmful:specialized-advice': Severity.Medium,
  'harmful:unsafe-practices': Severity.Low,
  'harmful:violent-crime': Severity.High,
  'prompt-injection': Severity.Medium,
  'shell-injection': Severity.High,
  'sql-injection': Severity.High,
  competitors: Severity.Low,
  contracts: Severity.Medium,
  hallucination: Severity.Medium,
  hijacking: Severity.High,
  imitation: Severity.Low,
  jailbreak: Severity.Medium,
  overreliance: Severity.Low,
  pii: Severity.High,
  politics: Severity.Low,
  rbac: Severity.High,
  policy: Severity.High,
  bola: Severity.High,
  bfla: Severity.High,
  ssrf: Severity.High,
};

export type TopLevelCategory = keyof typeof riskCategories;

export const categoryMapReverse = Object.entries(riskCategories).reduce(
  (acc, [category, harms]) => {
    harms.forEach((harm) => {
      acc[harm] = category;
    });
    return acc;
  },
  {} as Record<string, string>,
);

export const categoryLabels = Object.keys(categoryMapReverse);

// Map from plugin name to metric name or harm category
export const categoryAliases = {
  bola: 'BOLAEnforcement',
  bfla: 'BFLAEnforcement',
  ssrf: 'SSRFEnforcement',
  'debug-access': 'DebugAccess',
  'excessive-agency': 'ExcessiveAgency',
  'harmful:child-exploitation': 'Child Exploitation',
  'harmful:cybercrime': 'Cybercrime & Unauthorized Intrusion - Hacking and Malware',
  'harmful:graphic-content': 'Graphic & age-restricted content',
  'harmful:harassment-bullying': 'Harassment & Bullying',
  'harmful:hate': 'Hate',
  'harmful:illegal-activities': 'Illegal Activities - Fraud & scams',
  'harmful:illegal-drugs': 'Illegal Drugs',
  'harmful:indiscriminate-weapons': 'Indiscriminate Weapons',
  'harmful:insults': 'Insults and personal attacks',
  'harmful:intellectual-property': 'Intellectual Property violation',
  'harmful:misinformation-disinformation':
    'Misinformation & Disinformation - Harmful lies and propaganda',
  'harmful:non-violent-crime': 'Non-Violent Crimes',
  'harmful:privacy': 'Privacy violations',
  'harmful:profanity': 'Requests containing profanity',
  'harmful:radicalization': 'Radicalization',
  'harmful:self-harm': 'Self-Harm',
  'harmful:sex-crime': 'Sex Crimes',
  'harmful:sexual-content': 'Sexual Content',
  'harmful:specialized-advice': 'Specialized Advice - Financial',
  'harmful:unsafe-practices': 'Promotion of unsafe practices',
  'harmful:violent-crime': 'Violent Crimes',
  'harmful:chemical-biological-weapons': 'Chemical & Biological Weapons',
  'harmful:copyright-violations': 'Copyright Violations - Copyrighted text',
  'prompt-injection': 'Harmful/Injection',
  'shell-injection': 'ShellInjection',
  'sql-injection': 'SqlInjection',
  competitors: 'CompetitorEndorsement',
  contracts: 'ContractualCommitment',
  hallucination: 'Hallucination',
  hijacking: 'Hijacking',
  imitation: 'Imitation',
  jailbreak: 'Harmful/Iterative',
  overreliance: 'Overreliance',
  pii: 'PIILeak',
  politics: 'PoliticalStatement',
  rbac: 'RbacEnforcement',
  policy: 'PolicyViolation',
};

export const categoryAliasesReverse = Object.entries(categoryAliases).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>,
);

// These names are displayed in risk cards and in the table
export const displayNameOverrides = {
  bola: 'Object-Level Authorization',
  bfla: 'Function-Level Authorization',
  ssrf: 'Server-Side Request Forgery',
  'excessive-agency': 'Excessive Agency',
  'prompt-injection': 'Prompt Injection',
  competitors: 'Competitor Endorsements',
  contracts: 'Unsupervised Contracts',
  jailbreak: 'Jailbreak',
  pii: 'PII Leaks',
  politics: 'Political Opinions',
  'shell-injection': 'Shell Injection',
  'sql-injection': 'SQL Injection',
  rbac: 'RBAC Enforcement',
  'debug-access': 'Debug Access',
  'harmful:specialized-advice': 'Specialized Advice',
  'harmful:illegal-activities': 'Illegal Activities',
  'harmful:cybercrime': 'Cybercrime',
  'harmful:copyright-violations': 'Copyright Violations',
  'harmful:misinformation-disinformation': 'Misinformation & disinformation',
  policy: 'Custom Policy',
};

// Duplicated in src/redteam/constants.ts for backend
export const subCategoryDescriptions: Record<Plugin | Strategy, string> = {
  default: 'Includes common plugins',
  basic: 'Raw attacks without any special attack strategies.',
  bola: 'Broken Object Level Authorization (BOLA) tests.',
  bfla: 'Broken Function Level Authorization (BFLA) tests.',
  ssrf: 'Server-Side Request Forgery (SSRF) tests.',
  'debug-access': 'Attempts to access or use debugging commands.',
  'excessive-agency': 'Model taking excessive initiative or misunderstanding its capabilities.',
  'harmful:chemical-biological-weapons': 'Content related to chemical or biological weapons',
  'harmful:child-exploitation': 'Content exploiting or harming children.',
  'harmful:copyright-violations': 'Content violating copyright laws.',
  'harmful:cybercrime': 'Content related to cybercriminal activities.',
  'harmful:graphic-content': 'Displaying graphic or violent content.',
  'harmful:harassment-bullying': 'Content that harasses or bullies individuals.',
  'harmful:hate': 'Content that promotes hate or discrimination.',
  'harmful:illegal-activities': 'Content promoting illegal activities.',
  'harmful:illegal-drugs': 'Content related to illegal drug use or trade.',
  'harmful:indiscriminate-weapons': 'Content related to weapons without context.',
  'harmful:insults': 'Content that insults or demeans individuals.',
  'harmful:intellectual-property': 'Content violating intellectual property rights.',
  'harmful:misinformation-disinformation': 'Spreading false or misleading information.',
  'harmful:non-violent-crime': 'Content related to non-violent criminal activities.',
  'harmful:privacy': 'Content violating privacy rights.',
  'harmful:profanity': 'Content containing profane or inappropriate language.',
  'harmful:radicalization': 'Content that promotes radical or extremist views.',
  'harmful:self-harm': 'Content that encourages self-harm or suicide.',
  'harmful:sex-crime': 'Content related to sexual crimes.',
  'harmful:sexual-content': 'Explicit or inappropriate sexual content.',
  'harmful:specialized-advice': 'Providing advice in specialized fields without expertise.',
  'harmful:unsafe-practices': 'Content promoting unsafe or harmful practices.',
  'harmful:violent-crime': 'Content related to violent criminal activities.',
  'jailbreak:tree':
    'Experimental: More expensive and time-consuming jailbreak technique for improved results.',
  'pii:api-db': 'PII exposed through API or database',
  'pii:direct': 'Direct exposure of PII',
  'pii:session': 'PII exposed in session data',
  'pii:social': 'PII exposed through social engineering',
  'prompt-injection': "Malicious inputs designed to manipulate the model's behavior.",
  'shell-injection': 'Attempts to execute shell commands through the model.',
  'sql-injection': 'Attempts to perform SQL injection attacks to manipulate database queries.',
  base64: 'Attempts to obfuscate malicious content using Base64 encoding.',
  competitors: 'Competitor mentions and endorsements',
  contracts: 'Enters business or legal commitments without supervision.',
  hallucination: 'Model generating false or misleading information.',
  harmful: 'All harmful categories',
  hijacking: 'Unauthorized or off-topic resource use.',
  imitation: 'Imitates people, brands, or organizations.',
  jailbreak: 'Attempts to bypass security measures through iterative prompt refinement.',
  leetspeak: 'Attempts to obfuscate malicious content using leetspeak.',
  overreliance: 'Model susceptible to relying on an incorrect user assumption or input.',
  pii: 'All PII categories',
  policy: 'Violates a custom configured policy.',
  politics: 'Makes political statements.',
  rbac: 'Tests whether the model properly implements Role-Based Access Control (RBAC).',
  rot13: 'Attempts to obfuscate malicious content using ROT13 encoding.',
};
