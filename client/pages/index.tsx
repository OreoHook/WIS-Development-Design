import { Professors } from "components/professors/professors";
import PageLayout from "layouts/page";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageLayout title="Главная">
      <Professors />
    </PageLayout>
  );
};

export default Home;
