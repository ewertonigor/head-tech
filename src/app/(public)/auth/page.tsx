'use client'

import { SignIn } from '@/components/sign-in'
import { SignUp } from '@/components/sign-up'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

export default function AuthPage() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <div className="relative max-w-[720px] z-10 lg:pl-[91px] pt-[68px] lg:flex-1 flex flex-col items-center lg:items-start not-lg:mx-auto not-lg:mt-[27px] not-lg:mb-auto not-lg:bg-white rounded-[20px] not-lg:pt-[30px] not-lg:w-[90%] not-lg:max-w-[550px]">
        <Image
          src="./logo-tamojunto.svg"
          alt="Logo tamojunto"
          width={190}
          height={39}
          className="lg:ml-0"
        />

        <Tabs
          defaultValue="sign-in"
          className="w-full max-w-[500px] mt-[30px] lg:px-0 lg:mt-[50px]"
        >
          <TabsList className="bg-[#F5F7FD] not-lg:mx-auto rounded-[18px]">
            <TabsTrigger
              value="sign-in"
              className="px-8 font-medium data-[state=inactive]:text-gray-1 cursor-pointer rounded-[18px] data-[state=active]:shadow-none"
            >
              Entrar
            </TabsTrigger>
            <TabsTrigger
              value="sign-up"
              className="px-8 font-medium data-[state=inactive]:text-gray-1 cursor-pointer rounded-[18px] data-[state=active]:shadow-none"
            >
              Cadastrar
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="sign-in"
            className="not-lg:px-6 lg:px-0 pb-[39px]"
          >
            <SignIn />
          </TabsContent>
          <TabsContent
            value="sign-up"
            className="not-lg:px-6 lg:px-0 pb-39px lg:pb-0"
          >
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>

      <div className="fixed inset-0 lg:relative lg:flex-1 lg:h-screen -z-10 lg:z-0">
        <Image
          src="./background-image.svg"
          alt="A Transformação do Marketing Digital"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center pl-[176px] p-4 lg:flex not-lg:hidden">
          <h2 className="font-bold text-[50px] leading-[60px] tracking-[0.5%]">
            A Revolução do Marketing por
            <span className="font-bold text-[50px] leading-[60px] tracking-[0.5%] ml-3 text-[#4FD8CD]">
              Influência
            </span>
          </h2>
        </div>
      </div>
    </div>
  )
}
