import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import { Provider, ResourcePicker } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
export default function Dashboard() {
  // const [selectedProduct, setSelectedProduct] = useState([]);
  // useEffect(() => {
  //   selectedProduct=async(prev)=>{

  //   }
  // }, [selectedProduct]);
  const fetch = useAuthenticatedFetch();
  const [state, setState] = useState({ open: false });
  const handleBackendCall = async () => {
    const response = await fetch("/api/products/count");

    if (response.ok) {
      console.log(response);
    } else {
      console.log("Error");
    }
  };

  const handleShopSync = async () => {
    const response = await fetch("/api/shop/shopSync");
    if (response.status == 200) {
      console.log(response);
    } else {
      console.log("Error");
    }
  };

  const handleLoadSelectedProduct = async () => {
    const response = await fetch("/api/app/product/getProduct");
    if (response.status == 200) {
      console.log(response);
    } else {
      console.log("Error");
    }
  };
  const handleSelection = (resources) => {
    setState({ open: true });
    console.log(resources);
  };

  return (
    <Page fullWidth>
      <TitleBar
        title="Page name"
        primaryAction={{
          content: "Sync Product",
          onAction: () => {
            handleBackendCall();

            handleLoadSelectedProduct();
            setState({ open: true });
          },
        }}
        secondaryActions={[
          {
            content: "Sync Shop",
            accessibilityLabel: "Sync your shop",
            onAction: () => {
              handleShopSync();
            },
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
              <ResourcePicker // Resource picker component
                resourceType="Product"
                showVariants={false}
                open={state.open}
                onSelection={(resources) => handleSelection(resources)}
                onCancel={() => setState({ open: false })}
              />
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
