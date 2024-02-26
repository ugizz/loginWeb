import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Chip, Container, Grid, Stack, TextField} from "@mui/material";
import {useSignUpUser} from "@/quires/useSignUp.query";
import {useCheckUserName} from "@/quires/useCheckUserName.query";
import {useCheckNickName} from "@/quires/useCheckNickName.query";
import { useGuestLoginUser } from "@/quires/useGuestLogin.query";
import {useRouter} from "next/router";
import Divider from '@mui/material/Divider';
import { bimage } from "@/components/layout";


const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    const { trigger: signUpUser  } = useSignUpUser();
    const { trigger: guestLoginUser  } = useGuestLoginUser();
    const { trigger: checkUserName  } = useCheckUserName();
    const { trigger: checkNickName  } = useCheckNickName();
    const [Id, setId] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [Passwordcon, setPasswordcon] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [Nick, setNick] = React.useState("");
    const [CheckId, setCheckId] = React.useState("");
    const [CheckPwd, setCheckPwd] = React.useState("");
    const [CheckNick, setCheckNick] = React.useState("");
    const [color1, setcolor1] = React.useState<"error" | "warning" | "success" | "primary" | "secondary" | "info">("primary");
    const [color2, setcolor2] = React.useState<"error" | "warning" | "success" | "primary" | "secondary" | "info">("primary");

    const [Error, setError] = React.useState("");

    const onIdHandler = e => {
        setId(e.target.value)
        setCheckId("")
        setcolor1("primary")
    };

    const onPasswordHandler =e => {
        const pwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{13,}$/
        const currentPasswd = e.target.value
        setPassword(e.target.value)
        if (currentPasswd === "") {
            setCheckPwd('')
        }else if (!pwRegex.test(currentPasswd)) {
            setCheckPwd('숫자, 대문자/소문자, 특수문자, 13자리 이상 필수로 입력해주세요!')
        } else {
            setCheckPwd('사용 가능한 비밀번호입니다.')
        }
    };

    const onPasswordconHandler =e => {
        setPasswordcon(e.target.value)
    };

    const onEmailHandler = e => {
        setEmail(e.target.value)
    };

    const onNickHandler =e => {
        setNick(e.target.value)
        setCheckNick("")
        setcolor2("primary")
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
        if (CheckId === "" || CheckNick === "" ) {
            setError("아이디/닉네임 중복 확인 후 다시 시도해주세요.")
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
        
        if (Data.statusCode !== 0) {
            setError("이미 존재하는 아이디/닉네임이거나 형식이 올바르지 않습니다.")
            return
        }
    
        if(Data.statusCode === 0) {
        alert('회원가입에 성공했습니다.')
        await router.push("/login"); 
        }
    }

    const handleCheckUserId = async (event) => {
        const chkdata = await checkUserName({id:Id})
        if(chkdata.statusCode === 0) {
            if(chkdata.data.check == false) {
                setCheckId("이미 존재하는 아이디입니다.")
                setcolor1("warning")
            }
            if(chkdata.data.check == true) {
                setCheckId("사용 가능한 아이디입니다.")
                setcolor1("success")
            }
        }
        if(chkdata.statusCode !== 0){
            setCheckId("올바른 형식을 입력해주세요.")
            setcolor1("warning")
        }

    }

    const handleCheckNickName = async (event) => {
        const chkdata = await checkNickName({nick:Nick})
        if(chkdata.statusCode === 0) {
            if(chkdata.data.check == false) {
                setCheckNick("이미 존재하는 닉네임입니다.")
                setcolor2("warning")
            }
            if(chkdata.data.check == true) {
                setCheckNick("사용 가능한 닉네임입니다.")
                setcolor2("success")
            }
        }
        if(chkdata.statusCode !== 0){
            setCheckNick("올바른 형식을 입력해주세요.")
            setcolor2("warning")
        }

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
            location.href = "uniwebview://action?accessToken="+Data.data.accessToken;
            await router.push(`/success?accessToken=${Data.data.accessToken}`);
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
                회원 가입
            </Grid>
            <Divider orientation="horizontal" flexItem sx={{ borderRightWidth: 5 }}>
                <Chip label="내용을 입력해주세요" size="small"  />
            </Divider>
            <Grid>
                <Stack spacing={2} direction={"column"}>
            <Stack spacing={2} direction={"row"} alignItems={"center"}>
                <TextField id={"outlined-basic" }
                label={"아이디" }
                variant={"outlined"}
                color={color1}
                helperText= {CheckId}
                value = {Id}
                focused={Id.length>0 ? true:false}
                onChange={onIdHandler} 
                />
                <Button
                    variant={"outlined"}
                    onClick={handleCheckUserId}
                >
                    중복 확인
                </Button>
            </Stack>
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                alignItems={"center"}
            >
                <TextField id={"outlined-basic"} 
                label={"비밀번호"} 
                variant={"outlined"}
                type={"password"}
                autoComplete={"current-password"}
                value = {Password}
                onChange={onPasswordHandler}
                helperText={CheckPwd}
                />
            </Grid>
            <Grid
                mt={2}
                mb={2}
                container
                item
                xs={12}
                
                alignItems={"center"}
            >
                <TextField id={"outlined-basic"} 
                error = {Password!==Passwordcon}
                label={"비밀번호 확인"}
                variant={"outlined"}
                type={"password"}
                autoComplete={"current-password"} 
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
                alignItems={"center"}
            >
                <TextField id={"outlined-basic"} 
                label={"이메일"} 
                variant={"outlined"}
                value = {Email}
                onChange={onEmailHandler}
                />
            </Grid>
            <Stack spacing={2} direction={"row"} alignItems={"center"}>
                <TextField id={"outlined-basic"}
                label={"인게임 닉네임" }
                variant={"outlined"}
                helperText= {CheckNick}
                color={color2}
                value = {Nick}
                onChange={onNickHandler}
                focused = {Nick.length>0 ? true:false}
                />
                <Button
                    variant={"outlined"}
                    onClick={handleCheckNickName}
                >
                    중복 확인
                </Button>
            </Stack>
            </Stack>
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
                alignItems={"center"}
            >
            <Stack spacing={2} direction={"row"} alignItems={"center"}>
                <Button
                    variant={"outlined"}
                    onClick={handleSingUpClick}
                    
                >
                    가입하기
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
                alignItems={"center"}
            >
                
            </Grid>
       
        </Container>
    </>
  );
};
export default Page;