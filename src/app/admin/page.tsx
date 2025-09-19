export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Overview of your application</p>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-lg border bg-card text-card-foreground p-4">
                    <div className="text-sm text-muted-foreground">Users</div>
                    <div className="mt-2 text-2xl font-semibold">1,245</div>
                    <div className="mt-1 text-xs text-muted-foreground">+3.2% from last week</div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground p-4">
                    <div className="text-sm text-muted-foreground">Revenue</div>
                    <div className="mt-2 text-2xl font-semibold">$23,580</div>
                    <div className="mt-1 text-xs text-muted-foreground">+12.4% from last week</div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground p-4">
                    <div className="text-sm text-muted-foreground">Active</div>
                    <div className="mt-2 text-2xl font-semibold">321</div>
                    <div className="mt-1 text-xs text-muted-foreground">+1.1% from last week</div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground p-4">
                    <div className="text-sm text-muted-foreground">Tickets</div>
                    <div className="mt-2 text-2xl font-semibold">18</div>
                    <div className="mt-1 text-xs text-muted-foreground">-8.0% from last week</div>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="rounded-lg border bg-card text-card-foreground p-4 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold">Recent Activity</h2>
                        <button className="text-sm px-2 py-1 rounded border hover:bg-accent">
                            View all
                        </button>
                    </div>
                    <ul className="mt-4 space-y-3 text-sm">
                        <li className="flex items-center justify-between">
                            <span>New user signed up</span>
                            <span className="text-muted-foreground">2m ago</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span>Order #1024 paid</span>
                            <span className="text-muted-foreground">14m ago</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span>Support ticket closed</span>
                            <span className="text-muted-foreground">1h ago</span>
                        </li>
                    </ul>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground p-4">
                    <h2 className="text-base font-semibold">Quick Actions</h2>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <button className="px-3 py-2 rounded border hover:bg-accent">Add user</button>
                        <button className="px-3 py-2 rounded border hover:bg-accent">Create report</button>
                        <button className="px-3 py-2 rounded border hover:bg-accent">View logs</button>
                        <button className="px-3 py-2 rounded border hover:bg-accent">Settings</button>
                    </div>
                </div>
            </section>
        </div>
    );
}


