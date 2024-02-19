import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Container, Grid, TextField} from "@mui/material";
import {useLoginUser} from "@/quires/useLogin.query";
import {useRouter} from "next/router";


const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    const { trigger: loginUser, data, error } = useLoginUser();
    const [Id, setId] = React.useState("");
    const [Password, setPassword] = React.useState("");


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
        const Data2 = JSON.stringify(Data)
        console.log(`이 데이터는!!!! `+Data2);
        
        if (Data2.indexOf("Request failed") !== -1) {
            console.log(`Error!`,Data2)
            console.log(Data2.indexOf("Request failed"))
            return
        }
    
        if(Data2) {
        console.log(`이것도!${Data2}`);
        await router.push("/signup");// 여기를 unity 씬으로 연결하면 된다. 연결할때 Data2에 담긴 토큰도 같이 전달해야한다.
        }
    }

    const signup = async () => {
        await router.push("/signup");
    }

    return (
    <>
        <Container maxWidth="sm">
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
                value = {Id}
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
            {/* {Error && (
                        <Grid item xs={12}>
                            <p style={{ color: "red" }}>{`Error`}</p>
                        </Grid>
                    )} */}
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
                    onClick={handleLoginClick}
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