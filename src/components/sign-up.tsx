'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Checkbox } from './ui/checkbox'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUser } from '@/services/auth.service'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { AIText } from './ai-text'

const formSchema = z
  .object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val, {
      message: 'Obrigatório',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof formSchema>

export function SignUp() {
  const router = useRouter()

  const formContext = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const { handleSubmit, control } = formContext

  async function onSubmit(values: FormData) {
    try {
      await createUser({
        email: values.email,
        password: values.password,
      })

      toast.success('Conta criada com sucesso!')
      router.push('/auth')
    } catch (error) {
      toast.error('Erro ao criar conta', {
        description: error instanceof Error ? error.message : 'Ocorreu um erro',
      })
    }
  }

  async function handleGoogleSignIn() {
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      toast.error('Erro ao entrar com Google', {
        description: error instanceof Error ? error.message : 'Ocorreu um erro',
      })
    }
  }

  return (
    <div>
      <h1 className="mt-[30px] lg:mt-[50px] text-2xl lg:text-[32px] font-bold text-black-1 mb-[8px] lg:mb-[18px] leading-none">
        Cadastrar
      </h1>
      <AIText prompt="Gere uma mensagem curta para a página de cadastro de uma plataforma de marketing de influência. Destaque benefícios como conexão com marcas e crescimento profissional. Use no máximo 10 palavras." />

      <Form {...formContext}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[500px] mt-[36px] lg:mt-[39px] px-0"
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4 gap-3">
                <FormLabel className="not-lg:text-xs">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e-mail@website.com"
                    {...field}
                    className="h-[61px] rounded-[8px] placeholder:text-gray-2 placeholder:not-lg:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4 gap-3">
                <FormLabel className="not-lg:text-xs">Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="min. 8 caracteres"
                    {...field}
                    className="h-[61px] rounded-[8px] placeholder:text-gray-2 placeholder:not-lg:text-sm"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-4 gap-3">
                <FormLabel className="not-lg:text-xs">
                  Confirmar Senha
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a mesma senha escolhida"
                    {...field}
                    className="h-[61px] rounded-[8px] placeholder:text-gray-2 placeholder:not-lg:text-sm"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mb-8 mt-[30px] flex justify-between">
            <FormField
              control={control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-default cursor-pointer size-5"
                    />
                  </FormControl>
                  <FormLabel className="!mt-0 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 not-lg:text-xs data-[error=true]:text-black">
                    Concordo com os{' '}
                    <span className="text-default cursor-pointer hover:text-default/90">
                      Termos e Condições
                    </span>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-default hover:bg-default/90 cursor-pointer mb-4 h-[51px] not-lg:text-sm"
          >
            Cadastrar
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full cursor-pointer gap-3 h-[51px] not-lg:text-xs"
          onClick={handleGoogleSignIn}
        >
          <Image
            src="./google-icon.svg"
            alt="Ícone do Google"
            width={24}
            height={24}
          />{' '}
          Entrar com o Google
        </Button>

        <span className="flex justify-center text-sm font-medium mt-6 not-lg:text-xs">
          Ainda não tem conta?
          <span className="text-default ml-0.5 cursor-pointer hover:text-default/90">
            Assine agora
          </span>
        </span>
      </Form>
    </div>
  )
}
