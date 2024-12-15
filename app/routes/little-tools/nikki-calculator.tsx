import {
  Text,
  SimpleGrid,
  Group,
  Title,
  Button,
  Select,
  NumberInput,
  Switch,
  Blockquote,
  Grid,
  Divider,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";
import { GiCutDiamond } from "react-icons/gi";
import {
  ARENA_POINT,
  CONSORTIUM_MISSION,
  DAILY_MISSION,
  DAILY_SHARE,
  MEMBER_POINT,
  STAGE_POINT,
  WEEKLY_NAIL,
} from "~/constant/nikki";
import "../../style/Nikki.css";

const nikkiCalculator = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [current, setCurrent] = useState(0);
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

  const dailyFormula = (days: number, point: number) => days * point;
  const weeklyFormula = (weeks: number, point: number) => weeks * point;

  const calculateSignInPoints = (dates: number, isMember: boolean) => {
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

    let result = 0;
    const totalDate = dayjs(endDate).diff(dayjs(startDate), "day");

    const missionAmount = dailyMission
      ? dailyFormula(totalDate, DAILY_MISSION)
      : 0;
    const memeberAmount = dailyFormula(totalDate, member);
    const shareAmount = dailyShare ? dailyFormula(totalDate, DAILY_SHARE) : 0;
    const giftAmount = dailyFormula(totalDate, gift);
    const checkInPointAmount = calculateSignInPoints(
      totalDate,
      member === 0 ? false : true
    );

    if (totalDate < 7) {
      result =
        missionAmount +
        memeberAmount +
        shareAmount +
        giftAmount +
        checkInPointAmount;
    } else {
      const totalWeek = dayjs(endDate).diff(dayjs(startDate), "week");

      const arenaAmount = weeklyFormula(totalWeek, arena);
      const weeklyNailAmount = weeklyNail
        ? weeklyFormula(totalWeek, WEEKLY_NAIL)
        : 0;
      const stageAmount = weeklyFormula(totalWeek, stage);
      const consortiumAmount = weeklyFormula(totalWeek, consortium);

      result =
        missionAmount +
        memeberAmount +
        shareAmount +
        giftAmount +
        arenaAmount +
        weeklyNailAmount +
        stageAmount +
        consortiumAmount +
        checkInPointAmount;
    }

    setResult(result+current);
  };

  return (
    <form>
      <Title
        c="pink"
        order={2}
        size="h1"
        style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
        fw={900}
        ta="left"
      >
        鑽石計算器
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <DateInput
          valueFormat="YYYY/MM/DD"
          withAsterisk
          value={startDate}
          onChange={setStartDate}
          label="開始日期"
          variant="filled"
        />
        <DateInput
          valueFormat="YYYY/MM/DD"
          withAsterisk
          value={endDate}
          onChange={setEndDate}
          label="完結日期"
          variant="filled"
        />
      </SimpleGrid>

      <NumberInput
        value={current}
        onChange={(v) => {
          if (typeof v === "number") setCurrent(v);
        }}
        label="目前鑽石數:"
        mt="md"
        name="subject"
        variant="filled"
      />

      <NumberInput
        value={gift}
        onChange={(v) => {
          if (typeof v === "number") setGift(v);
        }}
        label="聯盟禮包"
        mt="md"
        name="subject"
        variant="filled"
      />

      <Select
        onOptionSubmit={(v) => {
          setConsortium(CONSORTIUM_MISSION[v as keyof object]);
        }}
        mt="md"
        variant="filled"
        label="聯盟機密任務"
        data={Object.keys(CONSORTIUM_MISSION)}
      />

      <Select
        mt="md"
        onOptionSubmit={(v) => {
          setMember(MEMBER_POINT[v as keyof object]);
        }}
        variant="filled"
        label="月卡"
        data={Object.keys(MEMBER_POINT)}
      />

      <Select
        onOptionSubmit={(v) => {
          setArena(ARENA_POINT[v as keyof object]);
        }}
        mt="md"
        variant="filled"
        label="競技場結算"
        data={Object.keys(ARENA_POINT)}
      />

      <Select
        onOptionSubmit={(v) => {
          setStage(STAGE_POINT[v as keyof object]);
        }}
        mt="md"
        variant="filled"
        label="心階結算"
        data={Object.keys(STAGE_POINT)}
      />

      <Switch
        checked={weeklyNail}
        onChange={(event) => setWeeklyNail(event.currentTarget.checked)}
        mt="md"
        color="pink"
        label="每週美甲評選"
      />

      <Switch
        checked={dailyShare}
        onChange={(event) => setDailyShare(event.currentTarget.checked)}
        mt="md"
        color="pink"
        label="每日分享"
      />

      <Switch
        checked={dailyMission}
        onChange={(event) => setDailyMission(event.currentTarget.checked)}
        mt="md"
        color="pink"
        label="每日任務"
      />

      <Switch
        checked={dailSignIn}
        onChange={(event) => setDailSignIn(event.currentTarget.checked)}
        mt="md"
        color="pink"
        label="每日簽到"
      />

      <Group justify="center" mt="xl">
        <Button
          onClick={() => {
            getResult();
          }}
          //   type="submit"
          variant="light"
          color="pink"
          radius="md"
        >
          確定
        </Button>
      </Group>


      {result > 0 && (
        <>
          <Divider my="md" />
          <Blockquote
            color="pink"
            iconSize={35}
            icon={<GiCutDiamond />}
            mt="xl"
          >
            <Grid gutter={0}>
              <Grid.Col span={2}>
                <Text c="dimmed">日期:</Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <Text c="pink" fw={500}>
                  {dayjs(startDate).format("YYYY/MM/DD")} -
                  {dayjs(endDate).format("YYYY/MM/DD")}
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Text c="dimmed">預期鑽石收益:</Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <Text c="pink" fw={500}>
                  {result}
                </Text>
              </Grid.Col>
            </Grid>
          </Blockquote>
        </>
      )}
    </form>
  );
};

export default nikkiCalculator;
