import { Button } from "../components/ui/button"

function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-lg text-muted-foreground">Página não encontrada</p>
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          Voltar para o início
        </Button>
      </div>
    </div>
  )
}

export default NotFound