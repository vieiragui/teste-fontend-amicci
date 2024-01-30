'use client'

import { cityService } from "@/service/city-service";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { weatherService } from "@/service/weather-service";
import { useEffect, useState } from "react";
import { Coordinates } from "@/interface/coordinates";
import { animated, useSpring } from "react-spring";

const schema = z.object({
  city: z.string().trim().min(4, { message: 'Cidade é obrigatório' })
})

type FormProps = z.infer<typeof schema>

export default function Home() {
  const { register, handleSubmit, formState: { isValid }, resetField } = useForm<FormProps>({
    resolver: zodResolver(schema)
  })
  const [weathers, setWeathers] = useState<any>([])
  const [coordinatesCurrent, setCoordinatesCurrent] = useState<Coordinates>()
  const [isSearching, setIsSearching] = useState(false);

  const fadeIn = useSpring({
    opacity: isSearching ? 1 : 0,
    transform: isSearching ? 'translateY(0)' : 'translateY(20px)',
  });

  const submitForm = async (data: any) => {
    const coordinates = await cityService.getCoordinates(data.city);
    const weather = await weatherService.getWeather(coordinates);

    setWeathers(weather)
  }

  const onSucess = (position: any) => {
    const coordinates: Coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    setCoordinatesCurrent(coordinates)
  }

  const onError = () => {
    console.log('error')
  }

  const currentWeather = async () => {
    setIsSearching(true)
    const weather = await weatherService.getWeather(coordinatesCurrent as Coordinates);

    setWeathers(weather)
  }

  useEffect(() => {
    resetField('city')
    navigator.geolocation.getCurrentPosition(onSucess, onError)
  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full">
        <form className="md:max-w-2xl w-full p-4 bg-white shadow-md rounded-md" onSubmit={handleSubmit(submitForm)}>
          <div className="relative mb-4">

            <TextField
              {...register('city')}
              className="shadow-2xl w-full rounded-md"
              id="outlined-basic"
              label="Digite sua Cidade"
              variant="outlined"
            />

            <div className="flex items-center justify-center space-x-5 my-5">
              <Button disabled={!isValid} variant="contained" color="primary" type="submit" className="mr-2">
                Pesquisar Cidade
              </Button>

              <Button variant="contained" color="primary" onClick={currentWeather}>
                Consultar Clima Local
              </Button>
            </div>

            <animated.div style={fadeIn} className="mt-4">
              <Typography variant="h6" component="div" color="textPrimary">
                Clima Atual: {weathers}
              </Typography>
            </animated.div>
          </div>
        </form>
      </div>
    </div>
  );
}
