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
    // 다른 페이지로 이동하기 위해 라우터를 설정

    const { trigger: signUpUser  } = useSignUpUser();
    const { trigger: guestLoginUser  } = useGuestLoginUser();
    const { trigger: checkUserName  } = useCheckUserName();
    const { trigger: checkNickName  } = useCheckNickName();
    // api 요청에 대한 훅을 선언하는 부분, 트리거가 호출 되면 해당 요청을 수행한다. 각 요청에 대한 내용은 requires 폴더에 있다.

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
    // useState로 객체의 상태를 관리한다. set~~에 값을 넣으면 값이 ~~에 적용 된다.

    const onIdHandler = e => {
        // 아이디에 대한 통제권을 가짐. 해당 함수가 호출 되면 입력된 아이디를 Id 값에 넣어준다.
        setId(e.target.value)
        setCheckId("") 
        // 중복확인 버튼 클릭시 helper text가 활성화 되는데 입력 값이 변경되면 helper text가 비활성화
        setcolor1("primary") 
        // 중복 확인 버튼 클릭 시 상태에 따라 입력칸의 색이 변하는데 입력 값을 변경하면 id 입력칸의 색 초기화
    };

    const onPasswordHandler =e => {
        const pwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{12,}$/
        // 비밀번호 유효성을 체크하기 위한 정규식 대/소문자, 특수문자, 숫자 각각 하나 이상 포함하는 12자리 이상 문자여야한다.(공백x)
        const currentPasswd = e.target.value
        setPassword(e.target.value)
        if (currentPasswd === "") {
            // helper text 초기화
            setCheckPwd('')
        }else if (!pwRegex.test(currentPasswd)) {
            // 유효성 체크를 통과하지 못할 경우 helper text
            setCheckPwd('숫자, 대문자/소문자, 특수문자 포함 12자리 이상 필수로 입력해주세요!')
        } else {
            // 유효성 체크를 통과했을 경우 helper text
            setCheckPwd('사용 가능한 비밀번호입니다.')
        }
    };

    const onPasswordconHandler =e => {
        // 비밀번호 확인에 대한 입력 반영
        setPasswordcon(e.target.value)
    };

    const onEmailHandler = e => {
        // 이메일 입력에 대한 반영
        setEmail(e.target.value)
    };

    const onNickHandler =e => {
        // 닉네임 입력에 대한 반영
        setNick(e.target.value)
        setCheckNick("")
        setcolor2("primary")
    };

    const validateInputs = (): boolean => {
        // 클라이언트에서 먼저 유효성 체크
        if (!Id.trim() || !Password.trim() || !Email.trim() || !Nick.trim()) {
            setError("모든 값을 입력해주세요.");
            return false;
        }
        if (Password !== Passwordcon) {
            setError("비밀번호가 일치하지 않습니다.")
            return false;
        }
        const pwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?+=])(?!.*\s).{13,}$/
        if (!pwRegex.test(Password)) {
            setError("비밀번호 형식을 확인해주세요.")
            return false
        }
        if (CheckId === "" || CheckNick === "" ) {
            setError("아이디/닉네임 중복 확인 후 다시 시도해주세요.")
            return false;
        }
        // 여기에서 추가적인 유효성 검사를 수행할 수 있다.
        return true;
    };

    const handleSingUpClick = async (event)=>{
        // 회원 가입 버튼을 클릭하면 해당 함수가 호출 된다.
        if (!validateInputs()) {
            // 유효성 체크를 먼저 한 후 충족하지 못하면 반환
            return;
        }

        const Data = await signUpUser({ id:Id, pw: Password, email:Email, nick:Nick });
        // 회원 가입에 대한 api 요청을 보내는 부분, 괄호 안의 내용이 body가 되어 axios 요청을 보낸다.
        
        if (Data.statusCode !== 0) {
            // 회원 가입 버튼 클릭 시 요청이 잘못 되었을 경우 api 서버에서 응답하는 에러메세지 표기
            console.log(Data.response.data.message[0])
            setError(Data.response.data.message[0])
            return
        }
    
        if(Data.statusCode === 0) {
            // 회원 가입 버튼 클릭 시 요청이 성공할 경우 회원 가입 성공 확인 메세지 + 로그인 화면으로 전환
            alert('회원가입에 성공했습니다.')
            await router.push("/login"); 
        }
    }

    const handleCheckUserId = async (event) => {
        // 아이디 중복확인 버튼을 클릭하면 해당 함수가 호출 된다.
        const chkdata = await checkUserName({id:Id})
        // 아이디 중복확인에 대한 api 요청을 보내는 부분.

        if(chkdata.statusCode === 0) {
            if(chkdata.data.check == false) {
                // 중복확인 결과 이미 존재하는 경우 메세지
                setCheckId("이미 존재하는 아이디입니다.")
                setcolor1("warning")
            }
            if(chkdata.data.check == true) {
                // 중복확인 결과 존재 하지않을 경우 메세지
                setCheckId("사용 가능한 아이디입니다.")
                setcolor1("success")
            }
        }
        if(chkdata.statusCode !== 0){
            // api 요청이 잘못 되었을 경우, 즉 형식을 지키지 않을 경우 메세지
            setCheckId("올바른 형식을 입력해주세요.")
            setcolor1("warning")
        }

    }

    const handleCheckNickName = async (event) => {
        // 닉네임 중복확인 버튼을 클릭하면 해당 함수가 호출된다.
        const chkdata = await checkNickName({nick:Nick})
        // 닉네임 중복확인에 대한 api 요청을 보내는 부분

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
        // url로부터 deviceId를 파싱하는 부분
        params = new URLSearchParams(window!.location!.search!);
        Gid = params.get("deviceId");
    }

    const handleGuest = async () => {
        // 게스트 로그인 버튼을 클릭하면 해당 함수가 호출된다.
        const Data = await guestLoginUser({gid:Gid});
        // 게스트 로그인 api 요청을 보내는 부분
        
        if(Data.statusCode === 0) { 
            // 게스트 로그인 api 요청했을 때 성공했을 경우, 즉 이미 deviceId가 데이터 베이스에 있다면 바로 엑세스토큰과 닉네임과 함께 유니티로 정보를 전달한다.
            location.href = "uniwebview://action?accessToken="+Data.data.accessToken+"&nickname="+Data.data.nickname;
            // 유니티로 데이터(액세스 토큰 + 닉네임)를 보내는 부분

            await router.push(`/success?accessToken=${Data.data.accessToken}&nickname=${Data.data.nickname}`);
        }
        if(Data.statusCode !== 0) {
            // 게스트 로그인 api 요청이 실패했을 경우, 즉 신규로 게스트로그인을 하는 경우 게스트 회원 가입창으로 넘어간다, 이때 디바이스 아이디를 url에 포함하여 전달한다.
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
                // Id 값은 onChange에 의해 동적으로 변하고 이 값을 value 값으로 하여 표기되는 값도 같이 변화시켜준다.
                focused={Id.length>0 ? true:false}
                // 입력란의 컬러는 해당 칸이 활성화 되었을 때 적용되므로 해당란에 입력 값이 있으면 활성화 상태로 처리해 주었다.
                onChange={onIdHandler}
                // textfield에 변화가 발생했을 때 onIdHandler 함수를 호출한다.
                />
                <Button
                    variant={"outlined"}
                    onClick={handleCheckUserId}
                    // 중복확인 버튼 클릭 시 handleCheckUserId 함수를 호출한다.
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
                // 비밀번호와 비밀번호 확인이 다를 경우 비밀번호 확인 입력란을 에러로 표기해줌(붉은색 박스)
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
                        // 유효성 체크를 통과하지 못할 경우 에러메세지 적용
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
                    // 게스트 로그인 버튼 클릭시 handleGuest 함수 호출
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