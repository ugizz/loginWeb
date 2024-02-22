import background_Img from "../../public/assets/background_Img.png"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body> {children}</body>
    </html>
  )
}

export const bimage = {
  backgroundImage: `url(assets/background_Img3.png)`, // 배경 이미지로 설정
  // backgroundSize: 'cover', // 배경 이미지를 화면에 맞게 늘리거나 축소
  backgroundPosition: 'center', // 배경 이미지의 위치를 가운데로 설정
  minHeight: '45vh', // body의 최소 높이를 화면의 높이로 설정
  minWidth: '50vh',
  // padding: '0', // body의 padding을 0으로 설정
  // margin: '0', // body의 margin을 0으로 설정
  fontFamily: 'Arial, sans-serif', // 기본 글꼴 설정
};
