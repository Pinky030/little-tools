import { AppShell } from "@mantine/core";
import NavBar from "./NavBar";
import { useDisclosure } from "@mantine/hooks";
import styles from "../style/Background.module.css";
import { useLocation } from "@remix-run/react";

const getColor = (pathname: string) => {
  if(pathname.includes("nikki")) return "#fcedf2e6"
  if(pathname.includes("fgo")) return "#d3f3ff"
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // const [opened, { toggle }] = useDisclosure();
  const { pathname } = useLocation();

  
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        // collapsed: { mobile: !opened },
      }}
      padding="lg"
    >
      <AppShell.Navbar>
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          "--dot-color": getColor(pathname),
        }}
        className={styles.background}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
