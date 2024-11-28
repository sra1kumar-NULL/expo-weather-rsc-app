"use server";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";

// this page completely runs on the server ! - this is a server action - a component renderered on the server with dynamic data.
export default async function serverAction(payload) {
  const { city, country } = payload;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.EXPO_PUBLIC_API}`
  );
  const weatherData = await response.json();
  if (!weatherData || weatherData?.message) {
    return <Text className="text-center">Can't fetch report for {city}</Text>;
  }
  const conditionalFactor =
    Math.round(Math.round(weatherData?.main?.temp ?? 276) - 273) < 26;

  return (
    <VStack className="items-center">
      <Card
        className={`w-full max-w-md border ${
          conditionalFactor ? "border-blue-300" : " border-orange-200"
        }`}
      >
        <HStack className="items-center justify-between px-4 mt-4">
          <Text className="text-2xl font-bold ">{weatherData?.name}</Text>
          <Image
            size="md"
            source={
              conditionalFactor
                ? require("@/assets/images/snowflake.png")
                : require("@/assets/images/sunny.png")
            }
            alt="weather image"
            className="self-center animate-bounce "
          />
        </HStack>

        <VStack className="gap-4 mt-4">
          <HStack className="justify-between">
            <Text>Coordinates:</Text>
            <Text>
              Lat: {weatherData?.coord?.lat}, Lon: {weatherData?.coord?.lon}
            </Text>
          </HStack>
          <Divider />
          <HStack className="justify-between">
            <Text>Temperature:</Text>
            <Text>{(weatherData?.main?.temp - 273).toFixed(2)}°C</Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Feels Like:</Text>
            <Text>{(weatherData?.main?.feels_like - 273).toFixed(2)}°C</Text>
          </HStack>
          <Divider />
          <HStack className="justify-between">
            <Text>Humidity:</Text>
            <Text>{weatherData?.main?.humidity}%</Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Pressure:</Text>
            <Text>{weatherData?.main?.pressure} hPa</Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Wind Speed:</Text>
            <Text>{weatherData?.wind?.speed} m/s</Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Clouds:</Text>
            <Text>{weatherData?.clouds?.all}%</Text>
          </HStack>
          <Divider />
          <HStack className="justify-between">
            <Text>Sunrise:</Text>
            <Text>
              {new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString()}
            </Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Sunset:</Text>
            <Text>
              {new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString()}
            </Text>
          </HStack>
        </VStack>
      </Card>
    </VStack>
  );
}
