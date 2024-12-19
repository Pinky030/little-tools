import { Stack, Text, Image } from "@mantine/core";
import hachiware from "../../public/hachiware.gif";


const Home = () => {
  return (
    <Stack h={300} align="stretch" justify="center" gap="md">
        <Text size="lg" fw={700} c="orange" ta="center">
          個人用小工具 ʕ•͡ᴥ•ʔ 2
        </Text>
        <Image radius="md" h={200} w="auto" fit="contain" src={hachiware} />
      </Stack> 
  )
}

export default Home