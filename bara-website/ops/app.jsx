// Ops shell: sign-in, live data (snapshot + Server-Sent Events), navigation.

const OPS_PAGES = [
  ['floor', 'Floor', 'printer'],
  ['queue', 'Queue', 'list-ordered'],
  ['inventory', 'Inventory', 'package'],
  ['upkeep', 'Maintenance', 'wrench'],
  ['pricing', 'Pricing', 'calculator'],
  ['inbox', 'Inbox', 'inbox'],
  ['printers', 'Printers', 'settings-2'],
  ['team', 'Team', 'users'],
];
const LIVE_TOPICS = [
  'printers',
  'jobs',
  'requests',
  'users',
  'orders',
  'tasks',
  'costing',
  'inventory',
];
const parseOpsRoute = () => {
  const [r, sub] = location.hash.replace(/^#\/?/, '').split('/');
  return {r: OPS_PAGES.some((p) => p[0] === r) ? r : 'floor', sub};
};

/**
 * Loads the snapshot, then keeps it fresh from /api/events.
 * @return {!Array} [data, live]
 */
function useLiveData(user, setUser, toast) {
  const [data, setData] = React.useState(null);
  const [live, setLive] = React.useState(false);
  React.useEffect(() => {
    if (!user) return undefined;
    let es;
    let stopped = false;
    const load = () =>
      opsApi('GET', '/api/state')
        .then(setData)
        .catch((e) => {
          if (e.status === 401) setUser(null);
          else toast({tone: 'danger', title: 'Could not load: ' + e.message});
        });
    const connect = () => {
      es = new EventSource('/api/events');
      es.onopen = () => {
        setLive(true);
        load();
      };
      es.onerror = () => {
        setLive(false);
        if (es.readyState === 2 && !stopped) setTimeout(connect, 4000);
      };
      LIVE_TOPICS.forEach((t) =>
        es.addEventListener(t, (e) => {
          const v = JSON.parse(e.data);
          setData((d) => (d ? {...d, [t]: v} : d));
        }),
      );
    };
    load();
    connect();
    return () => {
      stopped = true;
      if (es) es.close();
    };
  }, [user]);
  return [data, live];
}

function OpsHeader({data, live, route, go, logout}) {
  const newReq = data.requests.filter((x) => x.status === 'new').length;
  const openTasks = data.tasks.filter((t) => t.status === 'open').length;
  const admin = data.user.role === 'admin';
  const pages = OPS_PAGES.filter(
    ([id]) => id !== 'printers' || admin || data.printers.length,
  );
  const count = {inbox: newReq, floor: openTasks};
  return (
    <header className="o-head">
      <div className="o-wrap o-head-row">
        <a href="#/floor" aria-label="Ops home" className="o-brand">
          <OB.Wordmark size={26} color="var(--paper-0)" />
          <span className="o-chip o-chip-yolk">OPS</span>
        </a>
        <nav className="o-nav" aria-label="Sections">
          {pages.map(([id, label, icon]) => (
            <button
              key={id}
              aria-current={route === id ? 'page' : undefined}
              onClick={() => go(id)}
            >
              <OB.Icon name={icon} size={16} />
              {label}
              {count[id] > 0 && <span className="o-count">{count[id]}</span>}
            </button>
          ))}
        </nav>
        <div className="o-grow" />
        <span
          className={'o-mono o-live' + (live ? ' is-on' : '')}
          title={live ? 'Receiving live updates' : 'Reconnecting…'}
        >
          <span className="o-live-dot" />
          {live ? 'LIVE' : 'OFFLINE'}
        </span>
        <a href="/" className="o-mono o-site-link">
          SITE ↗
        </a>
        <OB.Button
          size="sm"
          variant="secondary"
          icon="log-out"
          onClick={logout}
        >
          {data.user.username}
        </OB.Button>
      </div>
    </header>
  );
}

function OpsApp() {
  const [user, setUser] = React.useState(undefined);
  const [route, setRoute] = React.useState(parseOpsRoute());
  const [preset, setPreset] = React.useState(null);
  const [toast, toasts] = useToasts();
  const [data, live] = useLiveData(user, setUser, toast);
  React.useEffect(() => {
    opsApi('GET', '/api/auth/me')
      .then(setUser)
      .catch(() => setUser(null));
    const on = () => setRoute(parseOpsRoute());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const go = (r, sub, pre) => {
    setPreset(pre || null);
    location.hash = '/' + r + (sub ? '/' + sub : '');
  };
  const logout = async () => {
    await opsApi('POST', '/api/auth/logout').catch(() => {});
    setUser(null);
  };
  if (user === undefined) return null;
  if (!user) {
    return (
      <>
        <Login onIn={setUser} />
        {toasts}
      </>
    );
  }
  if (!data) {
    return (
      <div className="o-login">
        <OB.Mascot pose="printing" size={140} />
      </div>
    );
  }
  const {r, sub} = route;
  const pages = {
    floor: <FloorPage go={go} />,
    queue: <QueuePage sub={sub} go={go} preset={preset} />,
    inventory: <InventoryPage />,
    upkeep: <UpkeepPage />,
    pricing: <PricingPage />,
    inbox: <InboxPage go={go} />,
    printers: <PrintersPage sub={sub} go={go} />,
    team: <TeamPage />,
  };
  return (
    <OpsCtx.Provider value={{data, toast}}>
      <OpsHeader data={data} live={live} route={r} go={go} logout={logout} />
      <main className="o-wrap o-main">{pages[r]}</main>
      {toasts}
    </OpsCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<OpsApp />);
