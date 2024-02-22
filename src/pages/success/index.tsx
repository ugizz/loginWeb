import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Container, Grid, TextField} from "@mui/material";
import {useGuestLoginUser} from "@/quires/useGuestLogin.query";
import {useGuestSignUpUser} from "@/quires/useGuestSignUp.query";
import {useRouter} from "next/router";
import { Unity, useUnityContext } from "react-unity-webgl";

const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    const unityCon = useUnityContext;

    let params ;
    let accessToken 
    if (typeof window !== "undefined") {
       params = new URLSearchParams(window!.location!.search!);
       accessToken = params.get("accessToken");
    }
    
    function sendToken() {
        location.href = "uniwebview://action?accessToken="+accessToken;
        
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
            >
                <Button
                    variant={"text"}
                    onClick={sendToken}
                >
                    로그인 성공
                </Button>
            </Grid>
            
        </Container>
    </>
  );
};
export default Page;