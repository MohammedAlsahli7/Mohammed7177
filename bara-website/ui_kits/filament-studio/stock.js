// Filament stock helpers. Data lives in data/stock.json + data/models.json (or
// BARA_CONFIG.sources) — loaded through baraApi.
// Status: grams >= thresholds.in → in, >= thresholds.low → low, else out.
window.baraStockStatus = (g) => {
  const th = window.BARA_THRESHOLDS || {in: 1500, low: 300};
  return g >= th.in ? 'in' : g >= th.low ? 'low' : 'out';
};
window.baraLoadStudio = async () => {
  const [stock, models] = await Promise.all([
    baraApi.get('stock'),
    baraApi.get('models'),
  ]);
  window.BARA_THRESHOLDS = stock.thresholds || window.BARA_THRESHOLDS;
  window.BARA_MODELS = models.items || models;
  return {stock: stock.items || stock, models: window.BARA_MODELS};
};
// Staff saves go to BARA_CONFIG.endpoints.stock. Without it, edits stay as a
// local draft on this device only.
window.baraSaveStock = async (list) => {
  if (baraApi.configured('stock')) {
    await baraApi.send('stock', list, 'PUT');
    return 'saved';
  }
  try {
    localStorage.setItem('bara-stock-draft', JSON.stringify(list));
  } catch (e) {
    /* Best effort: storage may be unavailable. */
  }
  return 'draft';
};
