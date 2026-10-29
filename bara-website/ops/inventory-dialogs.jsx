// Inventory dialogs: adjust stock, add/edit a filament colour or a stock item.

function AdjustDialog({target, kind, onClose}) {
  const act = useAct();
  const [delta, setDelta] = React.useState('');
  const [dir, setDir] = React.useState(1);
  const [reason, setReason] = React.useState('');
  const unit = kind === 'filament' ? 'g' : target.unit || 'pcs';
  const path = kind === 'filament' ? 'filaments' : 'items';
  const save = async () => {
    const r = await act(
      () =>
        opsApi('POST', '/api/' + path + '/' + target.id + '/adjust', {
          delta: dir * +delta,
          reason,
        }),
      'Stock updated',
    );
    if (r) onClose();
  };
  const footer = (
    <>
      <OB.Button variant="ghost" onClick={onClose}>
        Cancel
      </OB.Button>
      <OB.Button onClick={save} disabled={!(+delta > 0)}>
        Save
      </OB.Button>
    </>
  );
  const tabs = [
    {id: '1', label: kind === 'filament' ? 'Add (new spool)' : 'Received'},
    {id: '-1', label: 'Remove (used / scrap)'},
  ];
  return (
    <OB.Dialog
      open
      onClose={onClose}
      eyebrow="ADJUST STOCK"
      title={target.name}
      width={440}
      footer={footer}
    >
      <div className="o-stack o-gap14">
        <span className="o-mono">
          ON HAND:{' '}
          {kind === 'filament' ? fmtG(target.grams) : target.qty + ' ' + unit}
        </span>
        <OB.Tabs
          items={tabs}
          value={String(dir)}
          onChange={(v) => setDir(+v)}
        />
        <OB.Input
          label="Amount"
          type="number"
          suffix={unit}
          value={delta}
          onChange={ctrl(setDelta)}
          hint={kind === 'filament' ? 'A full 1 kg spool = 1000' : undefined}
        />
        <OB.Input
          label="Reason"
          value={reason}
          onChange={ctrl(setReason)}
          placeholder={
            dir > 0 ? 'Delivery from supplier' : 'Failed print, test, scrap…'
          }
        />
      </div>
    </OB.Dialog>
  );
}

function FilamentDialog({f, onClose}) {
  const act = useAct();
  const [x, set] = useForm(
    f || {
      name: '',
      ar: '',
      material: 'pla',
      hex: '#F2B705',
      line: '',
      finish: 'matte',
      shelf: '',
      grams: 1000,
      costPerKg: '',
    },
  );
  const okHex = /^#[0-9a-f]{6}$/i.test(x.hex);
  const save = async () => {
    const body = {
      ...x,
      grams: +x.grams,
      costPerKg:
        x.costPerKg === '' || x.costPerKg == null ? null : +x.costPerKg,
    };
    const r = await act(
      () =>
        f
          ? opsApi('PATCH', '/api/filaments/' + f.id, body)
          : opsApi('POST', '/api/filaments', body),
      f ? 'Colour updated' : 'Colour added',
    );
    if (r) onClose();
  };
  const footer = (
    <>
      <OB.Button variant="ghost" onClick={onClose}>
        Cancel
      </OB.Button>
      <OB.Button onClick={save} disabled={!x.name || !okHex}>
        Save
      </OB.Button>
    </>
  );
  const mats = Object.entries(MAT_LABEL).map(([value, label]) => ({
    value,
    label,
  }));
  return (
    <OB.Dialog
      open
      onClose={onClose}
      eyebrow={f ? f.id : 'NEW COLOUR'}
      title={f ? 'Edit filament' : 'Add a filament colour'}
      width={560}
      footer={footer}
    >
      <div className="o-form">
        <OB.Input
          label="Name (English)"
          value={x.name}
          onChange={set('name')}
        />
        <OB.Input
          label="Name (Arabic)"
          value={x.ar || ''}
          onChange={set('ar')}
        />
        <OB.Select
          label="Material"
          value={x.material}
          onChange={set('material')}
          options={mats}
        />
        <OB.Field label="Colour">
          <div className="o-row">
            <input
              type="color"
              className="o-colour"
              value={okHex ? x.hex : '#000000'}
              onChange={set('hex')}
            />
            <OB.Input value={x.hex} onChange={set('hex')} style={{flex: 1}} />
          </div>
        </OB.Field>
        <OB.Input
          label="Line"
          value={x.line || ''}
          onChange={set('line')}
          placeholder="House PLA Matte"
        />
        <OB.Input
          label="Finish"
          value={x.finish || ''}
          onChange={set('finish')}
          placeholder="matte, silk, gloss…"
        />
        <OB.Input
          label="Shelf"
          value={x.shelf || ''}
          onChange={set('shelf')}
          placeholder="A1"
        />
        <OB.Input
          label="On hand"
          type="number"
          suffix="g"
          value={String(x.grams)}
          onChange={set('grams')}
        />
        <OB.Input
          label="Cost"
          type="number"
          suffix="SAR/kg"
          value={x.costPerKg == null ? '' : String(x.costPerKg)}
          onChange={set('costPerKg')}
          hint="Leave empty to use the material default in Pricing"
        />
      </div>
    </OB.Dialog>
  );
}

