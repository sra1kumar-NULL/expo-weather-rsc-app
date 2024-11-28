"use client";
import React from "react";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";

// this page entirely is a client page
// client component without any server actions or operations
export const WeatherInput = ({ onPayload, isLoading }: any) => {
  const [city, setCity] = React.useState("Hyderabad");
  const [country, setCountry] = React.useState("India");

  return (
    <FormControl className="flex gap-1 flex-row items-center">
      <Input variant="outline" size="sm" className="flex-1">
        <InputField
          placeholder="City"
          value={city}
          onChangeText={(value) => setCity(value)}
        />
      </Input>
      <Input variant="outline" size="sm" className="flex-1">
        <InputField
          placeholder="Country"
          value={country}
          onChangeText={(value) => setCountry(value)}
        />
      </Input>
      <Button
        variant="solid"
        action="primary"
        onPress={() =>
          onPayload({
            city,
            country,
          })
        }
        className=" cursor-pointer"
      >
        {isLoading ? <ButtonSpinner /> : <ButtonText>Check</ButtonText>}
      </Button>
    </FormControl>
  );
};
