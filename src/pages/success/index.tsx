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
        console.log(accessToken)
    }
    const { unityProvider, sendMessage } = useUnityContext({
        loaderUrl: "build/myunityapp.loader.js",
        dataUrl: "build/myunityapp.data",
        frameworkUrl: "build/myunityapp.framework.js",
        codeUrl: "build/myunityapp.wasm",
    });

    const handleClickSpawnEnemies = async() => {
        sendMessage("GameController", "receiveToken", accessToken);
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
                    {accessToken}
                </Button>
            </Grid>
            
        </Container>
    </>
  );
};
export default Page;