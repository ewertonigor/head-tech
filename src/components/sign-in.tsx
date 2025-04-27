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

export function SignIn() {
  const formContext = useForm()

  const { handleSubmit, control } = formContext

  function onSubmit(data: unknown) {
    console.log(data)
  }

  return (
    <div>
      <h1 className="mt-[30px] lg:mt-[50px] text-2xl lg:text-[32px] font-bold text-black-1 mb-[8px] lg:mb-[18px] leading-none">
        Entrar
      </h1>
      <span className="text-gray-1 not-lg:text-xs">
        Non sit purus tempus malesuada poten
      </span>

      <Form {...formContext}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[500px] mt-[36px] lg:mt-[39px] px-0"
        >
          <FormField
            control={control}
            name="username"
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
            name="username"
            render={({ field }) => (
              <FormItem className="mb-4 gap-3">
                <FormLabel className="not-lg:text-xs">Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="min. 8 caracteres"
                    {...field}
                    className="h-[61px] rounded-[8px] placeholder:text-gray-2 placeholder:not-lg:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mb-8 mt-[30px] flex justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="data-[state=checked]:bg-default cursor-pointer size-5"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 not-lg:text-xs"
              >
                Lembrar
              </label>
            </div>

            <span className="text-default font-medium text-sm cursor-pointer hover:text-default/90 not-lg:text-xs">
              Esqueceu a senha?
            </span>
          </div>

          <Button
            type="submit"
            className="w-full bg-default hover:bg-default/90 cursor-pointer mb-4 h-[51px] not-lg:text-sm"
          >
            Entrar
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer gap-3 h-[51px] not-lg:text-xs"
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
        </form>
      </Form>
    </div>
  )
}
