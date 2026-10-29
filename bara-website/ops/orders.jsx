// Paid orders (from the shop's checkout, a store system or staff) and
// payments that started but aren't confirmed yet.

const CHECKOUT_BADGE = {
  pending: ['warning', 'Awaiting payment'],
  mismatch: ['danger', 'Amount mismatch'],
};

function PendingPayments() {
  const {data} = useOps();
  const act = useAct();
  const list = data.checkouts || [];
  if (!list.length) return null;
  return (
    <section className="o-card o-mb16">
      <h2 className="o-h2">Payments not confirmed yet</h2>
      <p className="o-sub">
        Customers who reached the payment page. They become orders by themselves
        when the provider confirms. Re-check one if a confirmation got lost.
      </p>
      {list.map((c) => {
        const st = CHECKOUT_BADGE[c.status] || ['neutral', c.status];
        return (
          <div key={c.ref} className="o-todo-row">
            <span className="o-mono">{c.ref}</span>
            <div className="o-grow">
              <b>{c.customer && c.customer.name}</b>
              <div className="o-mono o-dim">
                {fmtSar(c.total)} · {c.lines.length} LINE
                {c.lines.length > 1 ? 'S' : ''} · {fmtAgo(c.createdAt)}
                {c.note ? ' · ' + c.note : ''}
              </div>
            </div>
            <OB.Badge tone={st[0]} dot>
              {st[1]}
            </OB.Badge>
            <OB.Button
              size="sm"
              variant="secondary"
              icon="refresh-cw"
              onClick={() =>
                act(
                  () => opsApi('POST', '/api/checkouts/' + c.ref + '/check'),
                  'Checked with the provider',
                )
              }
            >
              Re-check
            </OB.Button>
          </div>
        );
      })}
    </section>
  );
}

function OrderCustomer({c}) {
  if (!c) return <span className="o-dim">—</span>;
  return (
    <div className="o-min0">
      <b>{c.name}</b>
      {c.phone && (
        <div className="o-mono">
          <a href={'tel:' + c.phone}>{c.phone}</a>
        </div>
      )}
      {c.email && (
        <div className="o-mono">
          <a href={'mailto:' + c.email}>{c.email}</a>
        </div>
      )}
    </div>
  );
}

function OrdersTable() {
  const {data} = useOps();
  const pending = <PendingPayments />;
  if (!data.orders.length) {
    return (
      <>
        {pending}
        <Empty title="No paid orders yet" pose="hello">
          <span>
            Paid orders from the shop or your payment provider land here and are
            queued automatically.
            {!data.payments && ' Online payment isn’t switched on yet.'}
          </span>
        </Empty>
      </>
    );
  }
  return (
    <>
      {pending}
      <div className="o-scroll">
        <table className="o-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Paid</th>
              <th>Jobs</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((o) => (
              <tr key={o.id}>
                <td className="o-mono">{o.ref}</td>
                <td>
                  <OrderCustomer c={o.customer} />
                </td>
                <td>
                  {o.items.map((l, i) => (
                    <div key={i} className="o-row o-nowrap">
                      <Swatch hex={l.hex} size={14} />
                      {l.qty} × {l.title}
                    </div>
                  ))}
                </td>
                <td className="o-mono">
                  {o.payment ? (
                    <>
                      {fmtSar(o.payment.total)}
                      <div className="o-dim">
                        {(o.payment.method || 'paid') +
                          ' · ' +
                          o.payment.provider}
                      </div>
                    </>
                  ) : (
                    <span className="o-dim">{o.by}</span>
                  )}
                </td>
                <td className="o-mono">
                  {o.items
                    .flatMap((l) => l.jobs)
                    .map((id) => {
                      const j = data.jobs.find((x) => x.id === id);
                      return (
                        <div key={id}>
                          {id} · {j ? JOB_BADGE[j.status][1] : 'archived'}
                        </div>
                      );
                    })}
                </td>
                <td className="o-mono o-dim">{fmtAgo(o.at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

Object.assign(window, {PendingPayments, OrderCustomer, OrdersTable});
