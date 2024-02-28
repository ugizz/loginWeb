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
    // 다른 페이지로 이동하기 위해 라우터를 설정

    const { trigger: loginUser } = useLoginUser();
    const { trigger: guestLoginUser } = useGuestLoginUser();
    // api 요청에 대한 훅을 선언하는 부분, 트리거가 호출 되면 해당 요청을 수행한다. 각 요청에 대한 내용은 requires 폴더에 있다.

    const [Id, setId] = React.useState("");
    const [Password, setPassword] = React.useState("");

    const [Error, setError] = React.useState("");
    // useState로 객체의 상태를 관리한다. set~~에 값을 넣으면 값이 ~~에 적용 된다.

    const onIdHandler = e => {
        // 아이디에 대한 통제권을 가지는 함수
        setId(e.target.value)
    };

    const onPasswordHandler =e => {
        setPassword(e.target.value)
    };

    const handleLoginClick = async (event)=>{
        // 로그인 버튼을 클릭하면 해당 함수가 호출된다.
        const Data = await loginUser({id:Id,pw:Password});
        // 로그인에 대한 api 요청을 보내는 부분
        
        if(Data.statusCode === 0) {
            // 로그인 요청에 성공하면 statusCode가 0이므로 이 부분이 작동, 유니티로 액세스토큰과 닉네임을 전달한다.
            location.href = "uniwebview://action?accessToken="+Data.data.accessToken+"&nickname="+Data.data.nickname;
            await router.push(`/success?accessToken=${Data.data.accessToken}&nickname=${Data.data.nickname}`);
        }

        if (Data.statusCode !== 0) {
            // 로그인 요청에 실패하면 에러 메세지를 표시해준다.
            setError("존재하지 않는 아이디이거나 비밀번호가 일치하지 않습니다.")
            return
        }
    
    }

    let params ;
    let Gid
    if (typeof window !== "undefined") {
       params = new URLSearchParams(window!.location!.search!);
       Gid = params.get("deviceId");
    }

    const signup = async () => {
        // 일반 회원 가입 버튼을 클릭하면 해당 함수를 호출, deviceId를 쿼리스트링 형태로 회원 가입 창에 넘겨준다.
        await router.push(`/signup?deviceId=${Gid}`);
    }
    const handleGuest = async () => {
        // 게스트 로그인 버튼을 클릭하면 해당 함수를 호출
        const Data = await guestLoginUser({gid:Gid});
        // 게스트 로그인 api 요청을 먼저 시도
        
        if(Data.statusCode === 0) {
            // 요청이 성공하면 바로 로그인 처리와 함께 액세스 토큰과 닉네임을 유니티로 넘겨준다.
            location.href = "uniwebview://action?accessToken="+Data.data.accessToken+"&nickname="+Data.data.nickname;
            await router.push(`/success?accessToken=${Data.data.accessToken}&nickname=${Data.data.nickname}`);
        }
        if(Data.statusCode !== 0) {
            // 게스트 로그인 요청이 실패하면 게스트 회원 가입 창으로 넘어간다.
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
                        // 로그인 요청 실패 시 에러 메세지 표기
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
                    // 버튼을 클릭하면 handleLoginClick 함수를 호출하여 로그인 api 요청을 보낸다.
                >
                    일반 로그인
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={handleGuest}
                    // 버튼을 클릭하면 handleGuest 함수를 호출하여 게스트 로그인 api 요청을 보낸다, 로그인 실패시 게스트 회원 가입 창으로 넘어간다.
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
                    }} // 버튼 클릭 시 signup 함수를 호출하여 일반 회원 가입 페이지로 넘어간다.
                >
                    일반 회원 가입
                </Button>
            </Grid>
        </Container>
    </>
  );
};
export default Page;