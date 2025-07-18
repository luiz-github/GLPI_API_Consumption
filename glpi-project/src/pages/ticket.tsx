import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import SessionController from "../controllers/session.controller"

export function Ticket() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    try {
      const token = localStorage.getItem("Token")
      const session = new SessionController()
      session.killSession(token)
    } catch (error) {
      
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex justify-center">
          <CardTitle>Cadastro de Ticket</CardTitle>
        </CardHeader>
        <form>
          <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Quantidade</Label>
                  <Input
                    id="amount"
                    type="number"
                    defaultValue={1}
                    min={0}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="ticket">Chamado</Label>
                  </div>
                  <Textarea
                    id="ticket"
                    placeholder="Cole o ticket aqui..."
                    required
                  />
                </div>
              </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-5">
            <Button type="submit" className="w-full">
              Abrir chamados
            </Button>
            <Button className="w-full bg-red-900 hover:bg-red-800">
              Sair
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Ticket;