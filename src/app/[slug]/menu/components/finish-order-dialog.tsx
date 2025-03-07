"use client"; // Indica que este componente deve ser executado no lado do cliente no Next.js.

import { zodResolver } from "@hookform/resolvers/zod"; // Adapta Zod para funcionar com React Hook Form.
import { useForm } from "react-hook-form"; // Biblioteca para manipulação de formulários.
import { PatternFormat } from "react-number-format"; // Permite aplicar formatação ao campo de entrada (neste caso, CPF).
import { z } from "zod"; // Zod é uma biblioteca para validação de schemas de dados.

import { Button } from "@/components/ui/button"; // Importa um componente de botão reutilizável.
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"; // Importa componentes para criar um modal deslizante (drawer).
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Componentes de formulário estilizados.
import { Input } from "@/components/ui/input"; // Componente de campo de entrada estilizado.

import { isValidCpf } from "../helpers/cpf"; // Função auxiliar para validar CPF.

// Define o tipo baseado no schema de validação.
type FormSchema = z.infer<typeof formSchema>;
// `z.infer<typeof formSchema>` extrai automaticamente o tipo do esquema,
// garantindo que o TypeScript reconheça corretamente os tipos do formulário.

interface FinishOrderOrderdialogProps {
  open: boolean; // Indica se o modal está aberto.
  onOpemChange: (open: boolean) => void; // Função para atualizar o estado de abertura do modal.
}

// Define o esquema de validação do formulário usando Zod.
const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  // `z.string()` define que o campo deve ser do tipo string.
  // `.trim()` remove espaços em branco no início e no final do texto.
  // `.min(1, { message: "O nome é obrigatório" })` exige que o campo tenha pelo menos 1 caractere.

  cpf: z
    .string() // CPF deve ser uma string.
    .trim() // Remove espaços extras no início e fim da string.
    .min(1, { message: "CPF é obrigatório" }) // Garante que o campo não seja vazio.
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido.", // Valida o CPF usando a função isValidCpf.
    }),
});

const FinishOrderOrderdialog = ({
  open,
  onOpemChange,
}: FinishOrderOrderdialogProps) => {
  // Inicializa o formulário com React Hook Form e validação via Zod.
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema), // Usa o esquema definido acima.
    defaultValues: {
      name: "", // Valor padrão do campo "nome".
      cpf: "", // Valor padrão do campo "CPF".
    },
    shouldUnregister: true, // Remove valores do formulário ao desmontar componentes.
  });

  // Função chamada ao enviar o formulário.
  const onSubmit = (data: FormSchema) => {
    console.log({ data }); // Apenas exibe os dados no console por enquanto.
  };

  return (
    <Drawer open={open} onOpenChange={onOpemChange}>
      <DrawerTrigger></DrawerTrigger>{" "}
      {/* Gatilho que pode ser usado para abrir o drawer */}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido?</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar seu pedido.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Campo Nome */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome..." {...field} />
                    </FormControl>
                    <FormMessage /> {/* Exibe mensagens de erro caso existam */}
                  </FormItem>
                )}
              />
              {/* Campo CPF */}
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF..."
                        format="###.###.###-##" // Aplica máscara ao CPF.
                        customInput={Input} // Usa o componente Input estilizado.
                        {...field}
                      />
                    </FormControl>
                    <FormMessage /> {/* Exibe mensagens de erro caso existam */}
                  </FormItem>
                )}
              />
              <DrawerFooter>
                {/* Botão para submeter o formulário */}
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                >
                  Finalizar
                </Button>
                {/* Botão para fechar o drawer sem submeter */}
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full rounded-full">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderOrderdialog; // Exporta o componente para uso em outros arquivos.
