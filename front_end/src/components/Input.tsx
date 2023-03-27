import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface iStyledInput {
    label: string;
    inputType: HTMLInputTypeAttribute;
    placeholder: string;
    register: UseFormRegisterReturn<string>;
    errors: FieldError | undefined;
}

export const StyledInput = ({ label, inputType, placeholder, register, errors }: iStyledInput) => {
    return (
        <FormControl isRequired isInvalid={!!errors}>
            <FormLabel fontSize={"sm"}>{label}</FormLabel>
            <Input
                type={inputType}
                placeholder={placeholder}
                fontSize={"sm"}
                bgColor={"blackAlpha.200"}
                color={"gray.800"}
                focusBorderColor={errors ? "red.500" : "pink.400"}
                {...register}
            />
            {errors && <FormErrorMessage>{errors?.message}</FormErrorMessage>}
        </FormControl>
    );
};
