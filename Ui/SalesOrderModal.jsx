import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const SaleOrderModal = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  onDelete,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {},
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? "Edit Sale Order" : "Create Sale Order"}
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <form id="sale-order-form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Invoice No</FormLabel>
              <Input {...register("invoice_no")} autoComplete="off" />
            </FormControl>

            <FormControl>
              <FormLabel>Invoice Date</FormLabel>
              <Input
                type="date"
                {...register("invoice_date")}
                autoComplete="off"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Customer Name</FormLabel>
              <input
                {...register("customer_profile.name")}
                autoComplete="off"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Product</FormLabel>
              <input {...register("product")} autoComplete="off" />
            </FormControl>

            <FormControl>
              <FormLabel>Paid</FormLabel>
              <Select {...register("paid")} autoComplete="off">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Select>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          {initialData && (
            <Button colorScheme="red" mr={3} onClick={onDelete}>
              Delete
            </Button>
          )}
          <Button type="submit" form="sale-order-form" colorScheme="teal">
            {initialData ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
