import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export default function Meta({
  title,
  keywords,
  description,
  image,
}: MetaProps) {
  title = title?.includes("Система")
    ? title
    : title?.concat(" | Система учета преподавателей");
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image ? image : "/icon.jpg"} />
      <title>{title}</title>
    </Head>
  );
}

Meta.defaultProps = {
  title: "Главная | Система учета преподавателей",
  keywords: "management",
  description: "Система учета преподавателей",
};
