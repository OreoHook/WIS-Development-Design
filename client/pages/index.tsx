import { Professors } from "components/professors/professors";
import PageLayout from "layouts/page";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      {/* Лэйаут для каждой страницы с meta тэгами */}
      <PageLayout title="Главная">
        {/* Компонент отображения преподавателей */}
        <Professors />
      </PageLayout>
    </>
  );
};

export default Home;
