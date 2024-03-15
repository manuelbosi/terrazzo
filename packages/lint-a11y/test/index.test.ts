import build from '@cobalt-ui/cli/dist/build.js';
import fs from 'node:fs';
import { describe, expect, test } from 'vitest';
import { execa } from 'execa';
import yaml from 'js-yaml';
import a11y, { type RuleContrastOptions } from '../src/index.js';
import { fileURLToPath } from 'node:url';

describe('a11y plugin', () => {
  describe('rules', () => {
    describe('a11y/contrast', () => {
      const tokensURL = new URL('./fixtures/tokens.yaml', import.meta.url);
      const tokens = yaml.load(fs.readFileSync(tokensURL, 'utf8'));

      const tests: [
        string,
        {
          options?: RuleContrastOptions;
          want: { success: boolean; errors?: never } | { success?: never; errors: string[] };
        },
      ][] = [
        [
          'passing',
          {
            options: {
              checks: [
                {
                  tokens: {
                    foreground: 'color.high-contrast-text',
                    background: 'color.high-contrast-bg',
                    typography: 'typography.large',
                    modes: ['light', 'dark'],
                  },
                  apca: 75,
                  wcag2: 'AAA',
                },
              ],
            },
            want: { success: true },
          },
        ],
        [
          'passing light, failing dark',
          {
            options: {
              checks: [
                {
                  tokens: {
                    foreground: 'color.failing-dark-text',
                    background: 'color.failing-dark-bg',
                    typography: 'typography.large',
                    modes: ['light', 'dark'],
                  },
                  apca: 75,
                  wcag2: 'AAA',
                },
              ],
            },
            want: {
              errors: [
                '[@cobalt-ui/lint-a11y] Error a11y/contrast: WCAG 2: Token pair #606060, #101010 (mode: dark) failed contrast. Expected 7:1, received 3.03:1',
                '[@cobalt-ui/lint-a11y] Error a11y/contrast: APCA: Token pair #606060, #101010 (mode: dark) failed contrast. Expected 75, received 22.38.',
              ],
            },
          },
        ],
        [
          'no options provided',
          {
            options: undefined,
            want: { errors: ['Error: options.checks must be an array'] },
          },
        ],
      ];
      test.each(tests)('%s', async (name, { options, want }) => {
        try {
          const buildResult = await build(tokens, {
            tokens: [tokensURL],
            outDir: new URL('./index/', import.meta.url),
            plugins: [a11y()],
            lint: {
              rules: {
                'a11y/contrast': {
                  id: 'a11y/contrast',
                  severity: 'error' as const,
                  options,
                },
              },
            },
            color: {},
          });

          if (want.success) {
            if (buildResult.errors) {
              // eslint-disable-next-line no-console
              console.error(...buildResult.errors);
            }
            expect(buildResult.errors?.[0]).toBeUndefined();
          } else {
            expect(buildResult.errors).toEqual(want.errors);
          }
        } catch (err) {
          expect(String(err)).toBe(want.errors?.[0]);
        }
      });
    });
  });

  describe('CLI', () => {
    test('basic', async () => {
      const cwd = new URL('./fixtures/', import.meta.url);

      await execa('node', ['../../../cli/bin/cli.js', 'build'], { cwd: fileURLToPath(cwd) });

      // assert plugin-css generated content as a proxy for no lint errors (building not blocked)
      const tokens = fs.readFileSync(new URL('./index/tokens.css', cwd), 'utf8');
      expect(tokens.length).toBeGreaterThan(100);
    });
  });
});
