import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Container, Grid, TextField, Stack, Chip, Divider} from "@mui/material";
import {useGuestLoginUser} from "@/quires/useGuestLogin.query";
import {useGuestSignUpUser} from "@/quires/useGuestSignUp.query";
import {useCheckNickName} from "@/quires/useCheckNickName.query";
import {useRouter} from "next/router";
import { bimage } from "@/components/layout";


const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    // 다른 페이지로 이동하기 위해 라우터를 설정

    const { trigger: guestLoginUser  } = useGuestLoginUser();
    const { trigger: guestSignUpUser  } = useGuestSignUpUser();
    const { trigger: checkNickName  } = useCheckNickName();
    // api 요청에 대한 훅을 선언하는 부분, 트리거가 호출 되면 해당 요청을 수행한다. 각 요청에 대한 내용은 requires 폴더에 있다.

    const [Nick, setNick] = React.useState("");
    const [CheckNick, setCheckNick] = React.useState("");
    const [color2, setcolor2] = React.useState<"error" | "warning" | "success" | "primary" | "secondary" | "info">("primary");

    const [Error, setError] = React.useState("");
    // useState로 객체의 상태를 관리한다. set~~에 값을 넣으면 값이 ~~에 적용 된다.

    const onNickHandler = e => {
        setNick(e.target.value)
        setCheckNick("")
        setcolor2("primary")
    };

    let params ;
    let Gid 
    if (typeof window !== "undefined") {
       params = new URLSearchParams(window!.location!.search!);
       Gid = params.get("deviceId");
      }


      const validateInputs = (): boolean => {
        if (!Nick.trim()) {
            setError("값을 입력해주세요.");
            return false;
        }
        
        if (CheckNick === "" ) {
            setError("닉네임 중복 확인 후 다시 시도해주세요.")
            return false;
        }
        // 여기에서 추가적인 유효성 검사를 수행할 수 있다.
        return true;
    };
    const handleGuest = async () => {
        // 게스트 로그인 버튼을 클릭하면 해당 함수가 호출된다.
        if (!validateInputs()){
            return
        }
        const Data = await guestSignUpUser({gid:Gid,nick:Nick});
        // 게스트 회원 가입 api 요청을 보내는 부분


        if(Data.statusCode === 0) {
            const Data2 = await guestLoginUser({gid:Gid});
            // 게스트 회원 가입 성공 시 바로 게스트 로그인 api 요청을 보낸다.

            location.href = "uniwebview://action?accessToken="+Data2.data.accessToken+"&nickname="+Data2.data.nickname;
            // 요청이 성공하면 액세스 토큰과 닉네임을 유니티에 넘겨준다.
            await router.push(`/success?accessToken=${Data2.data.accessToken}&nickname=${Data2.data.nickname}`);
        }
        if(Data.statusCode !== 0) {
            return
        }
    }

    const handleCheckNickName = async (event) => {
        // 닉네임 중복 확인 버튼을 클릭하면 해당 함수가 호출
        const chkdata = await checkNickName({nick:Nick})
        // 닉네임 중복확인 api 요청을 보내는 부분

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
            setError("입력한 닉네임 형식이 올바르지 않습니다.")
            setcolor2("warning")
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
                fontSize={35}
            >
                게스트 회원 가입
            </Grid>
            <Divider orientation="horizontal" flexItem sx={{ borderRightWidth: 5 }}>
                <Chip label="내용을 입력해주세요" size="small"  />
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
                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                    <TextField id={"outlined-basic"} 
                        label={"인게임 닉네임"} 
                        variant={"outlined"}
                        value = {Nick}
                        color={color2}
                        helperText= {CheckNick}
                        onChange={onNickHandler}
                        focused = {Nick.length>0?true:false}
                    />
                    <Button
                        variant={"outlined"}
                        onClick={handleCheckNickName}
                    >
                        중복 확인
                    </Button>
                </Stack>
                {Error && (
                        <Grid item xs={12}>
                            <p style={{ color: "red" }}>{Error}</p>
                        </Grid>
                    )}
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
                <Button
                    variant={"outlined"}
                    onClick={handleGuest}
                >
                    게스트 로그인
                </Button>
            </Grid>
        </Container>
    </>
  );
};
export default Page;