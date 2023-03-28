import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { iStyledInput } from "@/interfaces/pages.interfaces";

export const StyledInput = ({ label, inputType, placeholder, register, errors, value }: iStyledInput) => {
    return (
        <FormControl isRequired isInvalid={!!errors}>
            <FormLabel fontSize={"sm"}>{label}</FormLabel>
            <Input
                type={inputType}
                placeholder={placeholder}
                defaultValue={value || ""}
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
