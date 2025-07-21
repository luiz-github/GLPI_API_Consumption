import {
  useEffect,
  useState 
} from "react"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useNavigate } from "react-router-dom"
import initSession from "../controllers/session.controller"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      navigate("/ticket");
    }
  }, [navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const session = new initSession()
      const login = await session.initSession(username, password) as {
        success: boolean;
        data: any;
      };

      if (login.success == false) {
        alert("Credenciais incorretas!")
      }

      navigate('/ticket')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login - Unimontes</CardTitle>
          <CardDescription>
            Credenciais do GLPI da Unimontes
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    id="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input 
                  id="password" 
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required />
                </div>
              </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full mt-5">
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login