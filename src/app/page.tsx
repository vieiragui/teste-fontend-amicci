'use client'

import { cityService } from "@/service/city-service";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  city: z.string().trim().min(4, { message: 'Cidade é obrigatório' })
})

type FormProps = z.infer<typeof schema>

export default function Home() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormProps>({
    resolver: zodResolver(schema)
  })

  const submitForm = async (data: any) => {
    const result = await cityService.getCoordinates(data.city);

    console.log('result', result)
  }

  return (
    <form className="md:max-w-2xl" onSubmit={handleSubmit(submitForm)}>
      <div className="relative content-center">
        <div className="grid grid-cols-2 gap-4">
          <TextField {...register('city')} className="shadow-2xl" id="outlined-basic" label="Digite sua Cidade" variant="outlined" />
        </div>
        <div>
          <Button disabled={!isValid} variant="contained" color="primary" type="submit">
            Pesquisar Cidade
          </Button>

          <Button variant="contained" color="primary">
            Consultar Clima
          </Button>
        </div>
      </div>
    </form>
  );
}
