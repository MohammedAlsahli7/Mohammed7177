// Small shared HTTP helpers and enums.
'use strict';

const MATS = ['pla', 'petg', 'tpu', 'loop'];
const JOB_STATUS = [
  'queued',
  'printing',
  'paused',
  'done',
  'failed',
  'cancelled',
];
const REQUEST_STATUS = ['new', 'seen', 'converted', 'closed'];
const ITEM_CATEGORIES = [
  'part',
  'consumable',
  'packaging',
  'product',
  'tool',
  'other',
];
/**
 * An error with an HTTP status.
 */
class HttpError extends Error {
  /**
   * @param {number} status
   * @param {string} msg
   */
  constructor(status, msg) {
    super(msg);
    this.status = status;
  }
}
const bad = (msg) => {
  throw new HttpError(400, msg);
};
const str = (v, max = 200) => (v == null ? '' : String(v).trim().slice(0, max));
const num = (v, {min = -Infinity, max = Infinity} = {}) => {
  const n = +v;
  if (v === '' || v == null || !Number.isFinite(n)) return null;
  return Math.min(max, Math.max(min, n));
};
const slug = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
const now = () => new Date().toISOString();

module.exports = {
  HttpError,
  bad,
  str,
  num,
  slug,
  now,
  MATS,
  JOB_STATUS,
  REQUEST_STATUS,
  ITEM_CATEGORIES,
};
