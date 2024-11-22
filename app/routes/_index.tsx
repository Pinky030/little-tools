import { Image, Stack, Text } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import hachiware from "../../public/hachiware.gif";

export const meta: MetaFunction = () => {
  return [
    { title: "Tools" },
    // { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <Stack h={300} align="stretch" justify="center" gap="md">
        <Text size="lg" fw={700} c="orange" ta="center">
          個人用小工具 ʕ•͡ᴥ•ʔ
        </Text>
        <Image radius="md" h={200} w="auto" fit="contain" src={hachiware} />
      </Stack>
    </main>
  );
}
