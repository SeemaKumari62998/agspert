import React from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const CompletedSalesOrder = ({ orders }) => (
  <Box>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Invoice No</Th>
          <Th>Date</Th>
          <Th>Customer Name</Th>
          <Th>Product</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr key={order.invoice_no}>
            <Td>{order.invoice_no}</Td>
            <Td>{order.invoice_date}</Td>
            <Td>{order.customer_profile?.name || "N/A"}</Td>
            <Td>{order.product}</Td>
            <Td>{order.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

export default CompletedSalesOrder;
