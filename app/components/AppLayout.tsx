import { AppShell, Burger, Group, Text } from "@mantine/core";
import NavBar from "./NavBar";
import styles from "../style/Background.module.css";
import { toolComponents, useToolstargetStore } from "~/store/toolsTarget";
import { useDisclosure } from "@mantine/hooks";
import { FaStar } from "react-icons/fa6";

// const getColor = (pathname: string) => {
//   if (pathname === "/") return "#fadfa18a";
//   if (pathname.includes("nikki")) return "#fcedf2e6";
//   if (pathname.includes("fgo")) return "#d3f3ff";
// };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentComponent } = useToolstargetStore((state) => state);
  const [opened, { toggle, close }] = useDisclosure();

  const getColor = (current: toolComponents) => {
    if (current === toolComponents.home) return "#fadfa18a";
    if (current === toolComponents.nikki) return "#fcedf2e6";
    if (current === toolComponents.fgo) return "#d3f3ff";
  };

  return (
    <AppShell
      header={{ height: { base: 60, xs: 60, sm: 0, md: 0, lg: 0 } }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="lg"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger c={"#818181"} opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <a href="/" style={{ textDecoration: "none" }}>
            <Group>
              <FaStar color={ getColor(currentComponent)}/>
              <Text fw={500} c="#818181" style={{ letterSpacing: -1 }}>
                Little tools
              </Text>
            </Group>
          </a>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          "--dot-color": getColor(currentComponent),
        }}
        className={styles.background}
      >
        {children}
        {/* {pathname.includes("nikki") && <NikkiCalculator />} */}
      </AppShell.Main>
    </AppShell>
  );
}
