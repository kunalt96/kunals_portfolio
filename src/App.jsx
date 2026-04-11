import portfolioData from "./data/portfolioData.json"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground grid place-items-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Setup Complete!</h1>
        <p className="text-muted-foreground max-w-sm">
          Tailwind, the Shadcn configuration, and {portfolioData.personal.name}'s JSON data are all hooked up and ready.
        </p>
      </div>
    </div>
  )
}

export default App
