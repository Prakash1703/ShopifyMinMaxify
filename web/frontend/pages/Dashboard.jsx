import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import { Provider, ResourcePicker } from "@shopify/app-bridge-react";
import { useEffect, useState, useCallback } from "react";
import { Frame, Loading } from "@shopify/polaris";
import React from "react";
import {
  ResourceList,
  ResourceItem,
  Thumbnail,
  TextField,
  EmptySearchResult,
  IndexTable,
  useIndexResourceState,
  Button,
} from "@shopify/polaris";
export default function Dashboard() {
  const fetch = useAuthenticatedFetch();
  let [selectedProduct, setSelectedProduct] = useState([]);
  let [isDataLoaded, setDataLoaded] = useState(false);
  const [productPicekrState, setproductPicekrState] = useState({ open: false });
  const [shopSync, setShopSync] = useState(false);

  //This is used to load data on first time load and every time selected product is changed
  useEffect(async () => {
    if (shopSync == false) {
      const shopresponse = await fetch("/api/shop/shopSync");
      console.log("GET SHOP CALL");
      if (shopresponse.status == 200) {
        setShopSync(true);
      } else {
        console.log("Error");
      }
    }

    if (isDataLoaded == false) {
      let response = await fetch("/api/app/product/getProduct");
      if (response.status == 200) {
        const data = await response.json();
        if (data.success == 1) {
          setSelectedProduct(data.productList);
        }
        setDataLoaded(true);
      } else {
        console.log("Error While fetcing data form db:");
      }
    }
  }, [selectedProduct]);

  // This method is used for syncing shop data to database
  const handleShopSync = async () => {
    const response = await fetch("/api/shop/shopSync");
    console.log("GET SHOP CALL");
    if (response.status == 200) {
      console.log(response);
    } else {
      console.log("Error");
    }
  };

  //This method is used for getting product list from db and setting into selectedProduct state
  const handleLoadSelectedProduct = async () => {
    let response = await fetch("/api/app/product/getProduct");
    if (response.status == 200) {
      const data = await response.json();
      setSelectedProduct(data.productList);
      setDataLoaded(true);
    } else {
      console.log("Error While fetcing data form db:");
    }
  };

  const handleSelection = async (resources) => {
    console.log("Selected Product:", resources.selection);
    setproductPicekrState({ open: false });
    var data = resources.selection.map((value, index) => {
      if (selectedProduct.indexOf(value.id) == -1) {
        return {
          id: value.id,
          title: value.title,
          handle: value.handle,
          image: value.images[0].originalSrc,
          minQty: null,
          maxQty: null,
        };
      }
    });
    if (data.length > 0) {
      setSelectedProduct((prevState) => [...data]);
    }
    console.log("STATE:", selectedProduct);
    console.log("DATA:", data);
    const method = "POST";
    const obj = {
      selectedProduct: data,
    };
    const response = await fetch("/api/app/product/upsertProduct", {
      method,
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Get Product Call");
    if (response.status == 200) {
      console.log(response);
    } else {
      console.log("Error");
    }
  };
  const GetMaxQtyValue = (newValue,id) => {
    var data = selectedProduct.map((value, index) => {
      if (value.id == id) {
        console.log("ID>>>:", value.id);
        return {
          id: value.id,
          title: value.title,
          handle: value.handle,
          image: value.image,
          minQty: value.minQty,
          maxQty: newValue,
        };
      } else {
        return {
          id: value.id,
          title: value.title,
          handle: value.handle,
          image: value.image,
          minQty: value.minQty,
          maxQty: value.maxQty,
        };
      }
    });

    setSelectedProduct(data);
  };
  const GetMinQtyValue = (newValue, id) => {
    var data = selectedProduct.map((value, index) => {
      if (value.id == id) {
        return {
          id: value.id,
          title: value.title,
          handle: value.handle,
          image: value.image,
          minQty: newValue,
          maxQty: value.maxQty,
        };
      } else {
        return {
          id: value.id,
          title: value.title,
          handle: value.handle,
          image: value.image,
          minQty: value.minQty,
          maxQty: value.maxQty,
        };
      }
    });
    setSelectedProduct(data);
  };
  const handlePublishProduct =async (id) => {
    var data = {};
    selectedProduct.map((value, index) => {
      if (value.id == id) {
        return (data = value);
      }
    });

    console.log("To be Publish Data>>>:", data);
    const method = "POST";
    const obj = {
      selectedProduct: [data],
    };
    const response = await fetch("/api/app/product/upsertProduct", {
      method,
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Get Product Call");
    if (response.status == 200) {
      console.log(response);
    } else {
      console.log("Error");
    }
    
  };

  //setting data table for product
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(selectedProduct);
  const emptyStateMarkup = (
    <EmptySearchResult
      title={"No Product yet"}
      description={"Try changing the filters or search term"}
      withIllustration
    />
  );
  const rowMarkup = selectedProduct.map(
    ({ id, title, handle, image, published, minQty, maxQty }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        minQty={minQty}
        maxQty={maxQty}
      >
        <IndexTable.Cell>
          <Thumbnail source={image} alt="Black choker necklace" />
        </IndexTable.Cell>

        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>
          <TextField
            type="number"
            autoComplete="off"
            minlength="2"
            maxlength="2"
            id={id}
            value={minQty?minQty:""}
            onChange={(value, id) => {
              GetMinQtyValue(value, id);
            }}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <TextField
            type="number"
            autoComplete="off"
            minlength="2"
            maxlength="2"
            id={id}
            value={maxQty?maxQty:""}
            onChange={(value, id) => {
              GetMaxQtyValue(value, id);
            }}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          {published ? (
            <Button
              destructive
              onClick={() => {
                alert(id);
              }}
              buttonProps={id}
            >
              UnPublished
            </Button>
          ) : (
            <Button
              primary
              fullWidth
              id={id}
              onClick={() => handlePublishProduct(id)}
            >
              Publish
            </Button>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Button destructive>Remove</Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  return (
    <Page fullWidth>
      <TitleBar
        title="Page name"
        primaryAction={{
          content: "Add Product",
          onAction: () => {
            handleLoadSelectedProduct();
            // handleShopSync();
            setproductPicekrState({ open: true });
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
            <IndexTable
              resourceName={{ singular: "product", plural: "products" }}
              itemCount={selectedProduct.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              emptyState={emptyStateMarkup}
              headings={[
                { title: "Product" },
                { title: "Title" },
                { title: "Min Quantity" },
                { title: "Max Quantity" },
                { title: "Publish" },
                { title: "Remove" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
            <ResourcePicker
              resourceType="Product"
              showVariants={false}
              open={productPicekrState.open}
              initialSelectionIds={selectedProduct}
              onSelection={(resources) => handleSelection(resources)}
              onCancel={() => setproductPicekrState({ open: false })}
            />
          </Card>
        </Layout.Section>
      </Layout>
      {!isDataLoaded ? (
        <div style={{ height: "100px" }}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      ) : null}
    </Page>
  );
}
