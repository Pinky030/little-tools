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
import { SiCrystal } from "react-icons/si";

const MISSION_REWARD = 21;
const SIGNIN_REWARD = 3;

const saintQuartzCalculator = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [result, setResult] = useState({
    quartz:0,
    fragment:0,
    ticket: 0
  });

  const [dailyCheckIn, setDailyCheckIn] = useState(false);
  const [weeklyMission, setWeeklyMission] = useState(false);

  const weeklyFormula = (weeks: number, point: number) => weeks * point;


  const getResult = () => {
    const totalWeek = dayjs(endDate).diff(dayjs(startDate), "week");

    setResult({
      quartz: weeklyFormula(totalWeek, SIGNIN_REWARD),
      fragment: weeklyFormula(totalWeek, MISSION_REWARD),
      ticket: totalWeek
    })
  }

  return (
    <form>
      <Title
        c="blue"
        order={2}
        size="h1"
        style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
        fw={900}
        ta="left"
      >
        聖晶石計算器
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

      <Switch
        checked={dailyCheckIn}
        onChange={(event) => setDailyCheckIn(event.currentTarget.checked)}
        mt="md"
        label="每日簽到"
      />

      <Switch
        checked={weeklyMission}
        onChange={(event) => setWeeklyMission(event.currentTarget.checked)}
        mt="md"
        label="每週任務"
      />

      <Group justify="center" mt="xl">
        <Button
          onClick={() => {
            getResult();
          }}
          //   type="submit"
          variant="light"
          radius="md"
        >
          確定
        </Button>
      </Group>

      <Divider my="md" />

      <Blockquote
        color="blue"
        icon={<SiCrystal />}
        mt="xl"
      >
        <Grid gutter={0}>
          <Grid.Col span={2}>
            <Text c="dimmed">日期:</Text>
          </Grid.Col>
          <Grid.Col span={10}>
            <Text c="blue" fw={500}>
              {dayjs(startDate).format("YYYY/MM/DD")} -{" "}
              {dayjs(endDate).format("YYYY/MM/DD")}
            </Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text c="dimmed">預期聖晶石收益:</Text>
          </Grid.Col>
          <Grid.Col span={10}>
            <Text c="blue" fw={500}>
              {result.quartz}
            </Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text c="dimmed">預期聖晶片收益:</Text>
          </Grid.Col>
          <Grid.Col span={10}>
            <Text c="blue" fw={500}>
              {result.fragment} = {(result.fragment / 7)}聖晶石
            </Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text c="dimmed">預期呼符收益:</Text>
          </Grid.Col>
          <Grid.Col span={10}>
            <Text c="blue" fw={500}>
              {result.ticket}
            </Text>
          </Grid.Col>
        </Grid>
      </Blockquote>
    </form>
  );
};

export default saintQuartzCalculator;
