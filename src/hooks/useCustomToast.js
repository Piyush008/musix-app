import { useToast } from "@chakra-ui/react";

export default function useCustomToast() {
  const toast = useToast();

  const customToast = () => {
    toast({
      title: "Enter musix first",
      isClosable: true,
      position: "top",
      status: "info",
      variant: "solid",
    });
  };
  return customToast;
}
