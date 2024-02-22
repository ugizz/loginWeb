import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Container, Grid, TextField, Stack} from "@mui/material";
import {useGuestLoginUser} from "@/quires/useGuestLogin.query";
import {useGuestSignUpUser} from "@/quires/useGuestSignUp.query";
import {useRouter} from "next/router";
import {useCheckNickName} from "@/quires/useCheckNickName.query";
import { useParams } from "next/navigation";

const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    const { trigger: guestLoginUser  } = useGuestLoginUser();
    const { trigger: guestSignUpUser  } = useGuestSignUpUser();
    const { trigger: checkNickName  } = useCheckNickName();
    const [Nick, setNick] = React.useState("");
    const [CheckNick, setCheckNick] = React.useState("");
    const [color2, setcolor2] = React.useState<"error" | "warning" | "success" | "primary" | "secondary" | "info">("primary");

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


    const handleGuest = async () => {
        const Data = await guestSignUpUser({gid:Gid,nick:Nick});
        if(Data.statusCode === 0) {
            const Data2 = await guestLoginUser({gid:Gid});
            location.href = "uniwebview://action?accessToken="+Data2.data.accessToken;
            await router.push(`/success?accessToken=${Data2.data.accessToken}`);
        }
        if(Data.statusCode !== 0) {
            console.log(`다시해봐`)
            return
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