import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Container, Grid, Stack, TextField} from "@mui/material";
import {useLoginUser} from "@/quires/useLogin.query";
import {useRouter} from "next/router";
import { useGuestLoginUser } from "@/quires/useGuestLogin.query";
import { useParams } from 'react-router-dom';
import { Unity, useUnityContext } from "react-unity-webgl";



const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    const { trigger: loginUser } = useLoginUser();
    const { trigger: guestLoginUser } = useGuestLoginUser();
    const [Id, setId] = React.useState("");
    const [Password, setPassword] = React.useState("");
    // const unityContext = useUnityContext();

    const [Error, setError] = React.useState("");

    const onIdHandler = e => {
        setId(e.target.value)
        console.log(e.target.value)
        console.log(`id:`,Id);
    };

    const onPasswordHandler =e => {
        setPassword(e.target.value)
        console.log(e.target.value)
    };

    const handleLoginClick = async (event)=>{
        const Data = await loginUser({id:Id,pw:Password});
        
        if(Data.statusCode === 0) {
            console.log(`이것도!${Data.data.accessToken}`);
            await router.push(`/login?accessToken=${Data.data.accessToken}`);// 여기를 unity 씬으로 연결하면 된다. 연결할때 Data2에 담긴 토큰도 같이 전달해야한다.
        }

        if (Data.statusCode !== 0) {
            console.log(`Error!`,Data.message)
            setError("존재하지 않는 아이디이거나 비밀번호가 일치하지 않습니다.")
            return
        }
    
    }

    const signup = async () => {
        await router.push("/signup");
    }
    let params ;
    let Gid
    if (typeof window !== "undefined") {
       params = new URLSearchParams(window!.location!.search!);
       Gid = params.get("deviceId");
    }

    const handleGuest = async () => {
        console.log("디바이스 아이디:", Gid);
        const Data = await guestLoginUser({gid:Gid});
        
        if(Data.statusCode === 0) { // 게스트 로그인 처리
            console.log("됐냐?")
            await router.push(`/login?accessToken=${Data.data.accessToken}`);
        }
        if(Data.statusCode !== 0) {
            console.log("안됐냐?")
            await router.push(`/guest?deviceId=${Gid}`);
        }
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
                <TextField id={"outlined-basic"} 
                label={"아이디"} 
                variant={"outlined"}
                value = {Id}
                onChange={onIdHandler} />
            </Grid>
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <TextField id={"outlined-basic"} 
                label={"비밀번호"} 
                variant={"outlined"}
                type={"password"}
                autoComplete={"current-password"}
                value = {Password}
                onChange={onPasswordHandler}
                />
            </Grid>
            {Error && (
                        <Grid item xs={12}>
                            <p style={{ color: "red" }}>{Error}</p>
                        </Grid>
                    )}
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
            >
            <Stack spacing={2} direction={"row"} alignItems={"center"}>
                <Button
                    variant="outlined"
                    onClick={handleLoginClick}
                >
                    일반 로그인
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={handleGuest}
                >
                    게스트 로그인
                </Button>
            </Stack>
            </Grid>
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                justifyContent={"right"}
                alignItems={"center"}
            >
                <Button
                    variant={"outlined"}
                    onClick={async (event)=>{
                        await signup();
                    }}
                >
                    일반 회원 가입
                </Button>
            </Grid>
        </Container>
    </>
  );
};
export default Page;