"use server";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { ClockIcon, Icon, MoonIcon, SunIcon } from "@/components/ui/icon";

// this page completely runs on the server ! - this is a server action - a component renderered on the server with dynamic data.
export default async function serverAction(payload) {
  const { city, country } = payload;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=27feccc4b7c5211257af39641c4d96fd`
  );
  const weatherData = await response.json();
  console.log(weatherData, "this is response");

  return (
    <VStack className="items-center">
      <Card className="w-full max-w-md">
        <Text className="text-2xl font-bold text-center ">
          {weatherData.name}
        </Text>
        {Math.round(weatherData.main.temp) < 200 ? (
          <Icon as={ClockIcon}/>
        ) : Math.round(weatherData.main.temp) > 300 ? (
          <Icon as={SunIcon}/>
        ) : (
          <Icon as={MoonIcon}/>
        )}
        <VStack className="gap-4 mt-4">
          <HStack className="justify-between">
            <Text>Coordinates:</Text>
            <Text>
              Lat: {weatherData.coord.lat}, Lon: {weatherData.coord.lon}
            </Text>
          </HStack>
          <Divider />
          <HStack className="justify-between">
            <Text>Temperature:</Text>
            <Text>{weatherData.main.temp.toFixed(2)}°F</Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Feels Like:</Text>
            <Text>{weatherData.main.feels_like.toFixed(2)}°F</Text>
          </HStack>
          <Divider />
          <HStack className="justify-between">
            <Text>Humidity:</Text>
            <Text>{weatherData.main.humidity}%</Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Pressure:</Text>
            <Text>{weatherData.main.pressure} hPa</Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Wind Speed:</Text>
            <Text>{weatherData.wind.speed} m/s</Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Clouds:</Text>
            <Text>{weatherData.clouds.all}%</Text>
          </HStack>
          <Divider />
          <HStack className="justify-between">
            <Text>Sunrise:</Text>
            <Text>
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </Text>
          </HStack>
          <HStack className="justify-between">
            <Text>Sunset:</Text>
            <Text>
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </Text>
          </HStack>
        </VStack>
      </Card>
    </VStack>
  );
}
