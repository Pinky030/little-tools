import { Image, Stack, Text } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import hachiware from "../../public/hachiware.gif";
import { toolComponents, useToolstargetStore } from "~/store/toolsTarget";
import NikkiCalculator from "~/components/NikkiCalculator";
import SaintQuartzCalculator from "~/components/SaintQuartzCalculator";
import Home from "~/components/Home";

export const meta: MetaFunction = () => {
  return [
    { title: "Tools" },
    // { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { currentComponent } = useToolstargetStore((state) => state);

  return (
    <main>
     {(currentComponent === toolComponents.home) && <Home />}
      {(currentComponent === toolComponents.nikki) && <NikkiCalculator />}
      {(currentComponent === toolComponents.fgo) && <SaintQuartzCalculator />}

    </main>
  );
}
