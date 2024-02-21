import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Container, Grid, TextField} from "@mui/material";
import {useGuestLoginUser} from "@/quires/useGuestLogin.query";
import {useRouter} from "next/router";
import { useParams } from "next/navigation";

const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    const { trigger: guestLoginUser  } = useGuestLoginUser();
    const [GId, setGId] = React.useState("");
    const [Password, setPassword] = React.useState("");

    const { dataFromOtherPage } = useParams();

    const onIdHandler = e => {
        setGId(e.target.value)
        console.log(e.target.value)
        console.log(GId);
    };

    const onPasswordHandler =e => {
        setPassword(e.target.value)
        console.log(e.target.value)
    };

    const join = async () => {
        await router.push("/signup");
    }
    
    const signup = async () => {
        await router.push("/signup");
    }

    return (
    <>
        <Container maxWidth="sm">
            <p>Data from other page: {dataFromOtherPage}</p>
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
            >
                <TextField id="outlined-basic" 
                label="아이디" 
                variant="outlined"
                value = {GId}
                onChange={onIdHandler} />
            </Grid>
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
            >
                <TextField id="outlined-basic" 
                label="비밀번호" 
                variant="outlined"
                type="password"
                autoComplete="current-password"
                value = {Password}
                onChange={onPasswordHandler}
                />
            </Grid>
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    variant="text"
                    onClick={async (event)=>{
                        //loginUser({id:GId,pw:Password})
                        await join();
                    }}
                >
                    로그인
                </Button>
            </Grid>
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                justifyContent="right"
                alignItems="center"
            >
                <Button
                    variant="text"
                    onClick={async (event)=>{
                        await signup();
                    }}
                >
                    가입하기
                </Button>
            </Grid>
        </Container>
    </>
  );
};
export default Page;