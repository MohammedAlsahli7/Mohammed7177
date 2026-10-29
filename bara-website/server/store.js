// JSON-file store. One document, written atomically (tmp file + rename) after
// every change.
// Plenty for a studio: hundreds of spools, thousands of jobs. Swap for a real
// DB behind the same API if you outgrow it.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const MOVEMENT_CAP = 5000;
const EMPTY = () => ({
  version: 1,
  seq: {job: 1000},
  thresholds: {in: 1500, low: 300},
  filaments: [],
  items: [],
  movements: [],
  printers: [],
  jobs: [],
  requests: [],
  users: [],
});

/**
 * JSON document store with atomic writes and change listeners.
 */
class Store {
  /**
   * @param {string} file
   * @param {!Object=} options {seedStock}
   */
  constructor(file, {seedStock} = {}) {
    this.file = file;
    fs.mkdirSync(path.dirname(file), {recursive: true});
    if (fs.existsSync(file)) {
      this.db = {...EMPTY(), ...JSON.parse(fs.readFileSync(file, 'utf8'))};
    } else {
      this.db = EMPTY();
      if (seedStock && fs.existsSync(seedStock)) {
        const s = JSON.parse(fs.readFileSync(seedStock, 'utf8'));
        this.db.thresholds = s.thresholds || this.db.thresholds;
        this.db.filaments = s.items || [];
      }
      this.save();
    }
    this.listeners = new Set();
  }

  /**
   * Writes the document atomically.
   */
  save() {
    const tmp = this.file + '.' + process.pid + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(this.db, null, 1));
    fs.renameSync(tmp, this.file);
  }

  /**
   * Apply a mutation, persist, then tell subscribers which collections changed.
   * @param {string|!Array<string>} topics
   * @param {function(!Object): *} fn
   * @return {*} What fn returned.
   */
  change(topics, fn) {
    const out = fn(this.db);
    this.save();
    for (const l of this.listeners) l([].concat(topics));
    return out;
  }
  /**
   * @param {function(!Array<string>)} fn
   * @return {function()} Unsubscribe.
   */
  onChange(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /**
   * @return {string}
   */
  nextJobId() {
    this.db.seq.job = (this.db.seq.job || 1000) + 1;
    return 'J-' + this.db.seq.job;
  }

  /**
   * Adds a stock movement.
   * @param {!Object} db
   * @param {!Object} m
   */
  log(db, m) {
    db.movements.unshift({
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      ...m,
    });
    if (db.movements.length > MOVEMENT_CAP) db.movements.length = MOVEMENT_CAP;
  }
}

module.exports = {Store};
