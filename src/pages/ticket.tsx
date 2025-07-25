import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SessionController from "@/controllers/session.controller"
import TicketController from "@/controllers/ticket.controller";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "12",
    label: "wander.oliveira"
  },
  {
    value: "1036",
    label: "joao.chaves"
  }
]

function Ticket() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [amount, setAmount] = useState<number>(0)
  const [ticket, setTicket] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token")
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("Token")
      const session = new SessionController()
      await session.killSession(token)
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("Token")
      const ticketController = new TicketController()
      const techID = Number(value)
      await ticketController.createTicket(amount, ticket, techID, token)

      setAmount(0)
      setTicket('')
      alert("Chamados Abertos!")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex justify-center">
          <CardTitle>Cadastro de Ticket</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Quantidade</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    min={0}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="ticket">Chamado</Label>
                  </div>
                  <Textarea
                    id="ticket"
                    value={ticket}
                    placeholder="Cole o ticket aqui..."
                    onChange={(e) => setTicket(e.target.value)}
                    required
                  />
                </div>
              </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="mt-5" asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)?.label
                    : "Selecione um técnico..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                        >
                          {framework.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === framework.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-5">
            <Button type="submit" className="w-full">
              Abrir chamados
            </Button>
            <Button className="w-full bg-red-900 hover:bg-red-800" type="button" onClick={handleLogout}>
              Sair
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Ticket;