/// <reference types="react/canary" />
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { WeatherInput } from "@/components/custom";
import serverWeatherAction from "./actions/server";
import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverComponentRenderer, setServerComponentRenderer] = React.useState({
    isRendered: false,
    city: "",
    country: "",
  });
  const handlePayload = (payload: any) => {
    const { city, country } = payload;
    setIsLoading(true);
    if (city?.length && country?.length) {
      setServerComponentRenderer({
        isRendered: true,
        city: city,
        country: country,
      });
      setIsLoading(false);
    }
  };
  return (
    <VStack className="flex-1  md:items-center md:justify-center">
      {/* client */}
      <WeatherInput isLoading={isLoading} onPayload={handlePayload} />
      {/* server */}
      <Box className="w-[600px] min-h-[700px] mt-10">
        <React.Suspense fallback={<Spinner />}>
          {serverComponentRenderer.isRendered
            ? serverWeatherAction({
                city: serverComponentRenderer.city,
                country: serverComponentRenderer.country,
              })
            : null}
        </React.Suspense>
      </Box>
    </VStack>
  );
}
