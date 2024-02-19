import type { ReactElement } from "react";
import Layout from "@/components/layout";
import type { NextPageWithLayout } from "./_app";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { AlertStateTypes, useAlertStore } from "@/zustand/alertState";
import { Button } from "@mui/material";

interface Props {}

const Index: NextPageWithLayout = (props: Props) => {
  const { t, lang } = useTranslation("common");
  const { setOpen: alert } = useAlertStore((state: AlertStateTypes) => state);

  return (
    <>
      <br />
      <br />
      <Button
        variant="outlined"
        onClick={() =>
          alert({
            open: true,
            severity: "success",
            message: "success",
            callBack: () => {
              console.log("callBack");
            },
          })
        }
      >
        openAlert
      </Button>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