function ItemDialog({it, onClose}) {
  const {data} = useOps();
  const act = useAct();
  const [x, set] = useForm(
    it || {
      name: '',
      sku: '',
      category: 'consumable',
      qty: 0,
      unit: 'pcs',
      reorderAt: '',
      location: '',
      supplier: '',
      notes: '',
    },
  );
  const save = async () => {
    const body = {
      ...x,
      qty: +x.qty || 0,
      reorderAt:
        x.reorderAt === '' || x.reorderAt == null ? null : +x.reorderAt,
    };
    const r = await act(
      () =>
        it
          ? opsApi('PATCH', '/api/items/' + it.id, body)
          : opsApi('POST', '/api/items', body),
      it ? 'Item updated' : 'Item added',
    );
    if (r) onClose();
  };
  const footer = (
    <>
      <OB.Button variant="ghost" onClick={onClose}>
        Cancel
      </OB.Button>
      <OB.Button onClick={save} disabled={!x.name}>
        Save
      </OB.Button>
    </>
  );
  return (
    <OB.Dialog
      open
      onClose={onClose}
      eyebrow={it ? 'EDIT' : 'NEW ITEM'}
      title={it ? it.name : 'Add stock item'}
      width={560}
      footer={footer}
    >
      <div className="o-form">
        <div className="o-full">
          <OB.Input
            label="Name"
            value={x.name}
            onChange={set('name')}
            placeholder="Brass nozzle 0.4 mm, Box S, PTFE tube…"
          />
        </div>
        <OB.Select
          label="Category"
          value={x.category}
          onChange={set('category')}
          options={data.categories}
        />
        <OB.Input label="SKU" value={x.sku || ''} onChange={set('sku')} />
        <OB.Input
          label="On hand"
          type="number"
          value={String(x.qty)}
          onChange={set('qty')}
        />
        <OB.Input
          label="Unit"
          value={x.unit || ''}
          onChange={set('unit')}
          placeholder="pcs, m, L"
        />
        <OB.Input
          label="Reorder at"
          type="number"
          onChange={set('reorderAt')}
          value={x.reorderAt == null ? '' : String(x.reorderAt)}
          hint="Flags the item when it drops to this"
        />
        <OB.Input
          label="Location"
          value={x.location || ''}
          onChange={set('location')}
        />
        <div className="o-full">
          <OB.Input
            label="Supplier"
            value={x.supplier || ''}
            onChange={set('supplier')}
          />
        </div>
        <div className="o-full">
          <Textarea label="Notes" value={x.notes} onChange={set('notes')} />
        </div>
      </div>
    </OB.Dialog>
  );
}

Object.assign(window, {AdjustDialog, FilamentDialog, ItemDialog});
