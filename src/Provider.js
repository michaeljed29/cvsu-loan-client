import { QueryClient, QueryClientProvider } from "react-query";

const Provider = (props) => {
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default Provider;
