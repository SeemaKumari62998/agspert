import {
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Box,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import ActiveSalesOrder from "../pages/ActiveSalesOrder";
import CompletedSalesOrder from "../pages/CompletedSalesOrder";
import SaleOrderModal from "./SalesOrderModal";

function MainTab() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue("black", "white");

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleEdit = (order) => {
    setCurrentOrder(order);
    onOpen();
  };

  const handleSubmit = (data) => {
    const newOrder = { ...data };
    newOrder.paid = newOrder.paid === "true";

    if (newOrder.paid) {
      newOrder.completed = true;
      newOrder.status = "Paid";
    } else {
      newOrder.completed = false;
      newOrder.status = "Pending";
    }

    setOrders((prevOrders) => [...prevOrders, newOrder]);

    onClose();
  };

  const handleDelete = () => {
    if (currentOrder) {
      setOrders((prevOrders) =>
        prevOrders.filter(
          (order) => order.invoice_no !== currentOrder.invoice_no
        )
      );
      onClose();
    }
  };

  const handleNewOrder = () => {
    setCurrentOrder(null);
    onOpen();
  };

  return (
    <Box w="100%" p={5} m={20} color={textColor}>
      <Box position="absolute" fontSize="30px" top="20px" right="60px">
        {colorMode === "light" ? (
          <MoonIcon onClick={toggleColorMode} cursor="pointer" />
        ) : (
          <SunIcon onClick={toggleColorMode} cursor="pointer" color="white" />
        )}
        <Button
          ml="20px"
          size="md"
          height="40px"
          width="150px"
          border="1px"
          borderColor="green.500"
          onClick={handleNewOrder}
          color="black"
          _hover={{ background: "teal" }}
        >
          +Sales Order
        </Button>
      </Box>

      <Tabs variant="soft-rounded" colorScheme="teal" mt="80px">
        <Flex m="10" mb="20px">
          <TabList gap="30px">
            <Tab>Active Sales Order</Tab>
            <Tab>Completed Sales Order</Tab>
          </TabList>
        </Flex>

        <TabPanels>
          <TabPanel>
            <ActiveSalesOrder
              orders={orders.filter((order) => !order.completed)}
              onEdit={handleEdit}
            />
          </TabPanel>
          <TabPanel>
            <CompletedSalesOrder
              orders={orders.filter((order) => order.completed)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <SaleOrderModal
        isOpen={isOpen}
        onClose={onClose}
        initialData={currentOrder}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </Box>
  );
}

export default MainTab;
