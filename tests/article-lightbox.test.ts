import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { shouldZoomOnClick } from '../src/lib/zoom-click.ts';

describe('shouldZoomOnClick', () => {
	it('zooms a plain primary click', () => {
		assert.equal(
			shouldZoomOnClick({ button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false }),
			true,
		);
	});

	it('lets modified clicks follow the link to the original file', () => {
		assert.equal(
			shouldZoomOnClick({ button: 0, metaKey: true, ctrlKey: false, shiftKey: false, altKey: false }),
			false,
		);
		assert.equal(
			shouldZoomOnClick({ button: 1, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false }),
			false,
		);
	});
});
