import { ThemeSwitcher } from "../components/ThemeSwitcher"

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Settings</h1>

      <div className="space-y-6">
        <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Theme</h2>
          <div className="flex items-center space-x-4">
            <span>Toggle theme:</span>
            <ThemeSwitcher />
          </div>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Email notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Push notifications</span>
            </label>
          </div>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Account</h2>
          <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

