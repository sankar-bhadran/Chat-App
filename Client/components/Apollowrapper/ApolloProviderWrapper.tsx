"use client"; // Mark as a client component

import { ApolloProvider } from "@apollo/client";
import client from "../../lib/apollo-client";

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
