import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeWho } from './sanitize.js';

describe('[sanitize-valid] sanitizeWho valid inputs', () => {
  it('accepts a simple name', () => {
    assert.deepEqual(sanitizeWho('Tom'), { valid: true, value: 'Tom' });
  });

  it('accepts a name with spaces', () => {
    assert.deepEqual(sanitizeWho('Tom Jones'), { valid: true, value: 'Tom Jones' });
  });

  it('accepts hyphens and underscores', () => {
    assert.deepEqual(sanitizeWho('Mary-Jane'), { valid: true, value: 'Mary-Jane' });
    assert.deepEqual(sanitizeWho('user_1'), { valid: true, value: 'user_1' });
  });

  it('trims whitespace', () => {
    assert.deepEqual(sanitizeWho('  Alice  '), { valid: true, value: 'Alice' });
  });

  it('accepts names at the max length boundary', () => {
    const name = 'A'.repeat(20);
    assert.deepEqual(sanitizeWho(name), { valid: true, value: name });
  });
});

describe('[sanitize-invalid] sanitizeWho invalid inputs', () => {
  it('rejects null', () => {
    const result = sanitizeWho(null);
    assert.equal(result.valid, false);
    assert.match(result.reason, /non-empty/);
  });

  it('rejects undefined', () => {
    const result = sanitizeWho(undefined);
    assert.equal(result.valid, false);
  });

  it('rejects empty string', () => {
    const result = sanitizeWho('');
    assert.equal(result.valid, false);
    assert.match(result.reason, /non-empty/);
  });

  it('rejects whitespace-only string', () => {
    const result = sanitizeWho('   ');
    assert.equal(result.valid, false);
    assert.match(result.reason, /non-empty/);
  });

  it('rejects names exceeding max length', () => {
    const result = sanitizeWho('A'.repeat(21));
    assert.equal(result.valid, false);
    assert.match(result.reason, /20 characters/);
  });

  it('rejects special characters', () => {
    for (const input of ['Tom!', '<script>', 'name@place', 'a/b', 'x;y']) {
      const result = sanitizeWho(input);
      assert.equal(result.valid, false, `Should reject "${input}"`);
      assert.match(result.reason, /letters, numbers/);
    }
  });
});

describe('[sanitize-profanity] sanitizeWho profanity filtering', () => {
  it('rejects exact profanity matches', () => {
    for (const word of ['damn', 'shit', 'fuck', 'hell', 'crap']) {
      const result = sanitizeWho(word);
      assert.equal(result.valid, false, `Should reject "${word}"`);
      assert.match(result.reason, /inappropriate/);
    }
  });

  it('rejects profanity regardless of case', () => {
    const result = sanitizeWho('DAMN');
    assert.equal(result.valid, false);
    assert.match(result.reason, /inappropriate/);
  });

  it('rejects profanity as a word in the input', () => {
    const result = sanitizeWho('big ass guy');
    assert.equal(result.valid, false);
    assert.match(result.reason, /inappropriate/);
  });

  it('allows clean words that are not profanity', () => {
    for (const name of ['Tom', 'Hello', 'Ash', 'Bart']) {
      const result = sanitizeWho(name);
      assert.equal(result.valid, true, `Should allow "${name}"`);
    }
  });
});
