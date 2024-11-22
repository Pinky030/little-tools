import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, useLocation, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Box, NavLink, AppShell, MantineProvider, Title, SimpleGrid, Switch, Group, Button, Divider, Blockquote, Grid, Text, NumberInput, Select, Stack, Image } from "@mantine/core";
import { GiCutDiamond } from "react-icons/gi";
import { SiCrystal } from "react-icons/si";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function NavBar() {
  return /* @__PURE__ */ jsxs(
    Box,
    {
      p: "md",
      children: [
        /* @__PURE__ */ jsx(
          NavLink,
          {
            mb: "md",
            style: { borderRadius: "0.25rem" },
            p: "md",
            href: "/nikki-calculator",
            active: true,
            label: "暖暖",
            leftSection: /* @__PURE__ */ jsx(GiCutDiamond, { size: "1rem" }),
            color: "pink"
          }
        ),
        /* @__PURE__ */ jsx(
          NavLink,
          {
            style: { borderRadius: "0.25rem" },
            p: "md",
            href: "/fgo-saint-quartz-calculator",
            active: true,
            label: "聖晶石",
            leftSection: /* @__PURE__ */ jsx(SiCrystal, { size: "1rem" })
          }
        )
      ]
    }
  );
}
const background = "_background_1hs9q_1";
const styles = {
  background
};
const getColor = (pathname) => {
  if (pathname === "/") return "#fadfa18a";
  if (pathname.includes("nikki")) return "#fcedf2e6";
  if (pathname.includes("fgo")) return "#d3f3ff";
};
function AppLayout({ children }) {
  const { pathname } = useLocation();
  return /* @__PURE__ */ jsxs(
    AppShell,
    {
      navbar: {
        width: 300,
        breakpoint: "sm"
        // collapsed: { mobile: !opened },
      },
      padding: "lg",
      children: [
        /* @__PURE__ */ jsx(AppShell.Navbar, { children: /* @__PURE__ */ jsx(NavBar, {}) }),
        /* @__PURE__ */ jsx(
          AppShell.Main,
          {
            style: {
              "--dot-color": getColor(pathname)
            },
            className: styles.background,
            children
          }
        )
      ]
    }
  );
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(MantineProvider, { children }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const MISSION_REWARD = 21;
const SIGNIN_REWARD = 30;
const saintQuartzCalculator = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [result, setResult] = useState({
    quartz: -1,
    fragment: -1,
    ticket: -1
  });
  const [dailyCheckIn, setDailyCheckIn] = useState(false);
  const [weeklyMission, setWeeklyMission] = useState(false);
  const [accumulate, setAccumulate] = useState(false);
  const weeklyFormula = (weeks, point) => weeks * point;
  const accumulateDays = (dates) => BigInt(dates) / BigInt(50) * BigInt(SIGNIN_REWARD);
  const calculateSignInPoints = (dates) => {
    let points = 0;
    if (startDate !== null) {
      for (let i = 0; i < dates; i++) {
        const currentDay = (startDate.getDay() + i) % 7 + 1;
        if (currentDay === 2 || currentDay === 4) {
          points += 1;
        } else if (currentDay === 6) {
          points += 2;
        }
      }
    }
    return points;
  };
  const getResult = () => {
    const totalDates = dayjs(endDate).diff(dayjs(startDate), "day");
    const totalWeek = dayjs(endDate).diff(dayjs(startDate), "week");
    const signInAmout = dailyCheckIn ? calculateSignInPoints(totalDates) : 0;
    const accumulateAmount = accumulate ? Number(accumulateDays(totalDates)) : 0;
    const missionAmount = weeklyMission ? weeklyFormula(totalWeek, MISSION_REWARD) : 0;
    setResult({
      quartz: signInAmout + accumulateAmount,
      fragment: missionAmount,
      ticket: totalWeek
    });
  };
  return /* @__PURE__ */ jsxs("form", { children: [
    /* @__PURE__ */ jsx(
      Title,
      {
        c: "blue",
        order: 2,
        size: "h1",
        style: { fontFamily: "Greycliff CF, var(--mantine-font-family)" },
        fw: 900,
        ta: "left",
        children: "聖晶石計算器"
      }
    ),
    /* @__PURE__ */ jsxs(SimpleGrid, { cols: { base: 1, sm: 2 }, mt: "xl", children: [
      /* @__PURE__ */ jsx(
        DateInput,
        {
          valueFormat: "YYYY/MM/DD",
          withAsterisk: true,
          value: startDate,
          onChange: setStartDate,
          label: "開始日期",
          variant: "filled"
        }
      ),
      /* @__PURE__ */ jsx(
        DateInput,
        {
          valueFormat: "YYYY/MM/DD",
          withAsterisk: true,
          value: endDate,
          onChange: setEndDate,
          label: "完結日期",
          variant: "filled"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Switch,
      {
        checked: dailyCheckIn,
        onChange: (event) => setDailyCheckIn(event.currentTarget.checked),
        mt: "md",
        label: "每日簽到"
      }
    ),
    /* @__PURE__ */ jsx(
      Switch,
      {
        checked: weeklyMission,
        onChange: (event) => setWeeklyMission(event.currentTarget.checked),
        mt: "md",
        label: "每週任務"
      }
    ),
    /* @__PURE__ */ jsx(
      Switch,
      {
        checked: accumulate,
        onChange: (event) => setAccumulate(event.currentTarget.checked),
        mt: "md",
        label: "累積登入 (默認: 30聖晶石)"
      }
    ),
    /* @__PURE__ */ jsx(Group, { justify: "center", mt: "xl", children: /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => {
          getResult();
        },
        variant: "light",
        radius: "md",
        children: "確定"
      }
    ) }),
    (result.quartz > -1 || result.fragment > -1 || result.ticket > -1) && /* @__PURE__ */ jsxs(Fragment, { children: [
      "   ",
      /* @__PURE__ */ jsx(Divider, { my: "md" }),
      /* @__PURE__ */ jsx(
        Blockquote,
        {
          color: "blue",
          icon: /* @__PURE__ */ jsx(SiCrystal, {}),
          mt: "xl",
          children: /* @__PURE__ */ jsxs(Grid, { gutter: 0, children: [
            /* @__PURE__ */ jsx(Grid.Col, { span: 2, children: /* @__PURE__ */ jsx(Text, { c: "dimmed", children: "日期:" }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: 10, children: /* @__PURE__ */ jsxs(Text, { c: "blue", fw: 500, children: [
              dayjs(startDate).format("YYYY/MM/DD"),
              " -",
              " ",
              dayjs(endDate).format("YYYY/MM/DD")
            ] }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: 2, children: /* @__PURE__ */ jsx(Text, { c: "dimmed", children: "預期聖晶石收益:" }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: 10, children: /* @__PURE__ */ jsx(Text, { c: "blue", fw: 500, children: result.quartz }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: 2, children: /* @__PURE__ */ jsx(Text, { c: "dimmed", children: "預期聖晶片收益:" }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: 10, children: /* @__PURE__ */ jsxs(Text, { c: "blue", fw: 500, children: [
              result.fragment,
              " = ",
              result.fragment / 7,
              "聖晶石"
            ] }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: 2, children: /* @__PURE__ */ jsx(Text, { c: "dimmed", children: "預期呼符收益:" }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: 10, children: /* @__PURE__ */ jsx(Text, { c: "blue", fw: 500, children: result.ticket }) })
          ] })
        }
      )
    ] })
  ] });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: saintQuartzCalculator
}, Symbol.toStringTag, { value: "Module" }));
const DAILY_MISSION = 50;
const DAILY_SHARE = 10;
const WEEKLY_NAIL = 10;
const MEMBER_POINT = {
  無: 0,
  小月卡: 56,
  大月卡: 106,
  "大＋小月卡": 162
};
const CONSORTIUM_MISSION = {
  冠軍: 300,
  亞軍: 280,
  季軍: 260,
  "4 - 10名": 230,
  "11 - 20名": 220,
  "21 - 30名": 210,
  "31 - 50名": 200,
  "51 - 70名": 180,
  "71 - 100名": 150,
  "101 - 200名": 130,
  "前5%": 100,
  "前5% - 10%": 80,
  "前10% - 20%": 60,
  "前20% - 30%": 50,
  "前30% - 50%": 40,
  其他名次: 30
};
const ARENA_POINT = {
  冠軍: 500,
  亞軍: 480,
  季軍: 450,
  "4-50名": 400,
  "51-100名": 350,
  "永恆的傳奇前2%": 320,
  "永恆的傳奇前5%": 300,
  "永恆的傳奇前10%": 280,
  "永恆的傳奇前20%": 260,
  "永恆的傳奇前30%": 240,
  "永恆的傳奇前50%": 220,
  "永恆的傳奇前100%": 200,
  顛覆未來之王3星: 180,
  顛覆未來之王2星: 170,
  顛覆未來之王1星: 160,
  靈感重構大師3星: 150,
  靈感重構大師2星: 140,
  靈感重構大師1星: 130,
  記憶創造者3星: 120,
  記憶創造者2星: 110,
  記憶創造者1星: 100,
  自由搭配師3星: 90,
  自由搭配師2星: 80,
  自由搭配師1星: 70,
  初心學徒: 50
};
const STAGE_POINT = {
  "第1名": 500,
  "2 - 5名": 450,
  "6 - 20名": 400,
  "21 - 100名": 350,
  "101 - 500 / 前1%": 300,
  "501 - 2000 / 前4%": 260,
  "2001 - 5000 / 前8%": 220,
  "5001 - 10000 / 前15%": 180,
  "10001 - 20000 / 前30%": 140,
  "20001 - 30000 / 前65%": 100,
  "30001 - 50000 / 前80%": 90,
  "前85%": 80,
  "前90%": 70,
  "前100%": 50
};
const nikkiCalculator = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [result, setResult] = useState(0);
  const [gift, setGift] = useState(0);
  const [member, setMember] = useState(0);
  const [arena, setArena] = useState(0);
  const [stage, setStage] = useState(0);
  const [consortium, setConsortium] = useState(0);
  const [weeklyNail, setWeeklyNail] = useState(false);
  const [dailyShare, setDailyShare] = useState(false);
  const [dailyMission, setDailyMission] = useState(false);
  const [dailSignIn, setDailSignIn] = useState(false);
  const dailyFormula = (days, point) => days * point;
  const weeklyFormula = (weeks, point) => weeks * point;
  const calculateSignInPoints = (dates, isMember) => {
    const fullCycles = Math.floor(dates / 8);
    const remainingDays = dates % 8;
    let pointsFromFullCycles = fullCycles * 50;
    let pointsFromRemainingDays = 0;
    if (remainingDays >= 4 && remainingDays < 8) {
      pointsFromRemainingDays = 20;
    } else if (remainingDays === 8) {
      pointsFromRemainingDays = 50;
    }
    let totalPoints = pointsFromFullCycles + pointsFromRemainingDays;
    if (isMember) {
      totalPoints *= 2;
    }
    return totalPoints;
  };
  const getResult = () => {
    if (startDate === null || endDate === null) return alert("輸入日期");
    let result2 = 0;
    const totalDate = dayjs(endDate).diff(dayjs(startDate), "day");
    const missionAmount = dailyMission ? dailyFormula(totalDate, DAILY_MISSION) : 0;
    const memeberAmount = dailyFormula(totalDate, member);
    const shareAmount = dailyShare ? dailyFormula(totalDate, DAILY_SHARE) : 0;
    const giftAmount = dailyFormula(totalDate, gift);
    const checkInPointAmount = calculateSignInPoints(
      totalDate,
      member === 0 ? false : true
    );
    if (totalDate < 7) {
      result2 = missionAmount + memeberAmount + shareAmount + giftAmount + checkInPointAmount;
    } else {
      const totalWeek = dayjs(endDate).diff(dayjs(startDate), "week");
      const arenaAmount = weeklyFormula(totalWeek, arena);
      const weeklyNailAmount = weeklyNail ? weeklyFormula(totalWeek, WEEKLY_NAIL) : 0;
      const stageAmount = weeklyFormula(totalWeek, stage);
      const consortiumAmount = weeklyFormula(totalWeek, consortium);
      result2 = missionAmount + memeberAmount + shareAmount + giftAmount + arenaAmount + weeklyNailAmount + stageAmount + consortiumAmount + checkInPointAmount;
    }
    setResult(result2);
  };
  return /* @__PURE__ */ jsxs("form", { children: [
    /* @__PURE__ */ jsx(
      Title,
      {
        c: "pink",
        order: 2,
        size: "h1",
        style: { fontFamily: "Greycliff CF, var(--mantine-font-family)" },
        fw: 900,
        ta: "left",
        children: "鑽石計算器"
      }
    ),
    /* @__PURE__ */ jsxs(SimpleGrid, { cols: { base: 1, sm: 2 }, mt: "xl", children: [
      /* @__PURE__ */ jsx(
        DateInput,
        {
          valueFormat: "YYYY/MM/DD",
          withAsterisk: true,
          value: startDate,
          onChange: setStartDate,
          label: "開始日期",
          variant: "filled"
        }
      ),
      /* @__PURE__ */ jsx(
        DateInput,
        {
          valueFormat: "YYYY/MM/DD",
          withAsterisk: true,
          value: endDate,
          onChange: setEndDate,
          label: "完結日期",
          variant: "filled"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      NumberInput,
      {
        value: gift,
        onChange: (v) => {
          if (typeof v === "number") setGift(v);
        },
        label: "聯盟禮包",
        mt: "md",
        name: "subject",
        variant: "filled"
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        onOptionSubmit: (v) => {
          setConsortium(CONSORTIUM_MISSION[v]);
        },
        mt: "md",
        variant: "filled",
        label: "聯盟機密任務",
        data: Object.keys(CONSORTIUM_MISSION)
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        mt: "md",
        onOptionSubmit: (v) => {
          setMember(MEMBER_POINT[v]);
        },
        variant: "filled",
        label: "月卡",
        data: Object.keys(MEMBER_POINT)
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        onOptionSubmit: (v) => {
          setArena(ARENA_POINT[v]);
        },
        mt: "md",
        variant: "filled",
        label: "競技場結算",
        data: Object.keys(ARENA_POINT)
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        onOptionSubmit: (v) => {
          setStage(STAGE_POINT[v]);
        },
        mt: "md",
        variant: "filled",
        label: "心階結算",
        data: Object.keys(STAGE_POINT)
      }
    ),
    /* @__PURE__ */ jsx(
      Switch,
      {
        checked: weeklyNail,
        onChange: (event) => setWeeklyNail(event.currentTarget.checked),
        mt: "md",
        color: "pink",
        label: "每週美甲評選"
      }
    ),
    /* @__PURE__ */ jsx(
      Switch,
      {
        checked: dailyShare,
        onChange: (event) => setDailyShare(event.currentTarget.checked),
        mt: "md",
        color: "pink",
        label: "每日分享"
      }
    ),
    /* @__PURE__ */ jsx(
      Switch,
      {
        checked: dailyMission,
        onChange: (event) => setDailyMission(event.currentTarget.checked),
        mt: "md",
        color: "pink",
        label: "每日任務"
      }
    ),
    /* @__PURE__ */ jsx(
      Switch,
      {
        checked: dailSignIn,
        onChange: (event) => setDailSignIn(event.currentTarget.checked),
        mt: "md",
        color: "pink",
        label: "每日簽到"
      }
    ),
    /* @__PURE__ */ jsx(Group, { justify: "center", mt: "xl", children: /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => {
          getResult();
        },
        variant: "light",
        color: "pink",
        radius: "md",
        children: "確定"
      }
    ) }),
    result > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Divider, { my: "md" }),
      /* @__PURE__ */ jsx(
        Blockquote,
        {
          color: "pink",
          iconSize: 35,
          icon: /* @__PURE__ */ jsx(GiCutDiamond, {}),
          mt: "xl",
          children: /* @__PURE__ */ jsxs(Grid, { gutter: 0, children: [
            /* @__PURE__ */ jsx(Grid.Col, { span: 2, children: /* @__PURE__ */ jsx(Text, { c: "dimmed", children: "日期:" }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: 10, children: /* @__PURE__ */ jsxs(Text, { c: "pink", fw: 500, children: [
              dayjs(startDate).format("YYYY/MM/DD"),
              " -",
              dayjs(endDate).format("YYYY/MM/DD")
            ] }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: 2, children: /* @__PURE__ */ jsx(Text, { c: "dimmed", children: "預期鑽石收益:" }) }),
            /* @__PURE__ */ jsx(Grid.Col, { span: 10, children: /* @__PURE__ */ jsx(Text, { c: "pink", fw: 500, children: result }) })
          ] })
        }
      )
    ] })
  ] });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nikkiCalculator
}, Symbol.toStringTag, { value: "Module" }));
const hachiware = "/assets/hachiware-CehjfidA.gif";
const meta = () => {
  return [
    { title: "Tools" }
    // { name: "description", content: "Welcome to Remix!" },
  ];
};
function Index() {
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs(Stack, { h: 300, align: "stretch", justify: "center", gap: "md", children: [
    /* @__PURE__ */ jsx(Text, { size: "lg", fw: 700, c: "orange", ta: "center", children: "個人用小工具 ʕ•͡ᴥ•ʔ" }),
    /* @__PURE__ */ jsx(Image, { radius: "md", h: 200, w: "auto", fit: "contain", src: hachiware })
  ] }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C5rMQ-GX.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-BabtBpse.js", "/assets/components-BYGpm2A2.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-jbJ44B_g.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-BabtBpse.js", "/assets/components-BYGpm2A2.js", "/assets/index-DblohxEt.js", "/assets/index-UE9R0tZi.js", "/assets/polymorphic-factory-CXlTUQKi.js", "/assets/iconBase-II6ntfzF.js"], "css": ["/assets/root-CiYVAovr.css"] }, "routes/fgo-saint-quartz-calculator": { "id": "routes/fgo-saint-quartz-calculator", "parentId": "root", "path": "fgo-saint-quartz-calculator", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/fgo-saint-quartz-calculator-CfFGrJdX.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/DateInput-D5gB9VAp.js", "/assets/index-UE9R0tZi.js", "/assets/Text-CjfY0kp7.js", "/assets/polymorphic-factory-CXlTUQKi.js", "/assets/iconBase-II6ntfzF.js", "/assets/index-BabtBpse.js"], "css": ["/assets/fgo-saint-quartz-calculator-ryRdeDI6.css"] }, "routes/nikki-calculator": { "id": "routes/nikki-calculator", "parentId": "root", "path": "nikki-calculator", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/nikki-calculator-xmiQsjq0.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/DateInput-D5gB9VAp.js", "/assets/index-DblohxEt.js", "/assets/polymorphic-factory-CXlTUQKi.js", "/assets/iconBase-II6ntfzF.js", "/assets/Text-CjfY0kp7.js", "/assets/index-BabtBpse.js"], "css": ["/assets/nikki-calculator-C9uhH8rX.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-le9-jOQ9.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/polymorphic-factory-CXlTUQKi.js", "/assets/Text-CjfY0kp7.js"], "css": [] } }, "url": "/assets/manifest-c0179306.js", "version": "c0179306" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/fgo-saint-quartz-calculator": {
    id: "routes/fgo-saint-quartz-calculator",
    parentId: "root",
    path: "fgo-saint-quartz-calculator",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/nikki-calculator": {
    id: "routes/nikki-calculator",
    parentId: "root",
    path: "nikki-calculator",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
