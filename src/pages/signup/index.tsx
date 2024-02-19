import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Container, Grid, TextField} from "@mui/material";
import {useSignUpUser} from "@/quires/useSignUp.query";
import { useGuestLoginUser } from "@/quires/useGuestLogin.query";
import {useRouter} from "next/router";


const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    const { trigger: signUpUser  } = useSignUpUser();
    const [Id, setId] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [Passwordcon, setPasswordcon] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [Nick, setNick] = React.useState("");

    const [Error, setError] = React.useState("");

    const onIdHandler = e => {
        setId(e.target.value)
    };

    const onPasswordHandler =e => {
        setPassword(e.target.value)
    };

    const onPasswordconHandler =e => {
        setPasswordcon(e.target.value)
    };

    const onEmailHandler = e => {
            setEmail(e.target.value)
        };

    const onNickHandler =e => {
        setNick(e.target.value)
    };

    const validateInputs = (): boolean => {
        if (!Id.trim() || !Password.trim() || !Email.trim() || !Nick.trim()) {
            setError("모든 값을 입력해주세요.");
            return false;
        }
        if (Password !== Passwordcon) {
            setError("비밀번호가 일치하지 않습니다.")
            return false;
        }
        // 여기에서 추가적인 유효성 검사를 수행할 수 있습니다.
        return true;
    };

    const handleSingUpClick = async (event)=>{
        if (!validateInputs()) {
            return;
        }

        const Data = await signUpUser({ id:Id, pw: Password, email:Email, nick:Nick });
        const Data2 = JSON.stringify(Data)
        console.log(`이 데이터는!!!! `+Data2);
        
        if (Data2.indexOf("Request failed") !== -1) {
            console.log(`Error!`,Data2)
            console.log(Data2.indexOf("Request failed"))
            setError("이미 존재하는 아이디이거나 형식이 올바르지 않습니다.")
            return
        }
    
        if(Data2) {
        console.log(`이것도!${Data2}`);
        console.log(Data2.indexOf("Request failed"))
        await router.push("/login"); 
        }
    }

    const join = async () => {
        if (!validateInputs()) {
            return;
        }
        await signUpUser({ id:Id, pw: Password, email:Email, nick:Nick });
        await router.push("/login");
    }

    const guestjoin = async () => {
        // 게스트 로그인 시 디바이스 아이디를 받아오는 로직
        const deviceId = navigator.userAgent;
        console.log("디바이스 아이디:", deviceId);

        // 게스트 로그인 처리
        await router.push("/guest");
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
                onChange={onIdHandler} 
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
                <TextField id="outlined-basic" 
                error = {Password!==Passwordcon}
                label="비밀번호 확인" 
                variant="outlined"
                type="password"
                autoComplete="current-password" 
                value = {Passwordcon}
                onChange={onPasswordconHandler} 
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
                <TextField id="outlined-basic" 
                label="이메일" 
                variant="outlined"
                value = {Email}
                onChange={onEmailHandler}
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
                <TextField id="outlined-basic" 
                label="인게임 닉네임" 
                variant="outlined"
                value = {Nick}
                onChange={onNickHandler}
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
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    variant="text"
                    onClick={handleSingUpClick}
                >
                    가입하기
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
                        await guestjoin();
                    }}
                >
                    게스트 로그인
                </Button>
            </Grid>
        </Container>
    </>
  );
};
export default Page;