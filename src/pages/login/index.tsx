import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Chip, Container, Grid, Stack, TextField} from "@mui/material";
import Divider from '@mui/material/Divider';
import {useLoginUser} from "@/quires/useLogin.query";
import {useRouter} from "next/router";
import { useGuestLoginUser } from "@/quires/useGuestLogin.query";
import { bimage } from "@/components/layout";

const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    const { trigger: loginUser } = useLoginUser();
    const { trigger: guestLoginUser } = useGuestLoginUser();
    const [Id, setId] = React.useState("");
    const [Password, setPassword] = React.useState("");

    const [Error, setError] = React.useState("");

    const onIdHandler = e => {
        setId(e.target.value)
    };

    const onPasswordHandler =e => {
        setPassword(e.target.value)
    };

    const handleLoginClick = async (event)=>{
        const Data = await loginUser({id:Id,pw:Password});
        
        if(Data.statusCode === 0) {
            location.href = "uniwebview://action?accessToken="+Data.data.accessToken+"&nickname="+Data.data.nickname;
            await router.push(`/success?accessToken=${Data.data.accessToken}&nickname=${Data.data.nickname}`);
        }

        if (Data.statusCode !== 0) {
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
        const Data = await guestLoginUser({gid:Gid});
        
        if(Data.statusCode === 0) { // 게스트 로그인 처리
            location.href = "uniwebview://action?accessToken="+Data.data.accessToken+"&nickname="+Data.data.nickname;
            await router.push(`/success?accessToken=${Data.data.accessToken}&nickname=${Data.data.nickname}`);
        }
        if(Data.statusCode !== 0) {
            await router.push(`/guest?deviceId=${Gid}`);
        }
    }
    

    return (
    <>
        <Container maxWidth={"sm"} style={bimage}>
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
                fontSize={40}
            >
                로그인
            </Grid>
            <Divider orientation="horizontal" flexItem sx={{ borderRightWidth: 5 }}>
                <Chip label="내용을 입력해주세요" size="small" />
                </Divider>
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
                    variant={"outlined"}
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