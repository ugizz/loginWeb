import * as React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import {Button, Container, Grid, TextField} from "@mui/material";
import {useGuestLoginUser} from "@/quires/useGuestLogin.query";
import {useGuestSignUpUser} from "@/quires/useGuestSignUp.query";
import {useRouter} from "next/router";
import { useParams } from "next/navigation";

const Page: NextPageWithLayout = () => {
    
    const router = useRouter();
    const { trigger: guestLoginUser  } = useGuestLoginUser();
    const { trigger: guestSignUpUser  } = useGuestSignUpUser();
    const [Nick, setNick] = React.useState("");
    const [Password, setPassword] = React.useState("");

    const onNickHandler = e => {
        setNick(e.target.value)
        console.log(e.target.value)
        console.log(Nick);
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
            await router.push(`/login?accessToken=${Data2.data.accessToken}`);
        }
        if(Data.statusCode !== 0) {
            console.log(`다시해봐`)
            return
        }
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
                label="인게임 닉네임" 
                variant="outlined"
                value = {Nick}
                onChange={onNickHandler} />
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
                    variant="outlined"
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