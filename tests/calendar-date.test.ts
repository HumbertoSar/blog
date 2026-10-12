import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { calendarDate } from '../src/lib/calendar-date.ts';

describe('calendarDate', () => {
	it('emits the local calendar day as YYYY-MM-DD', () => {
		const date = new Date('2026-09-28T00:00:00.000Z');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		assert.equal(calendarDate(date), `${date.getFullYear()}-${month}-${day}`);
		assert.doesNotMatch(calendarDate(date), /T/);
	});

	it('does not let a UTC conversion move the day west of Greenwich', () => {
		const result = spawnSync(
			process.execPath,
			[
				'--experimental-strip-types',
				'--disable-warning=ExperimentalWarning',
				'--input-type=module',
				'-e',
				`import { calendarDate } from './src/lib/calendar-date.ts';
const value = calendarDate(new Date('2026-09-28T00:00:00.000Z'));
if (value !== '2026-09-27') {
  console.error(value);
  process.exit(1);
}`,
			],
			{
				cwd: fileURLToPath(new URL('..', import.meta.url)),
				env: { ...process.env, TZ: 'America/Sao_Paulo' },
				encoding: 'utf8',
			},
		);

		assert.equal(result.status, 0, result.stderr || result.stdout);
	});
});
