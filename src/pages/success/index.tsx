import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Container, Grid, TextField} from "@mui/material";
import {useGuestLoginUser} from "@/quires/useGuestLogin.query";
import {useGuestSignUpUser} from "@/quires/useGuestSignUp.query";
import {useRouter} from "next/router";

const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    let params ;
    let accessToken 
    if (typeof window !== "undefined") {
       params = new URLSearchParams(window!.location!.search!);
       accessToken = params.get("deviceId");
      }

    return (
    <>
        <Container maxWidth={"sm"}>
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
            >로그인 성공!
            </Grid>
        </Container>
    </>
  );
};
export default Page;